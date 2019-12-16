import React from 'react';
import Home from './pages/Home';
import Maps from './pages/Maps/maps';
import CityList from './pages/CityList/citys';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


const App = (props) => {
    return (
        <Router>
            <Route path='/' exact render={()=><Redirect to="/home/index"/>}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/cityList' component={CityList}></Route>
            <Route path='/maps' component={Maps}></Route>
        </Router>
    )
}
export default App;