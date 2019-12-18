import React from 'react';

import NavgationBar from '../../components/navigationBar';
import './maps.scss'

class Maps extends React.Component {
    componentDidMount() {
        this.renderMap();
    }

    renderMap() {
        if (window.BMap) {
            const { Map, Point, ScaleControl, NavigationControl } = window.BMap;
            const map = new Map('map-container');
            const point = new Point(116.404, 39.915);
            map.centerAndZoom(point, 15);
            map.addControl(new ScaleControl);
            map.addControl(new NavigationControl);
        }
        else {
            alert("百度地图API获取失败,请检查网络")
        }
    }

    render() {
        return <div className='map-find-house'>
            <NavgationBar>地图找房</NavgationBar>
            <div id="map-container"></div>
        </div>
    }
}
export default Maps;