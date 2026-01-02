'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  HOUSES_SOURCE_ID,
  HOUSES_FILL_LAYER_ID,
  HOUSES_LINE_LAYER_ID,
  HOUSES_3D_LAYER_ID,
  ZOOM_3D_THRESHOLD,
  housesFillLayer,
  housesLineLayer,
  houses3DLayer,
  ALL_HOUSE_LAYERS,
} from './layers';
import type { HouseFeatureCollection, HouseDetailResponse, PopupData } from './types';

// ============================================================
// CONFIGURATION
// ============================================================

// Start position: Berlin (hardcoded for MVP)
const DEFAULT_CENTER: [number, number] = [13.405, 52.52];
const DEFAULT_ZOOM = 15;
const MIN_ZOOM_FOR_HOUSES = 14;

// ============================================================
// HOOK
// ============================================================

interface UseMapboxOptions {
  container: HTMLDivElement | null;
  accessToken: string;
}

interface UseMapboxReturn {
  map: mapboxgl.Map | null;
  isLoaded: boolean;
  popupData: PopupData | null;
  closePopup: () => void;
  is3DMode: boolean;
}

export function useMapbox({ container, accessToken }: UseMapboxOptions): UseMapboxReturn {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [is3DMode, setIs3DMode] = useState(false);
  const hoveredHouseId = useRef<string | null>(null);
  const selectedHouseId = useRef<string | null>(null);

  // Close popup handler
  const closePopup = useCallback(() => {
    setPopupData(null);
    // Clear selection
    if (selectedHouseId.current && mapRef.current) {
      mapRef.current.setFeatureState(
        { source: HOUSES_SOURCE_ID, id: selectedHouseId.current },
        { selected: false }
      );
      selectedHouseId.current = null;
    }
  }, []);

  // ============================================================
  // MAP INITIALIZATION
  // ============================================================

  useEffect(() => {
    if (!container || !accessToken || mapRef.current) return;

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Premium satellite look
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 0, // Will be adjusted for 3D
      bearing: 0,
      antialias: true, // Smoother 3D rendering
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      mapRef.current = map;
      
      // Add empty source
      map.addSource(HOUSES_SOURCE_ID, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        promoteId: 'id',
      });

      // Add 2D layers
      map.addLayer(housesFillLayer);
      map.addLayer(housesLineLayer);
      
      // Add 3D layer
      map.addLayer(houses3DLayer);

      setIsLoaded(true);

      // Initial load
      loadHousesForViewport(map);
      
      // Check initial zoom for 3D mode
      updateCameraFor3D(map);
    });

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [container, accessToken]);

  // ============================================================
  // VIEWPORT CHANGE → LOAD HOUSES + UPDATE 3D MODE
  // ============================================================

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;

    const handleMoveEnd = () => {
      loadHousesForViewport(map);
    };

    const handleZoom = () => {
      updateCameraFor3D(map);
      setIs3DMode(map.getZoom() >= ZOOM_3D_THRESHOLD);
    };

    map.on('moveend', handleMoveEnd);
    map.on('zoomend', handleMoveEnd);
    map.on('zoom', handleZoom);

    return () => {
      map.off('moveend', handleMoveEnd);
      map.off('zoomend', handleMoveEnd);
      map.off('zoom', handleZoom);
    };
  }, [isLoaded]);

  // ============================================================
  // HOVER INTERACTION (works for both 2D and 3D)
  // ============================================================

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;

    const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
      // Query both 2D and 3D layers
      const features = map.queryRenderedFeatures(e.point, {
        layers: ALL_HOUSE_LAYERS.filter(id => map.getLayer(id)),
      });

      // Change cursor
      map.getCanvas().style.cursor = features.length > 0 ? 'pointer' : '';

      // Clear previous hover
      if (hoveredHouseId.current !== null) {
        map.setFeatureState(
          { source: HOUSES_SOURCE_ID, id: hoveredHouseId.current },
          { hover: false }
        );
      }

      // Set new hover
      if (features.length > 0) {
        const feature = features[0];
        const id = feature.properties?.id;
        if (id) {
          hoveredHouseId.current = id;
          map.setFeatureState(
            { source: HOUSES_SOURCE_ID, id },
            { hover: true }
          );
        }
      } else {
        hoveredHouseId.current = null;
      }
    };

    const handleMouseLeave = () => {
      if (hoveredHouseId.current !== null) {
        map.setFeatureState(
          { source: HOUSES_SOURCE_ID, id: hoveredHouseId.current },
          { hover: false }
        );
        hoveredHouseId.current = null;
      }
      map.getCanvas().style.cursor = '';
    };

    // Listen to both layers
    ALL_HOUSE_LAYERS.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.on('mousemove', layerId, handleMouseMove);
        map.on('mouseleave', layerId, handleMouseLeave);
      }
    });

    return () => {
      ALL_HOUSE_LAYERS.forEach(layerId => {
        if (map.getLayer(layerId)) {
          map.off('mousemove', layerId, handleMouseMove);
          map.off('mouseleave', layerId, handleMouseLeave);
        }
      });
    };
  }, [isLoaded]);

  // ============================================================
  // CLICK INTERACTION (works for both 2D and 3D)
  // ============================================================

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) return;

    const handleClick = async (e: mapboxgl.MapMouseEvent) => {
      // Query both layers
      const features = map.queryRenderedFeatures(e.point, {
        layers: ALL_HOUSE_LAYERS.filter(id => map.getLayer(id)),
      });

      if (features.length === 0) {
        closePopup();
        return;
      }

      const feature = features[0];
      const props = feature.properties;
      
      if (!props?.id) return;

      // Clear previous selection
      if (selectedHouseId.current) {
        map.setFeatureState(
          { source: HOUSES_SOURCE_ID, id: selectedHouseId.current },
          { selected: false }
        );
      }

      // Set new selection
      selectedHouseId.current = props.id;
      map.setFeatureState(
        { source: HOUSES_SOURCE_ID, id: props.id },
        { selected: true }
      );

      // Parse address from properties (it's stringified in GeoJSON)
      let address = 'Address unknown';
      try {
        const addressObj = typeof props.address === 'string' 
          ? JSON.parse(props.address) 
          : props.address;
        if (addressObj) {
          const parts = [addressObj.street, addressObj.number].filter(Boolean);
          if (parts.length > 0) {
            address = parts.join(' ');
          }
        }
      } catch {
        // Keep default
      }

      // Parse building info
      let buildingType = null;
      let levels = null;
      try {
        const buildingObj = typeof props.building === 'string'
          ? JSON.parse(props.building)
          : props.building;
        if (buildingObj) {
          buildingType = buildingObj.type;
          levels = buildingObj.levels;
        }
      } catch {
        // Keep defaults
      }

      // Set initial popup (loading state)
      const clickCoords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      setPopupData({
        coordinates: clickCoords,
        houseId: props.id,
        address,
        buildingType,
        levels,
        estimate: null,
        listings: [],
        loading: true,
      });

      // Fetch house details
      try {
        const response = await fetch(`/api/house/${props.id}`);
        if (response.ok) {
          const data: HouseDetailResponse = await response.json();
          setPopupData(prev => prev && prev.houseId === props.id ? {
            ...prev,
            estimate: data.estimate,
            listings: data.listings || [],
            loading: false,
          } : prev);
        } else {
          setPopupData(prev => prev && prev.houseId === props.id ? {
            ...prev,
            loading: false,
          } : prev);
        }
      } catch (error) {
        console.error('Error fetching house details:', error);
        setPopupData(prev => prev && prev.houseId === props.id ? {
          ...prev,
          loading: false,
        } : prev);
      }
    };

    // Listen to both layers
    ALL_HOUSE_LAYERS.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.on('click', layerId, handleClick);
      }
    });

    return () => {
      ALL_HOUSE_LAYERS.forEach(layerId => {
        if (map.getLayer(layerId)) {
          map.off('click', layerId, handleClick);
        }
      });
    };
  }, [isLoaded, closePopup]);

  return {
    map: mapRef.current,
    isLoaded,
    popupData,
    closePopup,
    is3DMode,
  };
}

