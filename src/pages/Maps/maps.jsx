import React from 'react';

import NavgationBar from'../../components/navigationBar';
import './maps.scss'

class Maps extends React.Component {
    componentDidMount() {
        if (window.BMap) {
            const { Map, Point } = window.BMap;
            const map = new Map('map-container');
            const point = new Point(116.404, 39.915);
            map.centerAndZoom(point, 15)
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