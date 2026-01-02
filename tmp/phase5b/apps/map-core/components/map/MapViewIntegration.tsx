// ============================================================
// MapView Integration for Phase 5B
// Shows how to integrate PriceToggle with existing MapView
// ============================================================

// Add these imports to your MapView.tsx:
// import { PriceToggle, PriceLegend } from './PriceToggle';
// import { usePriceOverlay, getPriceFromOverlay } from './usePriceOverlay';

/**
 * INTEGRATION GUIDE
 * 
 * Add the following to your existing MapView component:
 */

// ============================================================
// 1. ADD STATE AND HOOK
// ============================================================

/*
// Inside MapView component, after useMapbox hook:

const {
  enabled: priceOverlayEnabled,
  loading: priceLoading,
  buildingsCount,
  priceMap,
  toggle: togglePriceOverlay,
} = usePriceOverlay(map);
*/

// ============================================================
// 2. ADD TOGGLE BUTTON TO JSX
// ============================================================

/*
// In your return JSX, add after the map container:

<PriceToggle
  enabled={priceOverlayEnabled}
  onToggle={togglePriceOverlay}
  loading={priceLoading}
  buildingsCount={buildingsCount}
/>

// Optional: Add legend
<PriceLegend visible={priceOverlayEnabled} />
*/

// ============================================================
// 3. ENHANCE POPUP WITH PRICE FROM OVERLAY
// ============================================================

/*
// In your click handler, get price from overlay if available:

const handleBuildingClick = (feature: MapboxGeoJSONFeature) => {
  const houseId = feature.properties?.id;
  
  // Get price from overlay (instant, no API call needed)
  const overlayPrice = getPriceFromOverlay(priceMap, houseId);
  
  if (overlayPrice) {
    // Use overlay price (already fetched)
    setPopupData({
      ...feature.properties,
      price_sqm: overlayPrice.price,
      price_source: 'overlay',
    });
  } else {
    // Fetch individual price (fallback)
    fetchHouseDetails(houseId);
  }
};
*/

// ============================================================
// COMPLETE EXAMPLE COMPONENT
// ============================================================

'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PriceToggle, PriceLegend } from './PriceToggle';
import { usePriceOverlay, getPriceFromOverlay } from './usePriceOverlay';

// Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface PopupData {
  id: string;
  building_type: string;
  area_sqm: number | null;
  price_sqm?: number;
  price_source?: 'overlay' | 'api';
}

export function MapViewWithPriceOverlay() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  // Price overlay hook
  const {
    enabled: priceOverlayEnabled,
    loading: priceLoading,
    buildingsCount,
    priceMap,
    toggle: togglePriceOverlay,
  } = usePriceOverlay(mapRef.current);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [13.4125, 52.5219], // Berlin Alexanderplatz
      zoom: 15,
      pitch: 45,
      bearing: -17.6,
    });

    map.on('load', () => {
      mapRef.current = map;
      setMapLoaded(true);
      
      // Load buildings from API
      loadBuildings(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Load buildings layer
  const loadBuildings = async (map: mapboxgl.Map) => {
    const bounds = map.getBounds();
    if (!bounds) return;

    const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

    try {
      const response = await fetch(`/api/houses?bbox=${bbox}`);
      const data = await response.json();

      // Add source
      map.addSource('buildings', {
        type: 'geojson',
        data: data,
        promoteId: 'id',
      });

      // Add 3D buildings layer
      map.addLayer({
        id: 'buildings-3d',
        type: 'fill-extrusion',
        source: 'buildings',
        paint: {
          'fill-extrusion-color': [
            'match',
            ['get', 'building_type'],
            'residential', 'rgba(100, 149, 237, 0.7)',
            'apartments', 'rgba(65, 105, 225, 0.7)',
            'commercial', 'rgba(255, 165, 0, 0.7)',
            'office', 'rgba(147, 112, 219, 0.7)',
            'industrial', 'rgba(169, 169, 169, 0.7)',
            'rgba(128, 128, 128, 0.7)'
          ],
          'fill-extrusion-height': ['*', ['get', 'building_levels'], 3.5],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.8,
        },
      });

      // Click handler
      map.on('click', 'buildings-3d', (e) => {
        if (!e.features?.[0]) return;
        
        const feature = e.features[0];
        const houseId = feature.properties?.id;

        // Get price from overlay if available
        const overlayPrice = getPriceFromOverlay(priceMap, houseId);

        setPopupData({
          id: houseId,
          building_type: feature.properties?.building_type || 'unknown',
          area_sqm: feature.properties?.area_sqm,
          price_sqm: overlayPrice?.price,
          price_source: overlayPrice ? 'overlay' : undefined,
        });
      });

    } catch (error) {
      console.error('Failed to load buildings:', error);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Price Toggle Button */}
      {mapLoaded && (
        <PriceToggle
          enabled={priceOverlayEnabled}
          onToggle={togglePriceOverlay}
          loading={priceLoading}
          buildingsCount={buildingsCount}
        />
      )}

      {/* Price Legend */}
      <PriceLegend visible={priceOverlayEnabled} />

      {/* Popup */}
      {popupData && (
        <div className="absolute bottom-8 left-4 bg-white/95 rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-lg mb-2">
            {popupData.building_type}
          </h3>
          {popupData.area_sqm && (
            <p className="text-gray-600">
              Area: {popupData.area_sqm} m²
            </p>
          )}
          {popupData.price_sqm && (
            <p className="text-xl font-bold text-blue-600">
              €{popupData.price_sqm.toLocaleString()}/m²
            </p>
          )}
          <button
            onClick={() => setPopupData(null)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default MapViewWithPriceOverlay;
