import React from 'react';
import NavBar from "./components/Navbar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Concerts} from "./components/concerts/Concerts";
import {Actors} from "./components/actors/Actors";
import {ActorInfo} from "./components/actors/ActorInfo";
import ConcertInfo from "./components/concerts/ConcertInfo";
import Profile from "./components/Profile";
import {connect} from "react-redux";

class App extends React.Component {
    render() {
        return (
            <Router>
                <NavBar/>

                <Switch>
                    <Route path="/concerts/:id" component={ConcertInfo}/>
                    <Route path="/concerts" component={Concerts}/>
                    <Route path="/actors/:id" component={ActorInfo}/>
                    <Route path="/actors" component={Actors}/>
                    {
                        (this.props as any).loginState ?
                        <Route path="/profile" component={Profile}/> :
                        <Route path="/profile"><Redirect to="/concerts"/></Route>
                    }
                    <Route path="/"><Redirect to="/concerts"/></Route>
                    <Route path="/**"><Redirect to="/concerts"/></Route>
                </Switch>
            </Router>
        );
    }
}

export default connect(
    state => ({
        loginState: state
    }), dispatch => ({})
)(App);
