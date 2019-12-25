import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile'

import { Link } from 'react-router-dom'
import { withFormik } from 'formik'

import NavigationBar from '../../components/navigationBar'
import { API } from '../../utils/api'

import styles from './index.module.css'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    username: '',
    password: ''
  }


  inputHandlerName(e) {
    this.setState({
      username: e.target.value
    })
  }


  inputHandlerPass(e) {
    this.setState({
      password: e.target.value
    })
  }


  formSubmit(e) {
    e.preventDefault();
  }

  async login() {
    const { username, password } = this.state;
    const res = await API.post('/user/login', { 'username': username, 'password': password });
    console.log(res);
  }


  render() {
    console.log('props',this.props)
    return (
        <div className={styles.root}>
        {/* 顶部导航 */}
        <NavigationBar className={styles.navHeader}>账号登录</NavigationBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.formSubmit.bind(this)}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                value={this.state.username}
                onChange={this.inputHandlerName.bind(this)}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                value={this.state.password}
                onChange={this.inputHandlerPass.bind(this)}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit" onClick={this.login.bind(this)}>
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}
Login = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  handleSubmit: (values) => {

  }
})(Login)
export default Login
