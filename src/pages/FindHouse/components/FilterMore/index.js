import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
    state = {
        selectedValues: this.props.values
    }

    checkHandler(value) {
        const { selectedValues: [...selected] } = this.state;

        selected.some((i, idx) => i === value && selected.splice(idx, 1)) || selected.push(value);
    
        this.setState({
            selectedValues: selected
        });
    }

    // 渲染标签
    renderFilters(filter) {
        const { selectedValues } = this.state;

        // 高亮类名： styles.tagActive
        return filter.map(({ label, value }) => {
            const isChecked = selectedValues.includes(value)

            return (
                <span onClick={this.checkHandler.bind(this, value)} key={value} className={[styles.tag, isChecked ? styles.tagActive : ''].join(' ').trim()}>{label}</span>
            )
        })
    }

    render() {
        const { data: { roomType, oriented, floor, characteristic }, onSave, onCancel } = this.props;
        const { selectedValues } = this.state
        console.log(this.props);

        return (
            <div className={styles.root}>
                {/* 遮罩层 */}
                <div className={styles.mask} onClick={onCancel} />

                {/* 条件内容 */}
                <div className={styles.tags}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

                        <dt className={styles.dt}>朝向</dt>
                        <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

                        <dt className={styles.dt}>楼层</dt>
                        <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

                        <dt className={styles.dt}>房屋亮点</dt>
                        <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
                    </dl>
                </div>

                {/* 底部按钮 */}
                <FilterFooter className={styles.footer} onCancel={() => this.setState({selectedValues: []})} cancelText="清空" onOk={() => onSave(selectedValues)} />
            </div>
        )
    }
}
