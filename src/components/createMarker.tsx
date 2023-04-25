const createMarker = (lat, lng, color) => {
    const customMarker = new L.Icon({
      iconUrl: '/Image/marker.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
      className: `marker-icon marker-icon-${color}`
    });
  
    return L.marker([lat, lng], { icon: customMarker });
  };
  