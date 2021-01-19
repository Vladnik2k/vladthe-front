import React, {Component} from "react";
import logoImg from "../logoImg.png"
import {Link} from "react-router-dom";
import {Login} from "./auth/Login";
import {Registration} from "./auth/Registration";
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import NavItem from "react-bootstrap/cjs/NavItem";
import {connect} from "react-redux";

class NavBar extends Component {
    registrationRef: any = React.createRef();
    loginRef: any = React.createRef();

    handleLogin(): void {
        // @ts-ignore
        this.props.onChangeLogin(true);
    }

    render() {
        return (
            <div>
                <Login handleLogin={this.handleLogin.bind(this)} ref={this.loginRef}/>
                <Registration ref={this.registrationRef}/>

                <Navbar variant="dark" bg="dark" expand="lg">
                    <Navbar.Brand><img className="logo-image" src={logoImg} alt=""/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="navbarText">
                        <Nav className="mr-auto">
                            <NavItem><Link className="nav-link" to="/concerts">Список вистав</Link></NavItem>
                            <NavItem><Link className="nav-link" to="/actors">Список акторів</Link></NavItem>
                        </Nav>

                        {
                            !(this.props as any).loginState ?
                            <Nav className="right my-2 my-lg-0">
                                <NavItem className="nav-link cursor"
                                         onClick={() => this.loginRef.current.handleShow()}>Вхід</NavItem>
                                <NavItem className="nav-link cursor"
                                         onClick={() => this.registrationRef.current.handleShow()}>Реєстрація</NavItem>
                            </Nav> :
                            <Nav className="right my-2 my-lg-0">
                                <NavItem><Link className="nav-link" to="/profile">Профіль</Link></NavItem>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(
    state => ({
        loginState: state
    }), dispatch => ({
        onChangeLogin: (isLogin: boolean) => {
            dispatch({ type: "LOGIN", payload: isLogin });
        }
    })
)(NavBar);
