import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

const titleList = [
    { title: '区域', type: 'area' },
    { title: '方式', type: 'mode' },
    { title: '租金', type: 'price' },
    { title: '筛选', type: 'more' }
]

export default function FilterTitle({ titleSlectedStatus, onTitleClick }) {
    function renderDropDownList(){
        return titleList.map(({title, type}) => (
            <Flex.Item key={type} onClick={() => onTitleClick(type)}>
                {/* 选中类名： selected */}
                <span className={[styles.dropdown, ...titleSlectedStatus[type] ? [styles.selected] : []].join(' ')}>
                    <span>{title}</span>
                    <i className="iconfont icon-arrow" />
                </span>
            </Flex.Item>
        ))
    }

    return (
        <Flex align="center" className={styles.root}>
            {renderDropDownList()}
        </Flex>
    )
}
