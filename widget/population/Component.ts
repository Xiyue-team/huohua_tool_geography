import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_lang_CN from '@amcharts/amcharts4-geodata/lang/cn_ZH';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4geodata_asiaHigh from "@amcharts/amcharts4-geodata/region/world/asiaHigh";
import am4geodata_chinaHigh from "@amcharts/amcharts4-geodata/chinaHigh";
import {Legend, MapChart, MapImageSeries, MapPolygonSeries} from "@amcharts/amcharts4/maps";
import {IGeoPoint} from "@amcharts/amcharts4/.internal/core/defs/IGeoPoint";
import {UIComponent} from "./UIComponent";
import {Circle} from "@amcharts/amcharts4/core";

export default class Component {

   chart: MapChart;
   worldSeries: MapPolygonSeries;
   asiaSeries: MapPolygonSeries;
   europeSeries: MapPolygonSeries;

   ui: UIComponent;

   jsonData = require('./config/population.json') ;

   initMap() {

       am4core.useTheme(am4themes_animated);

        // Create map instance
       this.chart = am4core.create("chartdiv", MapChart);
       this.chart.geodataNames = am4geodata_lang_CN;
        // Set map definition
       this.chart.geodata = am4geodata_worldHigh;
       // this.chart.geodataSource.url = "/path/to/myCustomMap.json";

        // 墨卡托投影
       this.chart.projection = new am4maps.projections.Mercator();
       // this.chart.projection = new am4maps.projections.Orthographic();
       this.chart.deltaLongitude = -160;//以太平洋为地图中心

       this.chart.panBehavior = 'move';//支持移动
       // this.chart.mouseWheelBehavior = 'zoom';//支持滚轮缩放

       //支持导出
       // this.chart.exporting.menu = new am4core.ExportMenu();

       // Zoom control
       this.chart.zoomControl = new am4maps.ZoomControl();

       this.worldSeries = new MapPolygonSeries();
       this.worldSeries.name = "世界";
       this.chart.series.push(this.worldSeries);

       this.worldSeries.useGeodata = true;
       this.worldSeries.data = this.jsonData;
       this.worldSeries.exclude = ["AQ"];//去除南极洲

       this.worldSeries.heatRules.push({
           "property": "fill",
           "target": this.worldSeries.mapPolygons.template,
           "min": am4core.color("lightskyblue"),
           "max": am4core.color("orangered")
       });

       let polygonTemplate = this.worldSeries.mapPolygons.template;
       polygonTemplate.tooltipText = "{name} - {value}";
       polygonTemplate.fill = am4core.color('gray');
       polygonTemplate.nonScalingStroke = true;
       polygonTemplate.propertyFields.fill = "fill";

       this.showGrid();
   }

   bindData(){
      this.worldSeries.data = this.jsonData;
   }

   initLegend(){
        this.chart.legend = new Legend();
        this.chart.legend.position = "right";
        this.chart.legend.align = "right";
    }

   //改变展示方式
   changeImgSeries(){
       this.worldSeries.heatRules.clear();
       this.chart.series.clear();

       this.worldSeries = new MapPolygonSeries();
       this.worldSeries.name = "世界";
       this.worldSeries.data = this.jsonData;
       this.chart.series.push(this.worldSeries);
      // this.worldSeries.data = [];

      let imageSeries = new MapImageSeries();
      console.log(this.chart.series);
      this.chart.series.push(imageSeries);
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipText = "{title}";
      imageSeries.mapImages.template.propertyFields.url = "url";

      let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle.radius = 10;
      circle.propertyFields.fill = "color";

      let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle2.radius = 20;
      circle2.propertyFields.fill = "color";


      circle2.events.on("inited", function(event: { type: "inited"; target: Circle }){
          animateBullet(event.target);
      })


      function animateBullet(circle) {
          let animation = circle.animate([{ property: "scale", from: 1, to: 3 },
                                          { property: "opacity", from: 1, to: 0 }], 3000, am4core.ease.circleInOut);
          animation.events.on("animationended", function(event){
              animateBullet(event.target.object);
          });
      }

      let colorSet = new am4core.ColorSet();

      imageSeries.data = [
          {
          "title": "Brussels",
          "latitude": 50.8371,
          "longitude": 4.3676,
          "color":colorSet.next()
      }, {
          "title": "Copenhagen",
          "latitude": 55.6763,
          "longitude": 12.5681,
          "color":colorSet.next()
      }, {
          "title": "Paris",
          "latitude": 48.8567,
          "longitude": 2.3510,
          "color":colorSet.next()
      }, {
          "title": "Reykjavik",
          "latitude": 64.1353,
          "longitude": -21.8952,
          "color":colorSet.next()
      }, {
          "title": "Moscow",
          "latitude": 55.7558,
          "longitude": 37.6176,
          "color":colorSet.next()
      }, {
          "title": "Madrid",
          "latitude": 40.4167,
          "longitude": -3.7033,
          "color":colorSet.next()
      }, {
          "title": "London",
          "latitude": 51.5002,
          "longitude": -0.1262,
          "url": "http://www.google.co.uk",
          "color":colorSet.next()
      }, {
          "title": "Peking",
          "latitude": 39.9056,
          "longitude": 116.3958,
          "color":colorSet.next()
      }, {
          "title": "New Delhi",
          "latitude": 28.6353,
          "longitude": 77.2250,
          "color":colorSet.next()
      }, {
          "title": "Tokyo",
          "latitude": 35.6785,
          "longitude": 139.6823,
          "url": "http://www.google.co.jp",
          "color":colorSet.next()
      }, {
          "title": "Ankara",
          "latitude": 39.9439,
          "longitude": 32.8560,
          "color":colorSet.next()
      }, {
          "title": "Buenos Aires",
          "latitude": -34.6118,
          "longitude": -58.4173,
          "color":colorSet.next()
      }, {
          "title": "Brasilia",
          "latitude": -15.7801,
          "longitude": -47.9292,
          "color":colorSet.next()
      }, {
          "title": "Ottawa",
          "latitude": 45.4235,
          "longitude": -75.6979,
          "color":colorSet.next()
      }, {
          "title": "Washington",
          "latitude": 38.8921,
          "longitude": -77.0241,
          "color":colorSet.next()
      }, {
          "title": "Kinshasa",
          "latitude": -4.3369,
          "longitude": 15.3271,
          "color":colorSet.next()
      }, {
          "title": "Cairo",
          "latitude": 30.0571,
          "longitude": 31.2272,
          "color":colorSet.next()
      }, {
          "title": "Pretoria",
          "latitude": -25.7463,
          "longitude": 28.1876,
          "color":colorSet.next()
      } ];

   }