// ============================================================
// UPDATE CAMERA FOR 3D MODE
// ============================================================

function updateCameraFor3D(map: mapboxgl.Map): void {
  const zoom = map.getZoom();
  const currentPitch = map.getPitch();
  
  if (zoom >= ZOOM_3D_THRESHOLD) {
    // Enable premium 3D view with pitch
    if (currentPitch < 50) {
      map.easeTo({
        pitch: 55, // Premium angle like Mercedes Me
        duration: 800, // Smooth transition
      });
    }
  } else {
    // Disable 3D view - flatten
    if (currentPitch > 0) {
      map.easeTo({
        pitch: 0,
        duration: 600,
      });
    }
  }
}

// ============================================================
// LOAD HOUSES FOR CURRENT VIEWPORT
// ============================================================

async function loadHousesForViewport(map: mapboxgl.Map): Promise<void> {
  const zoom = map.getZoom();
  
  // Don't load at low zoom levels
  if (zoom < MIN_ZOOM_FOR_HOUSES) {
    const source = map.getSource(HOUSES_SOURCE_ID) as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({ type: 'FeatureCollection', features: [] });
    }
    return;
  }

  const bounds = map.getBounds();
  if (!bounds) return;

  const bbox = [
    bounds.getWest(),
    bounds.getSouth(),
    bounds.getEast(),
    bounds.getNorth(),
  ].join(',');

  try {
    const response = await fetch(`/api/houses?bbox=${bbox}`);
    if (!response.ok) {
      console.error('Failed to fetch houses:', response.statusText);
      return;
    }

    const data: HouseFeatureCollection = await response.json();
    
    // Flatten nested properties for Mapbox (it can't access nested objects)
    const flattenedData = {
      ...data,
      features: data.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          // Flatten building object for Mapbox expressions
          building_type: feature.properties.building?.type || 'yes',
          building_levels: feature.properties.building?.levels || 2,
          // Flatten address for display
          address_street: feature.properties.address?.street || null,
          address_number: feature.properties.address?.number || null,
        },
      })),
    };
    
    const source = map.getSource(HOUSES_SOURCE_ID) as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData(flattenedData as HouseFeatureCollection);
    }
  } catch (error) {
    console.error('Error loading houses:', error);
  }
}
