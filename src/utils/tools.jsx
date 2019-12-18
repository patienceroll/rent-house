import React from 'react';
function getCurrentCity(){
    let localCity = JSON.parse(localStorage.getItem('localCity'));
    if(!localCity){
        return new Promise((resolve,reject)=>{
            try{
                var myCity = new window.BMap.LocalCity();
                myCity.get( async (res)=>{
                    const data = await (await fetch(`http://localhost:8080/area/info?name=${res.name}`)).json();
                    console.log(data);
                    if(data.status != 200){
                        alert(data.description);
                        return false;   
                    }
                    localStorage.setItem('localCity',JSON.stringify(data.body));
                    resolve(data.body);
                })
            }catch{
              reject((err)=>console.log(err));
            }
        })
    }
    return Promise.resolve(localCity);
}
export default getCurrentCity;