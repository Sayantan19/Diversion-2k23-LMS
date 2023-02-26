import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logoutUser } from "../../actions/authActions";

import './Landing.css';
class Landing extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = '/';
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "60vh" }} className="card w-50 container bg-white my-3" id="Landing">

                <h4 className='text-center'>
                    Do you want to Set questions, Check Student Scores or Logout?
                </h4>
                <br />
                <div className="row">
                    <div className="col">
                        <Link to="/questions" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "140px", border: "1px solid black", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large btn-dark btn-outline-light waves-effect waves-dark hoverable accent-3">
                            Set Questions
                        </Link>
                    </div>
                    <div className="col">
                        <Link
                            to="/scores"
                            style={{
                                display: "flex", justifyContent: "center", alignItems: "center",
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large btn-outline-dark waves-effect waves-light hoverable light-text accent-3"
                        >
                            Check <br /> Scores
                        </Link>
                    </div>
                    <div className="col">
                        <Link
                            href="/"
                            onClick={this.onLogoutClick}
                            style={{
                                display: "flex", justifyContent: "center", alignItems: "center",
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                height: '62px',
                                border: '1px solid black'
                            }}
                            className="btn btn-large btn-dark btn-outline-light waves-effect waves-dark hoverable accent-3"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>


        );
    }
}
Landing.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Landing);
