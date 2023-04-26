import { useState, useEffect } from 'react';
import { TileLayer, Marker, Popup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Papa from 'papaparse';
import Link from 'next/link';

const Map = () => {
    const [map, setMap] = useState<any | null>(null);
    const [markers, setMarkers] = useState([]);
    const [selectedDecade, setSelectedDecade] = useState("1990");

    
    useEffect(() => {
        // Load Leaflet dynamically on the client-side
        import('leaflet').then((L) => {
          // Create the map
          const newMap = new L.Map('mapid').setView([43.6426, -79.387054], 13);
    
          // Add the tile layer
          new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(newMap);

          setMap(newMap);
          
          return () => {
            newMap.remove();
          };
          
        });
      }, []);

    useEffect(() => {
        
        import('leaflet').then((L) => {
            if (!map) {
                return;
              }
              
              // Read the CSV file
              Papa.parse('/locations.csv', {
                header: true,
                download: true,
                complete: (results) => {
                  const coordinates = results.data.map((row : any ) => [row.Lat, row.Long, row.Year]);
                
                  // Create markers for each valid coordinate
                  
                  const newMarkers = coordinates.map((coord) => {
                    const lat = parseFloat(coord[0]);
                    const lng = parseFloat(coord[1]);
                    const year = parseInt(coord[2]);
          
                    if (!isNaN(lat) && !isNaN(lng) && !isNaN(year)) {
                      return L.marker([lat, lng]).bindPopup(year.toString());
                    }
          
                    return null;
                  }).filter(Boolean);
          
                  setMarkers(newMarkers as never);
                  newMarkers.forEach((marker) => marker.addTo(map));
                },
              });
          });
      }, [map]);

    useEffect(() => {
        import('leaflet').then((L) => {
            if (!map || !markers) {
                return;
              }
          
              // Filter markers by decade
              const filteredMarkers = markers.filter((marker) => {
                if (!selectedDecade) {
                  return true;
                }
          
                const year = parseInt(marker.getPopup().getContent());
          
                return year >= selectedDecade && year < (selectedDecade + 10);
              });
          
              // Remove all markers from the map and add the filtered ones
              markers.forEach((marker) => marker.remove());
              filteredMarkers.forEach((marker) => marker.addTo(map)); 
          });
        
      }, [map, markers, selectedDecade]);

      const handleDecadeChange = (event) => {
        setSelectedDecade(parseInt(event.target.value));
      };
    
      return <>
            <div>
                <label htmlFor="decade-select">Select decade:</label>
                <select id="decade-select" onChange={handleDecadeChange}>
                    <option value="">All decades</option>
                    <option value="2030">2030s</option>
                    <option value="2040">2040s</option>
                    <option value="2050">2050s</option>
                    <option value="2060">2060s</option>
                    <option value="2070">2070s</option>
                </select>
            </div>
            <div id="mapid" style={{ width: '100%', height: '800px', marginTop: '20px' }} />
        </>;
  };
const MapPage = () => {
    return (
        <>

        <div>
          <h2><Link href="/">Home</Link></h2>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Map />
        </div>
        </>
      );
  };
    
  export default MapPage;
