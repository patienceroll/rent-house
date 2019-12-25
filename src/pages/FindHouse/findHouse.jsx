import React from 'react';

import { Flex } from "antd-mobile";
import {getCurrentCity} from "../../utils/index";

import SearchNavBar from '../../components/searchComponent';
import Filter from './components/Filter/index';

import style from './findHoues.module.css';


class FindHouse extends React.Component {
    state = {
        currentCity: "",
        titleSelectedStatus: {
            area: false,
            mode: false,
            price: true,
            more: false
        }
    }


componentDidMount() {
    getCurrentCity().then(res => this.setState({
        currentCity: res.label
    }))
}

render() {
    return <>
        <Flex className={style.header}>
            <i className='iconfont icon-back' onClick={() => this.props.history.go(-1)}></i>
            <SearchNavBar cityName={this.state.currentCity} className={style.searchHeader}> </SearchNavBar>
        </Flex>

        <Filter></Filter>
    </>

}
}

export default FindHouse;


