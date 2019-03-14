import React, { Component } from 'react';
import {Container,Row,Col,InputGroup,FormControl,Button} from 'react-bootstrap';
import './Questions.css';
import Nav from '../../Components/Navbar/Nav';

export default class Questions extends Component{
    constructor(){
        super()
        this.state ={
            ImgUrl: '',
            Text: '',
            loading: true
        }
    }

    componentWillMount(){
        fetch('http://localhost:8000/question/getquestion',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                CurQuestion: this.props.CurQuestion
            })
        })
        .then(response=>response.json())
        .then(data => {
            if (data.Status){
                this.setState({
                    ImgUrl: data.Data.ImgUrl,
                    Text: data.Data.Text,
                    loading: false
                })
            }
            else{
                alert(data.Message)
            }
        })
    }
    render(){
        return(
            <div id='question-view'>
            <Nav TeamName={this.props.TeamName} Points={this.props.Points}/>
            {
                this.state.loading ?
                <p style={{
                    "color":"#0f0",
                    "marginTop" : "40vh"
                }}>Loading...</p>
                : 
            
            <Container>
                <Row>
                    <Col>
                        <div id='question-container'>
                        <img alt="Images are not being loaded :/" id='main-img' src={this.state.ImgUrl}/>
                        <p id="question-text">{this.state.Text}</p>
                        <InputGroup id='answer-input' className="mb-3" >
                            <InputGroup.Prepend>
                            <InputGroup.Text>></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Enter your answer here" aria-label="Amount (to the nearest dollar)" />
                        </InputGroup>
                        <Button id='submit-btn' variant='secondary'>Submit</Button>
                        <button id='hint-btn'>Click for hint!!</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            }
            </div>
        );
    }
}