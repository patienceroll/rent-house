import React from 'react';
function getCurrentCity(){
    let localCity = JSON.parse(localStorage.getItem('localCity'));
    if(!localCity){
        return new Promise((res,rej)=>{
            try{
                var myCity = new window.BMap.LocalCity();
                myCity.get(()=>{
                    
                })
            }catch{

            }
        })
    }
}