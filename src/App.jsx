import React from 'react';
import Home from './pages/Home';
import Citys from './pages/CityList/Citys';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

const App = (props) => {
    return (
        <Router>
            <ul>
                <li>
                    <Link to='/home'>首页</Link>
                </li>
                <li>
                    <Link to='/cityList'>City</Link>
                </li>
            </ul>
            <Route path='/home'><Home></Home></Route>
            <Route path='/cityList'><Citys></Citys></Route>
        </Router>
    )
}
export default App;