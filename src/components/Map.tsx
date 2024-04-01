import React from 'react';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {globalStyles} from '../utils/globalStyles';
import {Platform, View} from 'react-native';
import WebView from 'react-native-webview';

interface MapProps {
  lat: number;
  lon: number;
  latDelta?: number;
  lonDelta?: number;
  markers?: Marker[];
}
interface Marker {
  lat: number;
  lon: number;
  title?: string;
}

const MapScreen: React.FC<MapProps> = ({
  lon,
  lat,
  latDelta = 0.01,
  lonDelta = 0.01,
  markers = [],
}) => {
  if (Platform.OS === 'ios') {
    return (
      <MapView
        provider={PROVIDER_DEFAULT}
        style={globalStyles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta,
        }}>
        <Marker
          coordinate={{latitude: lat, longitude: lon}}
          title="Mi marcador"
          description="Este es mi marcador personalizado"
        />
      </MapView>
    );
  } else {
    const generateMarkersScript = (newMarkers: Marker[]) => {
      return newMarkers
        .map(
          marker => `
      var marker = L.marker([${marker.lat}, ${marker.lon}]).addTo(map);
      marker.bindPopup('${marker.title}');
    `,
        )
        .join('\n');
    };
    const markersScript = generateMarkersScript(markers);
    return (
      <View style={globalStyles.container}>
        <WebView
          key={`webview-${markers.length}`}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          mixedContentMode="compatibility"
          source={{
            html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OpenStreetMap with Markers</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
            <style>
                html, body {
                  height: 100%;
                  margin: 0;
                }
                .leaflet-container {
                  height: 400px;
                  width: 600px;
                  max-width: 100%;
                  max-height: 100%;
                }
            </style>
            <style>body { padding: 0; margin: 0; } #map { height: 100%; width: 100vw; }</style>
          </head>
          <body data-new-gr-c-s-check-loaded="14.1163.0" data-gr-ext-installed="" cz-shortcut-listen="true">
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([52.077435, 4.316076], 13);
            const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            function onLocationFound(e) {
              const radius = e.accuracy / 2;
              const locationMarker = L.marker(e.latlng).addTo(map)
                .bindPopup('You are within' + ' ' + radius + 'meters from this point').openPopup();
              const locationCircle = L.circle(e.latlng, radius).addTo(map);
            }
            function onLocationError(e) {
              alert(e.message);
            }
            map.on('locationfound', onLocationFound);
            map.on('locationerror', onLocationError);
            map.locate({setView: true, maxZoom: 16});
            ${markersScript.length ? markersScript : null}
          </script>
          </body>
          </html>
        `,
          }}
          style={globalStyles.map}
        />
      </View>
    );
  }
};

export default MapScreen;
