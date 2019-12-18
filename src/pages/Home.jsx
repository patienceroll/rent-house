import React from 'react';
import { Route } from 'react-router-dom'

import '../assets/fonts/iconfont.css';

import { TabBar} from 'antd-mobile';
import News from './News/news';
import Citys from './CityList/citys'
import HouseList from './HouseList/houseList'
import Profile from './Profile/profile'
// import { } from '../components/myComponent.js'



// tab栏组件数据
const tabPages = [
  { path: '/home/index', component: HouseList, icon: 'ind', name: '首页' },
  { path: '/cityList', component: Citys, icon: 'findHouse', name: '找房' },
  { path: '/home/news', component: News, icon: 'infom', name: '资讯' },
  { path: '/home/profile', component: Profile, icon: 'my', name: '我的' }
]

// tab栏组件
class NavTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '/home/index',
      hidden: false,
    };
  }
  changeTabbar(path) {
    this.setState({
      selectedTab: path
    });
    this.props.history.push(path);
  }
  renderItemList() {
    const tabs = this.props.tabs;
    return tabs.map(({ path, icon, name }) =>
      <TabBar.Item
        icon={<i className={`iconfont icon-${icon}`}></i>}
        selectedIcon={<i className={`iconfont icon-${icon}`}></i>}
        title={name}
        key={name}
        selected={this.state.selectedTab === path}
        data-seed="logId1"
        onPress={this.changeTabbar.bind(this, path)}
      >
      </TabBar.Item>
    )
  }
  render() {
    return (
      <div style={{ height: '50',position:"fixed",bottom:0 ,width:'100%'}  }>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#fff"
          hidden={this.state.hidden}
        >
          {this.renderItemList()}
        </TabBar>
      </div>
    );
  }
}


class Home extends React.Component {
  data = {
    routes: tabPages.map(({ path, component }) => ({ path, component }))
  }
  renderRoute() {
    this.data.routes[0].exact = true;
    return this.data.routes.map(item => <Route {...item} key={item.path}></Route>)
  }
  render() {
    return <div className='container'>
      <NavTabBar {...this.props} tabs={tabPages}></NavTabBar>
      {this.renderRoute()}
    </div>
  }
}


export default Home;
