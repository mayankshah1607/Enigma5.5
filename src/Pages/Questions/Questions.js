import React, { Component } from 'react';
import {Container,Row,Col,InputGroup,FormControl,Button} from 'react-bootstrap';
import './Questions.css';
import Nav from '../../Components/Navbar/Nav';

export default class Questions extends Component{
    render(){
        return(
            <div id='question-view'>
            <Nav/>
            <Container>
                <Row>
                    <Col>
                        <div id='question-container'>
                        <img id='main-img' src="https://ichef.bbci.co.uk/images/ic/704xn/p072ms6r.jpg"/>
                        <InputGroup id='answer-input' className="mb-3" >
                            <InputGroup.Prepend>
                            <InputGroup.Text>></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Enter your answer here" aria-label="Amount (to the nearest dollar)" />
                        </InputGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}