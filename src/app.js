// Access enviornment variable securely from Netlify
const apiKey = import.meta.env.VITE_API_KEY;

esriConfig.apiKey = apiKey; // Set the Esri API key

console.log("Loaded API Key from Netlify:", apiKey);

// Import ESRI modules using ES modules
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";

// Create the map
const map = new Map({
  basemap: "streets",
});

// Create a MapView instance and link it to the #viewDiv element
const view = new MapView({
  container: "viewDiv", // Reference to the div with id "viewDiv"
  map: map, // Reference to the Map instance created above
  center: [-84.388, 33.749], // Atlanta, GA coordinates]
  zoom: 10, // Initial zoom level
  spatialReference: { wkid: 3857 },
});

const citiesLayer = new FeatureLayer({
  url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Cities_Generalized/FeatureServer/0",
  title: "Cities",
  visible: true,
  spatialReference: { wkid: 3857 },
});

// Error handling for cities layer
citiesLayer
  .when(() => {
    console.log("Layer loaded successfully");
    map.add(citiesLayer); // Add layer to the map only if it loads successfully
  })
  .catch((error) => {
    console.error("Cities layer failed to load:", error.message);
    console.error(
      "Layer details:",
      error.details || "No additional details available."
    );
  });

// Traffic Layer (optional, with error handling)
const trafficLayer = new FeatureLayer({
  url: "https://traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer",
  title: "Traffic",
});

trafficLayer
  .when(() => {
    console.log("Traffic layer loaded successfully");
    map.add(trafficLayer);
  })
  .catch((error) => {
    console.error("Traffic layer failed to load:", error.message);
  });

// Create a BasemapToggle widget for switching between basemaps
const basemapToggle = new BasemapToggle({
  view: view,
  nextBasemap: "satellite", // Set the alternate basemap to "streets"
});

// Add the BasemapToggle widget tot he bottom-right corner of the MapView
view.ui.add(basemapToggle, "bottom-right");

console.log("Map loaded successfully.");
