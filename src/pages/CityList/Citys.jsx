import React from 'react';

import { List as LongList, AutoSizer } from 'react-virtualized'
import {  Toast } from 'antd-mobile';
import './citys.scss';

import {getCurrentCity} from '../../utils/index';
import NavgationBar from '../../components/navigationBar';

// 索引的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

class Citys extends React.Component {
  constructor(props) {
    super(props)
    this.longListComponent = React.createRef()
  }
  state = {
    cityList: [],
    combineCityList: {},
    cityIndex: [],
    activeIndex: 0,
  }

  async getLongListData() {
    // 获取当前城市
    const currentCity = await getCurrentCity();
    // 获取城市列表
    const { body: cityList } = await (await fetch('http://127.0.0.1:8080/area/city?level=1')).json();
    // 获取热门城市
    const { body: hotCity } = await (await fetch('http://127.0.0.1:8080/area/hot')).json();
    // 获取 state 里面的数据
    let { combineCityList, cityIndex } = this.state;

    // 分区城市列表处理，相同字母开头的放入同一个数组
    cityList.forEach(item => {
      !combineCityList[item.short[0]] && (combineCityList[item.short[0]] = []);
      combineCityList[item.short[0]] && combineCityList[item.short[0]].push({ label: item.label });
    });

    // 生成城市列表索引
    const keys = Object.keys(combineCityList).sort();

    // 分区城市列表增加当前城市和热门城市
    (combineCityList['#'] = []) && combineCityList['#'].push({ label: currentCity.label });
    combineCityList['hot'] = hotCity;

    // 设置城市索引并更新页面
    this.setState({
      cityIndex: ['#', 'hot', ...keys]
    })
  }

  getRowHeight = ({ index }) => {
    const { combineCityList, cityIndex } = this.state
    return TITLE_HEIGHT + combineCityList[cityIndex[index]].length * NAME_HEIGHT
  }


  renderCityIndex() {
    return this.state.cityIndex.map((item, index) => {
      return (
        <li className="city-index-item" key={item} onClick={() => {this.longListComponent.current.scrollToRow(index);}}>
          <span className={this.state.activeIndex == index ? 'index-active' : ''} > {item == 'hot' ? '热' : item.toUpperCase()}</span>
        </li>
      )
    })
  }


  chooseCity(label, value) {
    const { combineCityList } = this.state;
    let flag = combineCityList['hot'].find(item => item.label === label);
    if (flag) {
      value = flag.value;
      localStorage.setItem('localCity', JSON.stringify({ label, value }));
      this.props.history.push('/home/index');
    }
    else {
      Toast.info('当前城市没有房源', 1.5)
    }
  }


  renderRow({ index, key, isScrolling, isVisible, style }) {
    const { combineCityList, cityIndex } = this.state;
    return (
      <div key={index} className='li-box' style={style} >
        <li> {index === 0 ? "当前城市" : cityIndex[index]}</li>
        {combineCityList[cityIndex[index]].map((item, index) => <li key={index} onClick={() => this.chooseCity(item.label, item.value)}>{item.label}</li>)}
      </div>
    )
  }

  rowRendered({ startIndex }) {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  componentDidMount() {
    this.getLongListData();
  }


  render() {
    return (
      <div className='city-list'>
        {/* <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => { this.props.history.go(-1) }} >选择城市</NavBar> */}
        <NavgationBar>选择城市</NavgationBar>
        <AutoSizer>
          {({ height, width }) => {
            const { combineCityList, cityIndex } = this.state;
            if (Object.keys(combineCityList).length === 0) return <h3>渲染列表中...</h3>;
            return <LongList
              ref={this.longListComponent}
              width={width}
              height={height - 45}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.renderRow.bind(this)}
              onRowsRendered={this.rowRendered.bind(this)}
              scrollToAlignment="start"
            />
          }}
        </AutoSizer>

        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}
export default Citys;