   // 增加亚洲
   addAsia(){
       // this.asiaSeries = new MapPolygonSeries();
       // this.chart.series.push(this.asiaSeries);
       // this.asiaSeries.name = "亚洲";
       // this.asiaSeries.useGeodata = true;
       // this.asiaSeries.include = ["CN", "TW", "JP", "IN", "PK", "TL", "MY", "SP", "KR","KP"];
       // this.asiaSeries.mapPolygons.template.tooltipText = "{name} {value}";
       // this.asiaSeries.mapPolygons.template.fill = am4core.color("#521818");
       // this.asiaSeries.fill = am4core.color("#96BDC6");
   }

   //增加欧洲
   addEurope(){
        this.europeSeries = new MapPolygonSeries();
        this.chart.series.push(this.europeSeries);
        this.europeSeries.name = "欧洲";
        this.europeSeries.useGeodata = true;
        this.europeSeries.include = [
            "FI", "DK", "SE", "NO", "LT", "LV", "EE", "IS",
            "AT", "CZ", "DE", "HU", "LI", "PL", "SK", "SI", "CH",
            "MD", "BY", "UA",
            "AL", "BA", "BG", "HR", "GR", "XK", "MK", "ME", "RO", "RS",
            "BE", "FR", "IE", "IT", "LU", "MC", "NL", "GB", "ES", "PT", "AD"
        ];
        this.europeSeries.mapPolygons.template.tooltipText = "{name} {value}";
        this.europeSeries.mapPolygons.template.fill = am4core.color("#838");
        this.europeSeries.fill = am4core.color("#96BDC6");
   }

    //移动到中国
   gotoChina(){
       const geoPoint = {longitude:117, latitude:31 } as IGeoPoint;
       this.chart.zoomIn(geoPoint, 1*1000);
   }

   showGrid(){
        // Add grid
        const grid = this.chart.series.push(new am4maps.GraticuleSeries());
        grid.toBack();
    }

   switchToEarth(){
       this.chart.panBehavior = 'rotateLongLat';//支持移动
       this.chart.projection = new am4maps.projections.Orthographic();
   }

   changeToWorld(){
        this.worldSeries.data = this.jsonData;
        this.chart.geodata = am4geodata_worldHigh;
        this.worldSeries.exclude = ["AQ"];//去除南极洲
    }

   changeToAsia(){
        const asiaData = require('./config/population-asia.json') ;
        this.worldSeries.data = null;
        this.chart.geodata = am4geodata_asiaHigh;
        this.worldSeries.exclude = ["RU"];//去除南极洲
        this.worldSeries.data = asiaData;
    }

   changeToChina(){
        const chinaData = require('./config/population-china.json') ;
        this.worldSeries.data = null;
        this.chart.geodata = am4geodata_chinaHigh;
        this.worldSeries.data = chinaData;
   }

   //绑定按钮事件
   initUI(){
        this.ui = new UIComponent();
        this.ui.initBtn();
        this.ui.worldBtn.addEventListener('click', () => {this.changeToWorld()});
        this.ui.asiaBtn.addEventListener('click',  () => {this.changeToAsia()});
        this.ui.chinaBtn.addEventListener('click', () => {this.changeToChina()});
        this.ui.earthBtn.addEventListener('click', () => {this.switchToEarth()});
        this.ui.switchBtn.addEventListener('click', () => {this.changeImgSeries()});

    }
}
