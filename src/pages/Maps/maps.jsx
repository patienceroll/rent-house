import React from 'react';

import { API } from '../../utils/api';
import { Link } from 'react-router-dom';

import NavgationBar from '../../components/navigationBar';
import getCurrentCity from '../../utils/tools';
import { Toast } from 'antd-mobile';

import style from './maps.module.css';

const BMap = window.BMap;

class Maps extends React.Component {
    state = {
        housesList: [],
        isShowList: false
    }

    initMap(label) {
        var map = new BMap.Map("map-container");
        // 保存到类里面去
        this.map = map;
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(label, function (point) {
            if (point) {
                map.centerAndZoom(point, 11);
                map.addOverlay(new BMap.Marker(point));
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.NavigationControl());
            }
        }, label);
    }


    renderHousesList() {
        return this.state.housesList.map(item => (
            <div className={style.house} key={item.houseCode}>
                <div className={style.imgWrap}>
                    <img
                        className={style.img}
                        src={`http://localhost:8080${item.houseImg}`}
                        alt=""
                    />
                </div>
                <div className={style.content}>
                    <h3 className={style.title}>{item.title}</h3>
                    <div className={style.desc}>{item.desc}</div>
                    <div>
                        {/* ['近地铁', '随时看房'] */}
                        {item.tags.map((tag, index) => {
                            const tagClass = 'tag' + (index + 1)
                            return (
                                <span
                                    className={[style.tag, style[tagClass]].join(' ')}
                                    key={tag}
                                >
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                    <div className={style.price}>
                        <span className={style.priceNum}>{item.price}</span> 元/月
          </div>
                </div>
            </div>
        ))
    }

    async componentDidMount() {
        const data = await getCurrentCity();
        this.initMap(data.label);
        this.renderOverLays(data.value);
    }

    render() {
        return <div className={style.maps}>
            <NavgationBar className={style.navbar}>地图找房</NavgationBar>
            <div id="map-container" className={style.mapContainer}></div>

            {/* 展示房屋列表 */}
            <div
                className={[
                    style.houseList,
                    this.state.isShowList ? style.show : ''
                ].join(' ')}
            >
                <div className={style.titleWrap}>
                    <h1 className={style.listTitle}>房屋列表</h1>
                    <Link className={style.titleMore} to="/home/findHouse">
                        更多房源
            </Link>
                </div>

                <div className={style.houseItems}>
                    {/* 房屋结构 */}
                    {this.renderHousesList()}
                </div>
            </div>
        </div>
    }

    getTypeAndZoom() {
        const zoom = this.map.getZoom();
        console.log('zoom', zoom)
        let nextZoom, type;
        if (zoom < 12 && zoom >= 10) {
            nextZoom = 13;
            type = 'circle'
        } else if (zoom >= 12 && zoom < 14) {
            nextZoom = 15;
            type = 'circle';
        } else if (zoom >= 14 && zoom <= 16) {
            type = 'rect';
        }
        return {
            nextZoom,
            type
        }
    }

    async getHousesList(id) {
        try {
            Toast.loading('加载中...', 0, null, false)

            const res = await API.get(`/houses?cityId=${id}`)
            console.log('res', res)
            Toast.hide()

            this.setState({
                housesList: res.body.list,
                isShowList: true
            })
        } catch (e) {
            Toast.hide()
        }
    }

    // 操作 DOM 
    createOverLayer(data, zoom, type) {
        const { coord: { longitude, latitude }, label: areaName, count, value: areaId } = data;

        const areaPoint = new BMap.Point(longitude, latitude);

        if (type === 'circle') {
            // 区或镇
            this.creatCircle(areaPoint, areaName, count, areaId, zoom)
        } else {
            // 小区
            this.createRect(areaPoint, areaName, count, areaId)
        }
    }

    // 创建圆形覆盖物(小区级别以上) 
    creatCircle(point, name, count, areaId, zoom) {
        console.log(zoom)
        const label = new BMap.Label('', {
            position: point,
            offset: new BMap.Size(-35, -35)
        })

        label.id = areaId;
        label.setContent(
            `<div class="${style.bubble}">
<p class="${style.name}">${name}</p>
<p>${count}套</p>
</div>`)

        label.setStyle(label.style);
        label.addEventListener('click', () => {
            this.renderOverLays(areaId);
            this.map.centerAndZoom(point, zoom);

            setTimeout(() => this.map.clearOverlays(), 0)
        })

        this.map.addOverlay(label)
    }

    createRect(point, name, count, id) {
        // 创建覆盖物
        const label = new BMap.Label('', {
            position: point,
            offset: new BMap.Size(-50, -28)
        })
        label.id = id

        label.setContent(`
          <div class="${style.rect}">
            <span class="${style.housename}">${name}</span>
            <span class="${style.housenum}">${count}套</span>
            <i class="${style.arrow}"></i>
          </div>
        `)
        label.setStyle(label.Style)

        label.addEventListener('click', e => {
            this.getHousesList(id)
            const target = e.changedTouches[0]
            this.map.panBy(
                window.innerWidth / 2 - target.clientX,
                (window.innerHeight - 330) / 2 - target.clientY
            )
        })

        this.map.addOverlay(label)
    }

    async renderOverLays(areaId) {
        Toast.loading('加载房源中...', 0, null, false);
        try {
            const { body: data } = await API.get(`/area/map?id=${areaId}`);
            data.status !== 200 && Toast.info('加载失败,请检查网络');
            const { nextZoom, type } = this.getTypeAndZoom()
            data.forEach(item => {
                this.createOverLayer(item, nextZoom, type);
            })
        } finally {
            Toast.hide()
        }
    }



}
export default Maps;