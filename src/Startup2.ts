import {
    Cartesian3,
    Cesium3DTileset,
    Math,
    createOsmBuildings,
    createWorldTerrain,
    Ion,
    IonResource,
    Viewer,
    IonImageryProvider,
    JulianDate,
    ClockStep,
    ClockRange,
    ClockViewModel,
    Clock,
    ScreenSpaceEventType,
    ImagerySplitDirection, ScreenSpaceEventHandler, ArcGisMapServerImageryProvider
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
// import "./css/main.css";

// window['CESIUM_BASE_URL'] = 'http://114.214.164.232:9001/';


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOGI1NTg3OC1hNTU2LTRiZDQtYjExZS0yNTdiOGVjN2JkODYiLCJpZCI6MzYxNTcsImlhdCI6MTYwMzEwMjUyNn0.XbI26uwo-1QtCrBvdEcXZbfQLgWMfs9byFkOUF3DUUo';
console.debug('*********************************************');


// This is simplified version of Cesium's Getting Started tutorial.
// See https://com/docs/tutorials/getting-started/ for more details.

// Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
const viewer = new Viewer('cesiumContainer', {
    terrainProvider: createWorldTerrain()
});
// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = viewer.scene.primitives.add(createOsmBuildings());
// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
    destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation : {
        heading : Math.toRadians(0.0),
        pitch : Math.toRadians(-15.0),
    }
});

