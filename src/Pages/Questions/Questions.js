import React, { Component } from 'react';
import {Container,Row,Col,InputGroup,FormControl,Button,Modal} from 'react-bootstrap';
import './Questions.css';
import Nav from '../../Components/Navbar/Nav';

export default class Questions extends Component{
    constructor(props){
        super(props)
        this.state ={
            ImgUrl: '',
            Text: '',
            loading: true,
            Ans: '',
            showModal: false,
            showWrong: false,
            subTxt: 'Submit',
            Points: this.props.Points,
            CurQuestion: this.props.CurQuestion,
            useHint: this.props.UsedHints[this.props.CurQuestion-1],
            id: this.props.id,
            hint: '',
            showHintModal :false
        }
    }

    closeHintModal = () => {
        this.setState({showHintModal: false})
    }

    onAnsChange = (event) => {
        this.setState({Ans: event.target.value})
    }

    onGetHint = () => {

        fetch('http://localhost:8000/question/gethint',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                CurQuestion: this.state.CurQuestion,
                id: this.props.id
                })
            })
            .then(response => response.json())
            .then(data => {
                this.setState({useHint: true, hint: data.Hint, showHintModal : true})
            })

    }

    onSubmit = () => {
        this.setState({subTxt: 'Checking...'})
        fetch('http://localhost:8000/question/check',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                CurQuestion: this.state.CurQuestion,
                Ans: this.state.Ans,
                id: this.props.id,
                Points: this.state.Points,
                useHint: this.state.useHint
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.Status){
                    if (data.Message === 'Correct'){
                        console.log(data)
                        this.setState({
                            showModal: true, 
                            showWrong: false,
                            Points: data.Data.Points,
                            CurQuestion: data.Data.CurQuestion
                        })
                    }
                    else{
                        this.setState({showWrong: true})
                    }
                }
                this.setState({subTxt: 'Submit'})
        })
    }

    showNext = () => {
        this.setState({showModal: false, loading: true})
        fetch('http://localhost:8000/question/getquestion',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                CurQuestion: this.state.CurQuestion
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

    componentWillMount(){
        fetch('http://localhost:8000/question/getquestion',{
            method: 'post',
            headers: {'Content-type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                CurQuestion: this.state.CurQuestion
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
            <Nav TeamName={this.props.TeamName} Points={this.state.Points}/>
            {
                this.state.loading ?
                <p style={{
                    "color":"#0f0",
                    "paddingTop" : "33.5vh"
                }}>Loading...</p>
                : 
            
            <Container>
                <Row>
                    <Col>
                        <div id='question-container'>
                        <img alt="Images are not being loaded :/" id='main-img' src={this.state.ImgUrl}/>
                        <p id="question-text">{this.state.Text}</p>
                        <InputGroup id='answer-input' >
                            <InputGroup.Prepend>
                            <InputGroup.Text>></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={this.onAnsChange} placeholder="Enter your answer" aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Append>
                            <InputGroup.Text>{'<'}</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        {
                            this.state.showWrong?
                            <p
                                style={{
                                    "color" : "#f00",
                                    "fontSize" : "10px"
                                }}
                            >Wrong answer!</p>
                            :
                            null

                        }
                        <Button onClick={this.onSubmit} id='submit-btn' variant='secondary'>{this.state.subTxt}</Button>
                        <button onClick={this.onGetHint} id='hint-btn'>Click for hint!!</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            }
            <Modal id='correct-ans' show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>Congratulations!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{
                            "color":"#0f0"
                        }}>You got the right answer.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.showNext}>
                        Next Question
                        </Button>
                    </Modal.Footer>
            </Modal>

            <Modal id='hint-modal' show={this.state.showHintModal}>
                    <Modal.Header>
                        <Modal.Title>Hint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{
                            "color":"#0f0"
                        }}>{this.state.hint}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeHintModal}>
                        Close
                        </Button>
                    </Modal.Footer>
            </Modal>
            </div>
        );
    }
}