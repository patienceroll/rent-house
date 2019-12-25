import React, { Component } from 'react';
import { Flex, Toast } from 'antd-mobile';

import { WindowScroller, AutoSizer, List, InfiniteLoader } from 'react-virtualized';

import { getCurrentCity, API, BASE_URL } from '../../utils';

import SearchHeader from '../../components/searchComponent';
import Filter from './components/Filter';
import HouseItem from '../../components/HouseItem';

import NoHouse from '../../components/NoHouse'

import styles from './HouseList.module.scss';
import { Sticky } from '../../components/Sticky';

export default class HouseList extends Component {
    state = {
        cityLabel: '',
        list: [],
        count: 5
    }

    data = {
        filters: {}
    }

    async getLabel() {
        const { label } = await getCurrentCity();
        this.setState({
            cityLabel: label
        })
    }

    async getHouseList() {
        // const { mode = 'null', ...lessFilters } = this.data.filters
        const { value } = await getCurrentCity();

        const params = {
            cityId: value,
            // rentType: mode,
            ...this.data.filters,
            start: 1,
            end: 20
        };

        try {
            Toast.loading('加载中..', 0, null, false)

            const { body: { list, count } } = await API.get('/houses', params);
            Toast.info(`共找到套${ count }房源`, 2, null, false);
            this.setState({
                list, count
            }, () => console.log(this.state))
        } catch (error) {

        } finally {
            Toast.hide();
        }
    }

    onFilter(filters) {
        window.scrollTo(0, 0);
        this.data.filters = filters;

        this.getHouseList();
    }

    componentDidMount() {
        this.getLabel();
        this.getHouseList();
    }

    gotoHouseDetail(id) {
        this.props.history.push('/detail/' + id)
    }

    renderHouseItems({ key, index, style, }) {
        const { list } = this.state;
        // const { houseImg, title, tags, price, desc } = list[index];

        // const itemProps = { src: BASE_URL + houseImg, title, tags, price, desc };

        const house = list[index];

        return house ?
            <HouseItem onClick={this.gotoHouseDetail.bind(this, house.houseCode)} key={key} style={style} src={BASE_URL + house.houseImg} title={house.title} tags={house.tags} price={house.price} desc={house.desc} /> :
            <div key={key} style={style}>
                <p className={styles.loading} />
            </div>;
    }

    isRowLoaded({ index }) {
        return !!this.state.list[index];
    }

    loadMoreRows({ startIndex, stopIndex }) {
        console.log(startIndex, stopIndex);
        console.log(JSON.parse(localStorage['CITY']),'json')
        const params = {
            cityId: JSON.parse(localStorage['CITY']).value,
            // rentType: mode,
            ...this.data.filters,
            start: startIndex + 1,
            end: stopIndex + 1
        };
        Toast.loading('加载更多中..', 0, null, false)

        return API.get('/houses', params).then(({ body: { list, count } }) => {

            Toast.info(`共找到套${ count }房源`, 2, null, false);
            Toast.hide();


            this.setState({
                list: [...this.state.list, ...list],
                count
            });
        });
    }

    rednerList() {
        const { count } = this.state;

        return count ? (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded.bind(this)}
                loadMoreRows={this.loadMoreRows.bind(this)}
                rowCount={count}
            >
                {({ onRowsRendered, registerChild }) => (<WindowScroller>
                    {({ height, isScrolling, scrollTop }) => (
                        <AutoSizer>
                            {({ width }) => (
                                <List
                                    ref={registerChild}
                                    autoHeight
                                    height={height}
                                    width={width}
                                    rowCount={count}
                                    rowHeight={120}
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    rowRenderer={this.renderHouseItems.bind(this)}
                                    onRowsRendered={onRowsRendered}
                                    scrollToAlignment="start" />
                            )}
                        </AutoSizer>
                    )}
                </WindowScroller>)}
            </InfiniteLoader>
        ) : <NoHouse>找不到房源信息！</NoHouse>
    }

    render() {
        const { cityLabel } = this.state;

        return (
            <div>
                <Flex className={styles.header}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)} />
                    <SearchHeader cityName={cityLabel} className={styles.searchHeader} />
                </Flex>

                <Sticky>
                    <Filter onFilter={this.onFilter.bind(this)} />
                </Sticky>


                <div className={styles.houseItems}>
                    {this.rednerList()}
                </div>
            </div>
        )
    }
}
