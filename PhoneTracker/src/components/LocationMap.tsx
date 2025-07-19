/// <reference types="@types/google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapHeader from './PhoneTracker/MapHeader';
import MapLoadingOverlay from './PhoneTracker/MapLoadingOverlay';
import MapErrorDisplay from './PhoneTracker/MapErrorDisplay';

interface LocationMapProps {
  countryName: string;
  location: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ countryName, location }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setMapLoading(true);
        setMapError(null);

        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        // Create geocoder to find coordinates
        const geocoder = new google.maps.Geocoder();
        const searchQuery = location && location !== 'N/A' ? `${location}, ${countryName}` : countryName;

        geocoder.geocode({ address: searchQuery }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
          if (status === 'OK' && results && results[0]) {
            const position = results[0].geometry.location;
            // Create map
            const map = new google.maps.Map(mapRef.current!, {
              zoom: location && location !== 'N/A' ? 10 : 6,
              center: position,
              styles: [
                {
                  "elementType": "geometry",
                  "stylers": [{ "color": "#1d2c4d" }]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#8ec3b9" }]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [{ "color": "#1a3646" }]
                },
                {
                  "featureType": "administrative.country",
                  "elementType": "geometry.stroke",
                  "stylers": [{ "color": "#4b6878" }]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#64779f" }]
                },
                {
                  "featureType": "administrative.province",
                  "elementType": "geometry.stroke",
                  "stylers": [{ "color": "#4b6878" }]
                },
                {
                  "featureType": "landscape.man_made",
                  "elementType": "geometry.stroke",
                  "stylers": [{ "color": "#334e87" }]
                },
                {
                  "featureType": "landscape.natural",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#023e58" }]
                },
                {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#283d6a" }]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#6f9ba5" }]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.stroke",
                  "stylers": [{ "color": "#1d2c4d" }]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry.fill",
                  "stylers": [{ "color": "#023e58" }]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#3C7680" }]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#304a7d" }]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#98a5be" }]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.stroke",
                  "stylers": [{ "color": "#1d2c4d" }]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#2c6675" }]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [{ "color": "#255763" }]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#b0d5ce" }]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels.text.stroke",
                  "stylers": [{ "color": "#023e58" }]
                },
                {
                  "featureType": "transit",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#98a5be" }]
                },
                {
                  "featureType": "transit",
                  "elementType": "labels.text.stroke",
                  "stylers": [{ "color": "#1d2c4d" }]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "geometry.fill",
                  "stylers": [{ "color": "#283d6a" }]
                },
                {
                  "featureType": "transit.station",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#3a4762" }]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#0e1626" }]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [{ "color": "#4e6d70" }]
                }
              ]
            });

            // Create custom marker with neon glow
            const marker = new google.maps.Marker({
              position: position,
              map: map,
              title: `${location || countryName}`,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#00D9FF',
                fillOpacity: 1,
                strokeColor: '#39FF14',
                strokeWeight: 3,
                strokeOpacity: 0.8
              }
            });

            // Create info window
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="background: #1a1a1a; color: white; padding: 12px; border-radius: 8px; font-family: system-ui;">
                  <h3 style="margin: 0 0 8px 0; color: #00D9FF; font-size: 16px;">${location || countryName}</h3>
                  <p style="margin: 0; color: #ccc; font-size: 14px;">Country: ${countryName}</p>
                </div>
              `
            });

            // Show info window on marker click
            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            // Auto-open info window
            setTimeout(() => {
              infoWindow.open(map, marker);
            }, 500);

            setMapLoading(false);
          } else {
            setMapError('Unable to locate the address on the map');
            setMapLoading(false);
          }
        });

      } catch (error) {
        console.error('Error loading map:', error);
        setMapError('Failed to load map');
        setMapLoading(false);
      }
    };

    if (countryName && countryName !== 'N/A') {
      initMap();
    }
  }, [countryName, location]);

  if (!countryName || countryName === 'N/A') {
    return (
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center">
        <MapErrorDisplay message="Location data not available" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
      <MapHeader location={location} countryName={countryName} />
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