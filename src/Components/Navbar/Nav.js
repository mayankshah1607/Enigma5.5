import React, { Component } from 'react';
import {Navbar,NavDropdown,Nav} from 'react-bootstrap';
import './Nav.css';

export default class nav extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="#home">Leaderboard</Nav.Link>
                    <NavDropdown title="Hi, Mayank" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Points: 100</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Log Out</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}