import React, { Component } from 'react';
import './Leaderboard.css';
import {Table} from 'react-bootstrap';
import cookie from 'react-cookies';

export default class Leaderboard extends Component{
    constructor(){
        super()
        this.state = {
            data: [],
            loading: true
        }
    }
    componentWillMount(){
        if (cookie.load('enigma_user') === undefined){
            window.location.href = '/'
        }
        else{
            fetch('http://localhost:8000/question/leaderboard',{
                method: 'get',
                headers: {'Content-type':'application/json'},
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.Status){
                    this.setState({data: data.Data})
                }
                else{
                    alert('Invalid request')
                }
                this.setState({loading: false})
            })

        }
    }

    render(){
        const rows = this.state.data.map((obj,i) => {
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{obj.TeamName}</td>
                    <td>{obj.CurQuestion-1}</td>
                    <td>{obj.Points}</td>
                </tr>
            );
        })

        return(
            <div id='leaderboard'>
                <div id='back-btn'>
                    <a href='/'>Go Back</a>
                </div>
                <h3>Leaderboard</h3>
                {
                    this.state.loading ? 
                    <p
                    style={{
                        "color" : "#0f0",
                        "paddingTop" : "32vh"
                    }}
                    >Fetching data...</p>
                    :
                <div id='table-holder'>
                    <Table responsive='sm' striped variant='dark'>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                        <th>Solved</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                </div>
                }
            </div>
        );
    }
}