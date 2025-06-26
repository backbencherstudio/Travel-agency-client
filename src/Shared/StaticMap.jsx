import React from "react";

const StaticMap = ({ location = "Dhaka, Bangladesh", zoom = 13, width = 600, height = 300 }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(location)}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red|${encodeURIComponent(location)}&key=${apiKey}`;
  console.log(mapUrl)
  return (
    <div>
      <img src={mapUrl} alt={`Map of ${location}`} width={width} height={height} />
    </div>
  );
};

export default StaticMap;