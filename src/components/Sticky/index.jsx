import React, { Component } from 'react';

import styles from './Sticky.module.css';

export class Sticky extends Component {
    state = {
        height: 0,
        top: 0,
        fixed: false
    }

    components = {}

    scrollWatcher() {
        const { top, fixed } = this.state
        const current = window.scrollY > top;
        current !== fixed && this.setState({ fixed: current });
    }

    componentDidMount() {
        const { top, height } = this.components.conatainer.getBoundingClientRect();
        this.setState({ top, height });
        window.addEventListener('scroll', this.scrollWatcherBound = this.scrollWatcher.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollWatcherBound)
    }

    render() {
        const { height, fixed } = this.state;
        const { children } = this.props;

        return (
            <div style={{ height }}>
                <div ref={$el => this.components.conatainer = $el} className={fixed ? styles.fixed : ''}>
                    {children}
                </div>
            </div>
        )
    }
}
