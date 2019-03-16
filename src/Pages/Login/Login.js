import React, { Component } from 'react';
import {Container,Row,Col,Button, Modal,Form} from 'react-bootstrap';
import './Login.css';
import Questions from '../Questions/Questions';
import Recaptcha from 'react-recaptcha';
import cookie from 'react-cookies';

let recaptchaInstance;

const executeCaptcha = function () {
    recaptchaInstance.execute();
  };

export default class Login extends Component{


    constructor(props){
        super(props)

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
            UsedHints: '',
            autoLogin: false,
            invalidEmail: false,
            invalidTeam: false,
            signUpErr: '',
            captchaToken: '',
            showRules: false
        }
    }

    callback = function () {
        console.log('Captcha loaded!');
      };
       
    openRules = () => {
        this.setState({showRules: true})
    }  

    closeRules = () => {
        this.setState({showRules: false})
    }
    // specifying verify callback function
    verifyCallback = response => {
        this.setState({captchaToken: response})
    }

    openLoginModal = () => {
        this.setState({showLogin: true})
    }

    closeLoginModal = () => {
        this.setState({showLogin: false, LoginErr: ''})
    }

    openRegModal = () => {
        this.setState({showSignup: true}, () => {
            executeCaptcha();
        })
    }

    closeRegModal = () => {
        this.setState({showSignup: false})
    }

    onEmailChange = (event) => {
        var email_test = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        this.setState({SignUpEmail: event.target.value},() => {
            if (email_test.test(this.state.SignUpEmail) || this.state.SignUpEmail === ''){
                this.setState({invalidEmail: false})
            }
            else{
                this.setState({invalidEmail: true})
            }
        })
    }

    onTeamNameChange = (event) => {
        this.setState({TeamName: event.target.value}, () => {
            var team_test = /^([a-zA-Z0-9 _-]+)$/
            if (team_test.test(this.state.TeamName) || this.state.TeamName === ''){
                this.setState({invalidTeam: false})
            }
            else{
                this.setState({invalidTeam: true})
            }
        })
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
        if (!this.state.invalidEmail && !this.state.invalidTeam && this.state.TeamName!=='' && this.state.SignUpEmail !== ''){
            this.setState({RegBtnTxt: 'Please Wait...', signUpErr: ''})
            fetch('http://enigma55-api.herokuapp.com/auth/signup',{
                method: 'post',
                headers: {'Content-type':'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    TeamName: this.state.TeamName,
                    Email: this.state.SignUpEmail,
                    Password: this.state.SignUpPass,
                    CaptchaToken: this.state.captchaToken
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.Status){
                    this.setState({RegBtnTxt: 'Register'})
                    alert('Successfully Registered. You may now login!');
                    this.setState({showSignup: false})
                }
                else{
                    alert(data.Message)
                }
                this.setState({RegBtnTxt: 'Register'})
            })

        }
        else{
            this.setState({signUpErr: 'Please check your details!'})
        }
    }

    onLogin = () => {
        this.setState({LogBtnTxt: 'Please Wait...'})
        fetch('http://enigma55-api.herokuapp.com/auth/login',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                auto: 0,
                Email: this.state.LoginEmail,
                Password: this.state.LoginPass
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.Status){
                this.setState({showLogin: false, showQuestions: true,AuthTeamName: data.Data.TeamName,Points: data.Data.Points,CurQuestion: data.Data.CurQuestion, id: data.Data._id,UsedHints: data.Data.UsedHints})
                cookie.save('enigma',{
                    token: data.token
                },{
                    maxAge: 900000
                })
            }
            else{
                this.setState({LoginErr: data.Message})
            }
            this.setState({LogBtnTxt: 'Log In'})
        })
    }

    componentWillMount(){

        if (cookie.load('enigma') !== undefined){
            this.setState({autoLogin: true})
            fetch('http://enigma55-api.herokuapp.com/auth/login',{
                method: 'post',
                headers: {'Content-type':'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    auto: 1,
                    token: cookie.load('enigma').token
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.Status){
                    this.setState({showLogin: false, showQuestions: true,AuthTeamName: data.Data.TeamName,Points: data.Data.Points,CurQuestion: data.Data.CurQuestion, id: data.Data._id,UsedHints: data.Data.UsedHints})
                }
                else{
                    console.log('Cookie expired')
                }
                this.setState({LogBtnTxt: 'Log In',autoLogin: false})
            })
            .catch(err => {
                console.log(err)
                this.setState({autoLogin: false})
            })

        }
    }

    render(){
        return(

            this.state.showQuestions ? 
            <Questions UsedHints={this.state.UsedHints} id={this.state.id} TeamName={this.state.AuthTeamName} Points={this.state.Points} CurQuestion={this.state.CurQuestion}/>
            :
            <div id='login'>
                {
                    this.state.autoLogin ? 
                        <p
                            style={{
                                "color":"#0f0",
                                "paddingTop" : "42vh"
                            }}
                        >Please wait...</p>
                        :
                        
                <div>
                    <Container>
                        <Row>
                            <Col>
                            <div id='login-container'>
                                <h1 style={{"color": "#0f0","marginBottom":"34px"}}>Enigma 5.5</h1>
                                <p className='blinking'>Select an option</p>
                                <Button onClick = {this.openLoginModal}>Play now</Button>
                                <Button onClick= {this.openRegModal}>Sign up</Button>
                                <Button onClick = {this.openRules}>Rules</Button>
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

                    <Modal id='rules-modal' show={this.state.showRules} onHide={this.closeRules}>
                        <Modal.Header closeButton>
                            <Modal.Title>Rules</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='rule'>1. For every correct answer, you will be rewarded 15 points.</p>
                            <p className='rule'>2. The first 5 players to solve a question will be awarded 20 points.</p>
                            <p className='rule'>3. Using a hint deducts 5 points.</p>

                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeRules}>
                            Close
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
                                <Form.Control isInvalid={this.state.invalidTeam} onChange={this.onTeamNameChange} type="text" placeholder="Team Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control isInvalid={this.state.invalidEmail} onChange={this.onEmailChange} type="email" placeholder="Email Address" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control onChange={this.onPassChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <p style={{"textAlign":"center","fontSize":"14px","color":"#f00"}}>{this.state.signUpErr}</p>
                        </Form>
                        <Recaptcha
                        ref={e => recaptchaInstance = e}
                                    sitekey="6LeQ05cUAAAAAP20kmdwNCsEeXnyUr82YWk9WAEy"
                                    size='invisible'
                                    verifyCallback={this.verifyCallback}
                                    onloadCallback={this.callback}
                                    theme='dark'
                                    />
                            
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
                }
            </div>
        );
    }
}