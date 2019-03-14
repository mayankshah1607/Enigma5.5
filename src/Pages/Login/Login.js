import React, { Component } from 'react';
import {Container,Row,Col,Button, Modal,Form} from 'react-bootstrap';
import './Login.css';

export default class Login extends Component{
    constructor(){
        super()
        this.state = {
            showLogin: false,
            showSignup: false
        }
    }

    openLoginModal = () => {
        this.setState({showLogin: true})
    }

    closeLoginModal = () => {
        this.setState({showLogin: false})
    }

    openRegModal = () => {
        this.setState({showSignup: true})
    }

    closeRegModal = () => {
        this.setState({showSignup: false})
    }
    render(){
        return(
            <div id='login'>
                <Container>
                    <Row>
                        <Col>
                        <div id='login-container'>
                            <h1 style={{"color": "#0f0","marginBottom":"40px"}}>Enigma 5.5</h1>
                            <Button onClick = {this.openLoginModal}>Play now</Button>
                            <Button onClick= {this.openRegModal}>Sign up</Button>
                            <Button>Rules</Button>
                        </div>
                        </Col>
                    </Row>
                </Container>

                <Modal id='login-modal' show={this.state.showLogin} onHide={this.closeLoginModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeLoginModal}>
                        Close
                        </Button>
                        <Button id='login-btn' variant="primary" onClick={this.closeLoginModal}>
                        Log In
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal id='signup-modal' show={this.state.showSignup} onHide={this.closeRegModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                         <Form.Group>
                            <Form.Control type="text" placeholder="Team Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="email" placeholder="Email Address" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeRegModal}>
                        Close
                        </Button>
                        <Button id='login-btn' variant="primary" onClick={this.closeRegModal}>
                        Register
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}