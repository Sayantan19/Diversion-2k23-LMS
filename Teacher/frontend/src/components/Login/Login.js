import './Login.css'
import React, { Component } from 'react';
import { Link, redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions.js";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
        console.log(this.props)
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            console.log("Here!")
            window.location.href = "./landing";
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('nextProps: ',nextProps)
        if (nextProps.auth.isAuthenticated) {
            window.location.href = "./landing"; // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.state;

        return (
            <section className=" position-relative py-4 py-xl-5" id="login">
                <div className="container card" id='login-box'>
                    <div className="row">
                        <div className="col-md-8 col-xl-6 text-center mx-auto my-3">
                            <h2>Log in</h2>
                            <p className="w-lg-50 my-auto">Please enter your credentials</p>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4" id="inner-box">
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column align-items-center w-100">
                                    <div className="bs-icon-xl bs-icon-circle bg-light bs-icon-primary bs-icon my-2" id="profile-icon"><svg className="bi bi-person" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                    </svg></div>
                                    <p className="grey-text text-dark py-2">Don't have an account? <Link to="/register">Register</Link></p>
                                    <form className="text-center" noValidate onSubmit={this.onSubmit}>
                                        <div className="mb-2"><input onChange={this.onChange} error={errors.email} value={this.state.email} id="email" type="email" placeholder="Email" className={classnames("cred", { invalid: errors.email || errors.emailnotfound })} />
                                            <p className="text-danger">{errors.email}{errors.emailnotfound}</p>
                                        </div>
                                        <div className="mb-2"><input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" placeholder="Password" className={classnames("cred", { invalid: errors.password || errors.passwordincorrect })} />
                                            <p className="red-danger">{errors.password}{errors.passwordincorrect}</p>
                                        </div>
                                        <div className="mb-3"><button className="btn btn-dark d-block w-100" type="submit">Login</button></div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
