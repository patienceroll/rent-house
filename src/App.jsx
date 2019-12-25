import React from 'react';
import Home from './pages/Home';
import Maps from './pages/Maps/maps';
import CityList from './pages/CityList/citys';
import Detail from './pages/Detail/index.js';
import Login from './pages/Login/index.js';
import Register from './pages/Registe/index.js';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


const App = (props) => {
    return (
        <Router>
            <Route path='/' exact render={()=><Redirect to="/home/index"/>}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/cityList' component={CityList}></Route>
            <Route path='/maps' component={Maps}></Route>
            <Route path='/detail/:id' component={Detail}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/registe' component={Register}></Route>
        </Router>
    )
}
export default App;