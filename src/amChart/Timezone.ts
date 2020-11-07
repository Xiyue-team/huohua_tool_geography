/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldTimeZoneAreasHigh from "@amcharts/amcharts4-geodata/worldTimeZoneAreasHigh";
import am4geodata_worldTimeZonesHigh from "@amcharts/amcharts4-geodata/worldTimeZonesHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {MapImage, MapPolygon} from "@amcharts/amcharts4/maps";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
let chart = am4core.create("chartdiv", am4maps.MapChart);
// Set map definition
chart.geodata = am4geodata_worldTimeZoneAreasHigh;
// Set projection
chart.projection = new am4maps.projections.Miller();
chart.panBehavior = "move";

let startColor = chart.colors.getIndex(0)
let middleColor = chart.colors.getIndex(7)
let endColor = chart.colors.getIndex(14)

let interfaceColors = new am4core.InterfaceColorSet();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;
polygonSeries.calculateVisualCenter = true;

let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.fillOpacity = 0.6;
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeWidth = 1;
polygonTemplate.stroke = interfaceColors.getFor("background");
polygonTemplate.strokeOpacity = 1;

polygonTemplate.adapter.add("fill", function(fill, target: MapPolygon) {

    if (target.dataItem.index > 0) {
        return chart.colors.getIndex(target.dataItem.index);
    }
    return fill;
})
/// add country borders
// Create map polygon series
/*
let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
// Make map load polygon (like country names) data from GeoJSON
countrySeries.useGeodata = true;
countrySeries.geodata = am4geodata_worldLow;

let countryPolygonTemplate = countrySeries.mapPolygons.template;
countryPolygonTemplate.fillOpacity = 0;
countryPolygonTemplate.nonScalingStroke = true;
countryPolygonTemplate.strokeWidth = 1;
countryPolygonTemplate.stroke = interfaceColors.getFor("background");
countryPolygonTemplate.strokeOpacity = 0.3;
*/

// Create map polygon series
let boundsSeries = chart.series.push(new am4maps.MapPolygonSeries());
boundsSeries.geodata = am4geodata_worldTimeZonesHigh;
boundsSeries.useGeodata = true;
boundsSeries.mapPolygons.template.fill = am4core.color(interfaceColors.getFor("alternativeBackground"));
boundsSeries.mapPolygons.template.fillOpacity = 0.07;
boundsSeries.mapPolygons.template.nonScalingStroke = true;
boundsSeries.mapPolygons.template.strokeWidth = 0.5;
boundsSeries.mapPolygons.template.strokeOpacity = 1;
boundsSeries.mapPolygons.template.stroke = interfaceColors.getFor("background");
boundsSeries.tooltipText = "{id}";


let hs = polygonTemplate.states.create("hover");
hs.properties.fillOpacity = 1;

let bhs = boundsSeries.mapPolygons.template.states.create("hover");
bhs.properties.fillOpacity = 0.3;


polygonSeries.mapPolygons.template.events.on("over", function(event) {
    let polygon = boundsSeries.getPolygonById(event.target.dataItem.dataContext['id']);
    if (polygon) {
        polygon.isHover = true;
    }
})

polygonSeries.mapPolygons.template.events.on("out", function(event) {
    let polygon = boundsSeries.getPolygonById(event.target.dataItem.dataContext['id']);
    if (polygon) {
        polygon.isHover = false;
    }
})


let labelSeries = chart.series.push(new am4maps.MapImageSeries());
let label = labelSeries.mapImages.template.createChild(am4core.Label);
label.text = "{id}";
label.strokeOpacity = 0;
label.fill = am4core.color("#000000");
label.horizontalCenter = "middle";
label.fontSize = 15;
label.nonScaling = true;


labelSeries.mapImages.template.adapter.add("longitude", (longitude: number, target: MapImage) => {
    target.zIndex = 100000;

    let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext['id']);
    if (polygon) {
        return polygon.visualLongitude
    }
    return longitude;
});

labelSeries.mapImages.template.adapter.add("latitude", (latitude: number, target: MapImage) => {
    let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext['id']);
    if (polygon) {
        return polygon.visualLatitude
    }
    return latitude;
});


let button = chart.createChild(am4core.SwitchButton);
button.align = "right";
button.marginTop = 40;
button.marginRight = 40;
button.valign = "top";
button.leftLabel.text = "地图";
button.rightLabel.text = "地球";

button.events.on("toggled", function() {

    chart.deltaLatitude = 0;
    chart.deltaLongitude = 0;
    chart.deltaGamma = 0;

    if (button.isActive) {
        chart.projection = new am4maps.projections.Orthographic;
        chart.panBehavior = "rotateLongLat";
    }
    else {
        chart.projection = new am4maps.projections.Miller;
        chart.panBehavior = "move";
    }
})

polygonSeries.events.on("datavalidated", function() {
    labelSeries.data = polygonSeries.data;
})
