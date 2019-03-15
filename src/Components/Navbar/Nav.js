import React, { Component } from 'react';
import {Navbar,NavDropdown,Nav} from 'react-bootstrap';
import './Nav.css';

export default class nav extends Component{

    onLogOut = () =>{
        fetch('http://localhost:8000/auth/logout',{
            method: 'get',
            headers: {'Content-type':'application/json'},
            credentials: 'include'
        })
        .then(response=>response.json())
        .then(data => {
            if (data.Message === 'Logged out.'){
                window.location.reload()
            }
        })
    }

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                    <NavDropdown title={"Hi, "+this.props.TeamName} id="basic-nav-dropdown">
                        <NavDropdown.Item>Points: {this.props.Points}</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.onLogOut}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}