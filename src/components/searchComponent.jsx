import { Flex } from 'antd-mobile';
import React from 'react'
import {withRouter} from 'react-router-dom'

import PropTypes from 'prop-types'

function SearchHeader({ history, cityName,className}) {
    return (
        <Flex className={className}>
            {/* 左侧白色区域 */}
            <Flex className="search">
                {/* 位置 */}
                <div className="location" onClick={() => history.push('/cityList')}>
                    <span className="name">{cityName}</span>
                    <i className="iconfont icon-arrow" />
                </div>

                {/* 搜索表单 */}
                <div className="form" onClick={() => history.push('/search')}>
                    <i className="iconfont icon-seach" />
                    <span className="text">请输入小区或地址</span>
                </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i className="iconfont icon-map" onClick={() => history.push('/maps')} />
        </Flex>
    )
}
// 设置校验
SearchHeader.propTypes = {
    cityName: PropTypes.string.isRequired
}
export default withRouter(SearchHeader)