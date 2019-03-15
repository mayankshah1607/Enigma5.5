import React, { Component } from 'react';
import {Container,Row,Col,Button, Modal,Form} from 'react-bootstrap';
import './Login.css';
import Questions from '../Questions/Questions'

export default class Login extends Component{
    constructor(){
        super()
        this.state = {
            showLogin: false,
            showSignup: false,
            SignUpEmail: '',
            TeamName: '',
            SignUpPass: '',
            LoginPass: '',
            LoginEmail: '',
            RegBtnTxt: 'Register',
            LogBtnTxt: 'Log In',
            LoginErr: '',
            showQuestions: false,
            AuthTeamName: '',
            Points: 0,
            CurQuestion: 1,
            id: '',
            UsedHints: ''
        }
    }

    openLoginModal = () => {
        this.setState({showLogin: true})
    }

    closeLoginModal = () => {
        this.setState({showLogin: false, LoginErr: ''})
    }

    openRegModal = () => {
        this.setState({showSignup: true})
    }

    closeRegModal = () => {
        this.setState({showSignup: false})
    }

    onEmailChange = (event) => {
        this.setState({SignUpEmail: event.target.value})
    }

    onTeamNameChange = (event) => {
        this.setState({TeamName: event.target.value})
    }

    onPassChange = (event) => {
        this.setState({SignUpPass: event.target.value})
    }

    onLoginEmailChange = (event) => {
        this.setState({LoginEmail: event.target.value})
    }

    onLoginPassChange = (event) => {
        this.setState({LoginPass: event.target.value})
    }

    onReg = () => {
        this.setState({RegBtnTxt: 'Please Wait...'})
        fetch('http://localhost:8000/auth/signup',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                TeamName: this.state.TeamName,
                Email: this.state.SignUpEmail,
                Password: this.state.SignUpPass
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.Status){
                this.setState({RegBtnTxt: 'Register'})
                alert('Successfully Registered. You may now login!');
                this.setState({showSignup: false})
            }
        })
    }

    onLogin = () => {
        this.setState({LogBtnTxt: 'Please Wait...'})
        fetch('http://localhost:8000/auth/login',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                Email: this.state.LoginEmail,
                Password: this.state.LoginPass
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.Status){
                this.setState({showLogin: false, showQuestions: true,AuthTeamName: data.Data.TeamName,Points: data.Data.Points,CurQuestion: data.Data.CurQuestion, id: data.Data._id,UsedHints: data.Data.UsedHints})
            }
            else{
                this.setState({LoginErr: data.Message})
            }
            this.setState({LogBtnTxt: 'Log In'})
        })
    }

    render(){
        return(

            this.state.showQuestions ? 
            <Questions UsedHints={this.state.UsedHints} id={this.state.id} TeamName={this.state.AuthTeamName} Points={this.state.Points} CurQuestion={this.state.CurQuestion}/>
            :
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
                            <Form.Control onChange={this.onLoginEmailChange} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control onChange={this.onLoginPassChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <p style={{"textAlign":"center","fontSize":"14px","color":"#f00"}}>{this.state.LoginErr}</p>
                    </Form>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeLoginModal}>
                        Close
                        </Button>
                        <Button id='login-btn' variant="primary" onClick={this.onLogin}>
                        {this.state.LogBtnTxt}
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
                            <Form.Control onChange={this.onTeamNameChange} type="text" placeholder="Team Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control onChange={this.onEmailChange} type="email" placeholder="Email Address" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control onChange={this.onPassChange} type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeRegModal}>
                        Close
                        </Button>
                        <Button id='login-btn' variant="primary" onClick={this.onReg}>
                        {this.state.RegBtnTxt}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}