/// <reference types="@types/google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import MapHeader from './PhoneTracker/MapHeader';
import MapLoadingOverlay from './PhoneTracker/MapLoadingOverlay';
import MapErrorDisplay from './PhoneTracker/MapErrorDisplay';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationMapProps {
  details: {
    country: string;
    city: string;
    region?: string;
    zip_code?: string;
    latitude?: number;
    longitude?: number;
    [key: string]: any;
  };
}

const LocationMap: React.FC<LocationMapProps> = ({ details }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setMapLoading(true);
        setMapError(null);

        if (!mapRef.current) return;

        const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
        if (!mapboxToken) {
          setMapError('Mapbox access token is not set');
          setMapLoading(false);
          return;
        }

        let lng: number | undefined = details.longitude;
        let lat: number | undefined = details.latitude;
        // If lat/lon not provided by API, geocode
        if (typeof lng !== 'number' || typeof lat !== 'number') {
          const searchQuery = details.city && details.city !== 'N/A' ? `${details.city}, ${details.country}` : details.country;
          const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}`;
          const response = await fetch(geocodeUrl);
          const data = await response.json();
          if (!data.features || data.features.length === 0) {
            setMapError('Unable to locate the address on the map');
            setMapLoading(false);
            return;
          }
          [lng, lat] = data.features[0].center;
        }
        if (typeof lng !== 'number' || typeof lat !== 'number') {
          setMapError('No valid coordinates for map');
          setMapLoading(false);
          return;
        }

        mapboxgl.accessToken = mapboxToken;
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [lng, lat],
          zoom: details.city && details.city !== 'N/A' ? 10 : 6,
        });

        // Add marker with neon glow effect
        const markerEl = document.createElement('div');
        markerEl.style.width = '32px';
        markerEl.style.height = '32px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.background = 'radial-gradient(circle, #00D9FF 60%, #39FF14 100%)';
        markerEl.style.boxShadow = '0 0 16px 4px #00D9FF, 0 0 32px 8px #39FF14';
        markerEl.style.border = '3px solid #39FF14';
        markerEl.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker({ element: markerEl })
          .setLngLat([lng, lat])
          .addTo(map);

        // Info popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="background: #1a1a1a; color: white; padding: 12px; border-radius: 8px; font-family: system-ui;">
              <h3 style="margin: 0 0 8px 0; color: #00D9FF; font-size: 16px;">${details.city || details.country}</h3>
              <p style="margin: 0; color: #ccc; font-size: 14px;">Country: ${details.country}</p>
            </div>
          `);

        marker.setPopup(popup);
        setTimeout(() => {
          popup.addTo(map);
          marker.togglePopup();
        }, 500);

        setMapLoading(false);
      } catch (error) {
        console.error('Error loading map:', error);
        setMapError('Failed to load map');
        setMapLoading(false);
      }
    };

    if (details.country && details.country !== 'N/A') {
      initMap();
    }
  }, [details]);

  if (!details.country || details.country === 'N/A') {
    return (
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center">
        <MapErrorDisplay message="Location data not available" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
      <MapHeader location={details.city} countryName={details.country} />
      <div className="relative">
        {mapLoading && <MapLoadingOverlay />}
        {mapError && <MapErrorDisplay message={mapError} />}
        <div 
          ref={mapRef} 
          className="w-full h-64 md:h-80"
          style={{ minHeight: '256px' }}
        />
      </div>
    </div>
  );
};

export default LocationMap;