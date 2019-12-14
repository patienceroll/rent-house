import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'

const App = (props) => {
    return (
        <Router>
            <Route path='/' exact render={()=><Redirect to="/home/index"/>}></Route>
            <Route path='/home' component={Home}></Route>
        </Router>
    )
}
export default App;