import React from 'react';

import {Toast } from "antd-mobile";

// 获取当前城市的组件
function getCurrentCity() {
    let localCity = JSON.parse(localStorage.getItem('localCity'));
    if (!localCity) {
        return new Promise((resolve, reject) => {
            try {
                var myCity = new window.BMap.LocalCity();
                myCity.get(async (res) => {
                    const data = await (await fetch(`http://localhost:8080/area/info?name=${res.name}`)).json();
                    console.log(data);
                    if (data.status != 200) {
                        alert(data.description);
                        return false;
                    }
                    localStorage.setItem('localCity', JSON.stringify(data.body));
                    resolve(data.body);
                })
            } catch{
                reject((err) => Toast.fail('定位城市失败,请检查网络',1.5));
            }
        })
    }
    return Promise.resolve(localCity);
}


export default getCurrentCity;