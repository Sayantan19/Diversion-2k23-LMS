import React, { Component } from 'react'
import './Summary.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { accessCurrentUser, logoutUser } from "../../actions/authActions.js";
import axios from 'axios';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: null,
            time:null
        };
    }

    componentDidMount() {
        const token = accessCurrentUser();
        const dat = {
            'id': token.id
        }
        axios.post("/api/results/display", dat)
            .then(response => {
                console.log('Result: ' + response.status)
                // console.log("Response: " + JSON.stringify(response.data))
                this.setState({ score: response.data.score })
                this.setState({ time: response.data.time })

            })
            .catch(response => {
                console.log('Jhamela: ' + response.status)
            })
    }



    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { score } = this.state
        const {time} = this.state
        const { user } = this.props.auth;

        return (
            <>
                
                <div className="container" id='summary-body'>
                    <h2>Thank you for taking this test! Here is the summary:</h2>
                    <div className="container">
                        <ul>
                            <li>{<h4 id="Score">Points Scored: {score}</h4>}</li>
                            <li>{<h4 id="Time">Time spent: {time}</h4>}</li>
                        </ul>
                    </div>
                    <div className="container">
                        <a href='/' className="btn btn-outline-dark" onClick={this.onLogoutClick} role='button'>Logout</a>
                    </div>
                </div>
            </>
        )
    }
}
Summary.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Summary);
