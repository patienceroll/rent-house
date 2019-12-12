import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import News from './News/News';
import Citys from './CityList/Citys'
import HouseList from './HouseList/houseList'
import Profile from './Profile/profile'
// import { } from '../components/myComponent.js'

import '../assets/fonts/iconfont.css'
import { TabBar } from 'antd-mobile';

const tabPages = [
  { path: '/home/index', component: News, icon: 'ind', name: '首页' },
  { path: '/home/list', component: Citys, icon: 'findHouse', name: '找房' },
  { path: '/home/news', component: HouseList, icon: 'infom', name: '资讯' },
  { path: '/home/profile', component: Profile, icon: 'my', name: '我的' }
]

class NavTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '/home/index',
      hidden: false,
      fullScreen: true,
    };
  }
  changeTabbar(path) {
    this.setState({
      selectedTab: path
    });
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
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
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
    return this.data.routes.map(item => <Route {...item} key={item.path}></Route>)
  }
  render() {
    return <div>
      {this.renderRoute()}
      <NavTabBar {...this.props} tabs={tabPages}></NavTabBar>
    </div>
  }
}


export default Home;
