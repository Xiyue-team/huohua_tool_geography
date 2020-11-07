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
// const viewer = new Viewer('cesiumContainer', {
//     terrainProvider: createWorldTerrain()
// });
// // Add Cesium OSM Buildings, a global 3D buildings layer.
// const buildingTileset = viewer.scene.primitives.add(createOsmBuildings());
// // Fly the camera to San Francisco at the given longitude, latitude, and height.
// viewer.camera.flyTo({
//     destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
//     orientation : {
//         heading : Math.toRadians(0.0),
//         pitch : Math.toRadians(-15.0),
//     }
// });

var viewer = new Viewer("cesiumContainer", {
    imageryProvider: new ArcGisMapServerImageryProvider({
        url:
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
    }),
    baseLayerPicker: true,
    infoBox: false,
    geocoder: false,
    projectionPicker : true,
    timeline : false,
    animation : true,
});

let layers = viewer.imageryLayers;
let earthAtNight = layers.addImageryProvider(
    new IonImageryProvider({ assetId: 3812 })
);
earthAtNight.splitDirection = ImagerySplitDirection.LEFT; // Only show to the left of the slider.

// Sync the position of the slider with the split position
let slider = document.getElementById("slider") as HTMLCanvasElement;
viewer.scene.imagerySplitPosition =
    slider.offsetLeft / slider.parentElement.offsetWidth;

let handler = new ScreenSpaceEventHandler(slider);

let moveActive = false;

function move(movement) {
    if (!moveActive) {
        return;
    }

    let relativeOffset = movement.endPosition.x;
    let splitPosition =
        (slider.offsetLeft + relativeOffset) /
        slider.parentElement.offsetWidth;
    slider.style.left = 100.0 * splitPosition + "%";
    viewer.scene.imagerySplitPosition = splitPosition;
}

handler.setInputAction(function () {
    moveActive = true;
}, ScreenSpaceEventType.LEFT_DOWN);
handler.setInputAction(function () {
    moveActive = true;
}, ScreenSpaceEventType.PINCH_START);

handler.setInputAction(move, ScreenSpaceEventType.MOUSE_MOVE);
handler.setInputAction(move, ScreenSpaceEventType.PINCH_MOVE);

handler.setInputAction(function () {
    moveActive = false;
}, ScreenSpaceEventType.LEFT_UP);
handler.setInputAction(function () {
    moveActive = false;
}, ScreenSpaceEventType.PINCH_END);

