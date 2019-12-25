import React, { Component } from 'react';


import { API, getCurrentCity } from '../../../../utils'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
    state = {
        // 筛选下拉高亮对应属性。
        titleSlectedStatus: {
            area: false,
            mode: false,
            price: false,
            more: false
        },
        selectedValues: {
            area: ['area', 'null'],
            mode: ['null'],
            price: ['null'],
            more: []
        },
        openType: '',
        filterData: null
    }

    async getFilterData() {
        const { value } = await getCurrentCity();
        const { body: res } = await API.get('/houses/condition?id=' + value);
        this.setState({
            filterData: res
        }, () => console.log(res));
    }

    get defaultValue() {
        const { selectedValues, openType } = this.state;
        return selectedValues[openType];
    }

    set defaultValue(value) {
        const { selectedValues, openType } = this.state;

        this.setState({
            selectedValues: {
                ...selectedValues,
                [openType]: value
            },
            openType: ''
        }, () => {
            console.log(this.state);
            this.generateFilterParams();
            this.titleClickHandler('');
        });
    }

    get showPicker() {
        const { openType } = this.state;
        // return openType === 'area' || openType === 'mode' || openType === 'price';
        return ['area', 'mode', 'price'].includes(openType);
    }

    generateFilterParams() {
        const { area, mode, price, more } = this.state.selectedValues

        const filters = {
            [area[0]]: area.length === 3 ? area[2] === 'null' ? area[1] : area[2] : 'null',
            rentType: mode[0],
            price: price[0],
            more: more.join(',')
        }

        this.props.onFilter(filters);
    }

    onCancel() {
        this.titleClickHandler('');
    }

    onSave(data) {
        this.defaultValue = data;
    }

    /**
     * @param {String} type 对应选中下拉高亮的键名。
     */
    titleClickHandler(type) {
        const { titleSlectedStatus: status, selectedValues: values } = this.state;

        const newStatus = { ...status };

        for (const key in status) {
            if (key === type) {
                newStatus[key] = true;
            } else {
                switch (key) {
                    case 'area':
                        newStatus[key] = !(values[key][0] === 'area' && values[key][1] === 'null');
                        break;
                    case 'mode': case 'price':
                        newStatus[key] = values[key][0] !== 'null';
                        break;
                    case 'more':
                        newStatus[key] = values[key].length > 0;
                        break;
                    default:
                        break;
                }
            }
        }

        this.setState({
            titleSlectedStatus: newStatus,
            openType: type
        })
    }

    componentDidMount() {
        // 获取所有筛选条件的数据。
        this.getFilterData();
        console.log(this.state.openType);
    }

    componentDidUpdate() {
        document.querySelector('.am-tab-bar').style.display = this.state.openType ? 'none' : 'block';
        document.querySelector('body').style.overflow = this.state.openType ? 'hidden' : 'auto';
    }

    renderFilterPicker() {
        if (this.showPicker) {
            const { openType, filterData: { area, subway, rentType, price } } = this.state;

            let data, columns = 1;

            switch (openType) {
                case 'area':
                    data = [area, subway]
                    columns = 3;
                    break;
                case 'mode':
                    data = rentType;
                    break;
                case 'price':
                    data = price;
                    break;
                default:
                    data = [];
                    break;
            }
            return <FilterPicker onCancel={this.onCancel.bind(this)} onSave={this.onSave.bind(this)} data={data} defaultValue={this.defaultValue} columns={columns} />
        }
        return null;
    }

    renderFilterMore() {
        const { openType, selectedValues: { more } } = this.state
        if (openType === 'more') {
            const { filterData: { roomType, oriented, floor, characteristic } } = this.state;

            const data = { roomType, oriented, floor, characteristic };

            return <FilterMore data={data} values={more} onSave={this.onSave.bind(this)} onCancel={this.onCancel.bind(this)} />
        }
    }

    render() {
        const { titleSlectedStatus } = this.state;

        return (
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层 */}
                {/* <div className={styles.mask} /> */}
                {this.showPicker && (
                        props => <div style={props} className={styles.mask} onClick={this.onCancel.bind(this)} />
                )}



                <div className={styles.content}>
                    {/* 标题栏 */}
                    <FilterTitle titleSlectedStatus={titleSlectedStatus} onTitleClick={this.titleClickHandler.bind(this)} />

                    {/* 前三个菜单对应的内容： */}
                    {/* <FilterPicker /> */}

                    {this.renderFilterPicker()}

                    {/* 最后一个菜单对应的内容： */}
                    {/* <FilterMore /> */}
                    {this.renderFilterMore()}
                </div>
            </div>
        )
    }
}
