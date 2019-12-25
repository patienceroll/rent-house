import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
    state = {
        value: this.props.defaultValue
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            nextState.value = nextProps.defaultValue;
        }

        return true;
    }

    render() {
        const { onCancel, onSave, data, columns } = this.props;
        const { value } = this.state;

        return (
            <>
                {/* 选择器组件： */}
                <PickerView data={data} value={value} cols={columns} onChange={value => this.setState({ value })} />

                {/* 底部按钮 */}
                <FilterFooter onCancel={onCancel} onOk={() => onSave(value)} />
            </>
        )
    }
}
