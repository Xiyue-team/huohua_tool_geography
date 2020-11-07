/**
 *
 *@since 2.0
 *@author enming
 *@Date 2020/10/22 18:18
 */
import {Scene, Marker, Popup, GaodeMap} from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
const scene = new Scene({
    id: 'map',
    map: new GaodeMap({
        style: 'light',
        pitch: 0,
        center: [ 121.4316962, 31.26082325 ],
        zoom: 6.056
    })
});
scene.on('loaded', () => {
// 创建默认 marker
    const popup = new Popup({
        offsets: [ 0, 20 ]
    }).setText('hello');

    const marker = new Marker({color:'red'})
        .setLnglat({ lng:121.4316962, lat:31.26082325 })
        .setPopup(popup);
    const marker2 = new Marker({color:'blue'})
        .setLnglat({ lng:117.4316962, lat:31.2082325 })
        .setPopup(popup);

    scene.addMarker(marker);
    scene.addMarker(marker2);
});
document.getElementById('cesiumContainer').style.display ='none';
