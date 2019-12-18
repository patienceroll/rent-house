import React from 'react';

import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import NavImage1 from '../../assets/images/nav-1.png';
import NavImage2 from '../../assets/images/nav-2.png';
import NavImage3 from '../../assets/images/nav-3.png';
import NavImage4 from '../../assets/images/nav-4.png';

import './houseList.scss';

import getCurrentCity from '../../utils/tools'


// 轮播图组件
class Swiper extends React.Component {
  state = {
    swiperList: [],
    isSwiperLoaded: false
  }
  getSwiperList() {
    fetch('http://127.0.0.1:8080/home/swiper')
      .then(res => res.json())
      .then(res => {
        this.setState({ swiperList: res.body, isSwiperLoaded: true });
      })
  }
  componentWillMount() {
    this.getSwiperList()
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  style = {
    swiperAStyle: { display: 'inline-block', width: '100%', height: 212 },
    swiperImgStyle: { width: '100%', verticalAlign: 'top', height: 212 }
  }
  render() {
    const { swiperAStyle, swiperImgStyle } = this.style;
    const { swiperList } = this.state;
    return this.state.isSwiperLoaded ? <Carousel
      autoplay
      infinite
    >
      {swiperList.map(val => (
        <a
          key={val}
          href="#"
          style={swiperAStyle}
        >
          <img
            src={`http://127.0.0.1:8080${val.imgSrc}`}
            alt=""
            style={swiperImgStyle}
          />
        </a>
      ))}
    </Carousel> : ('')
  }
}
// flex导航组件
class Navgation extends React.Component {
  state = {
    navList: [
      { src: NavImage1, id: 1, url: '/home/list', name: '整租' },
      { src: NavImage2, id: 2, url: '/home/list', name: '合租' },
      { src: NavImage3, id: 3, url: '/maps', name: '地图找房' },
      { src: NavImage4, id: 4, url: '/home/rent', name: '去出租' }
    ]
  }
  jumpTo(url) {
    this.props.history.push(url);
  }
  renderNavList() {
    return this.state.navList.map(item =>
      <Flex.Item key={item.id} onClick={this.jumpTo.bind(this, item.url)}>
        <img src={item.src} />
        <h2>{item.name}</h2>
      </Flex.Item>
    )
  }
  render() {
    return (
      <div className="flex-container">
        <Flex>
          {this.renderNavList()}
        </Flex>
      </div>
    )
  }
}
// 资讯组件
class GroupList extends React.Component {
  state = {
    groupList: [],
  }
  async getGroupList() {
    const { body: groupList } = await (await (await fetch('http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')).json());
    this.setState({
      groupList: groupList
    })
  }
  componentWillMount() {
    this.getGroupList()
  }
  renderGroups(item) {
    return (
      <Flex className="group-item" justify="around">
        <div className="desc">
          <p className="title">{item.title}</p>
          <span className="info">{item.desc}</span>
        </div>
        <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
      </Flex>
    )
  }
  render() {
    return <div>{/* 租房小组 */}
      <div className="group">
        <h3 className="group-title">
          租房小组 <span className="more">更多</span>
        </h3>
        <Grid data={this.state.groupList}
          columnNum={2}
          square={false}
          hasLine={false}
          renderItem={item => this.renderGroups(item)} />
      </div>

    </div>
  }
}
// 最新资讯
class LatestNews extends React.Component {
  state = {
    newsImformation: []
  }
  getLatestNews() {
    fetch('http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
      .then(res => res.json())
      .then(res => this.setState({ newsImformation: res.body }))
  }
  componentDidMount() {
    this.getLatestNews();
  }
  renderNews() {
    return this.state.newsImformation.map(item => {
      return (
        <div className="news-item" key={item.id}>
          <div className="imgwrap">
            <img
              className="img"
              src={`http://localhost:8080${item.imgSrc}`}
              alt=""
            />
          </div>
          <Flex className="content" direction="column" justify="between">
            <h3 className="title">{item.title}</h3>
            <Flex className="info" justify="between">
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex>
          </Flex>
        </div>
      )
    })
  }
  render() {
    return <div className="news">
      <h3 className="group-title">最新资讯</h3>
      <WingBlank size="md">{this.renderNews()}</WingBlank>
    </div>
  }
}

class HouseList extends React.Component {
  state = {
    cityName: '定位中...'
  }

  chooseCity() {
    this.props.history.push('/cityList');
  }

  componentDidMount() {
    getCurrentCity()
      .then((res) => this.setState({
        cityName: res.label
      }))

  }
  render() {
    return <div>
      <Swiper></Swiper>
      <Navgation {...this.props}></Navgation>
      <GroupList></GroupList>
      <LatestNews></LatestNews>
      <Flex className='search-box'>
        <Flex className="search">
          <div className="location" >
            <span className="name" onClick={this.chooseCity.bind(this)}>{this.state.cityName}</span>
            <i className="iconfont icon-arrow" />
          </div>
          <div className="form">
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区或地址</span>
          </div>
        </Flex>
        <i className="iconfont icon-map" onClick={() => this.props.history.push('/maps')} />
      </Flex>
    </div>

  }
}
export default HouseList;
