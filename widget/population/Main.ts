import Component from "./Component";

const component = new Component();
component.initMap();
// component.addAsia();
// component.addEurope();
// component.initLegend();
component.initUI();
window['component'] = component;


