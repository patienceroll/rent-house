import React from 'react';
import { List as LongList, AutoSizer } from 'react-virtualized'
import { NavBar, Icon } from 'antd-mobile';
import './citys.scss';

class Citys extends React.Component {
  state = {
    cityList: [],
    combineCityList: {},
    cityIndex: []
  }
  // 生成需要渲染的城市列表
  parseCityList(list) {
    console.log("开始生成需要渲染城市的列表...")
    const { combineCityList } = this.state;
    list.forEach(item => {
      !combineCityList[item.short[0]] && (combineCityList[item.short[0]] = []);
      combineCityList[item.short[0]] && combineCityList[item.short[0]].push(item.label);
    });
    // 生成城市的索引数组
    this.setState({
      cityList: ['current', 'hot'].concat(Object.keys(combineCityList).sort())
    }, () => { console.log(this.state.cityList) })
    // 请求热门城市的数据
    fetch('http://127.0.0.1:8080/area/hot')
      .then(res => res.json())
      .then(res => combineCityList['hot'] = res.body)
      .then(()=>console.log(this.state.combineCityList))
  }
  renderRow({ index, key, isScrolling, isVisible, style }) {
    const { combineCityList, cityIndex } = this.state;
    console.log("渲染长列表...");
    return <div key={index} >
      <li>{combineCityList[cityIndex[index]] && cityIndex[index]}</li>
    </div>

  }
  componentWillMount() {
    console.log("挂载之前...");
    fetch('http://127.0.0.1:8080/area/city?level=1')
      .then(res => res.json())
      .then(res =>
        this.setState({
          cityList: res.body
        }, () => this.parseCityList(this.state.cityList))
      )
    
  }
  render() {
    return (
      <div className='city-list'>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => { this.props.history.go(-1) }} >选择城市</NavBar>
        <AutoSizer>
          {({ height, width }) => {
            return <LongList
              width={width}
              height={height - 45}
              rowCount={this.state.cityIndex.length}
              rowHeight={20}
              rowRenderer={this.renderRow.bind(this)}
            />
          }}
        </AutoSizer>
      </div>
    )
  }
}
export default Citys;
