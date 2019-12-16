import React from 'react';
import { withRouter } from 'react-router-dom';

import { NavBar, Icon } from 'antd-mobile';

var NavgationBar = withRouter(({ children, history ,onLeftClick=()=>history.go(-1)}) => {
    return (
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={onLeftClick} >{children}</NavBar>
    )
})

export default NavgationBar;