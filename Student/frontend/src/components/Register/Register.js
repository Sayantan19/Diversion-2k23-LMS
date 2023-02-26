import React, { Component } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import './Register.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions.js";
import classnames from "classnames";
// import { useNavigate } from '@reach/router';


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        console.log(props)
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        console.log("Authenticated? ",this.props.auth.isAuthenticated)
        console.log("History: ",this.props.router.navigate)
        if (this.props.auth.isAuthenticated) {
            this.props.router.navigate("/");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(this.props)
        console.log("History recorded: ", this.props.router.navigate)
        this.props.registerUser(newUser,this.props.router.navigate);
        console.log(newUser);
        console.log(typeof(newUser));
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container" id="register">
                <div className="container row">
                    <div className="col s2">
                        <Link to="/" style={{    display: "flex", textDecoration: "none", color: "black", fontFamily: 'Mulish', padding: "2px", margin: "2px auto"}}><i className="material-icons left">keyboard_backspace</i>  Back to home</Link>
                        <div className="col s12">
                            <h4><b>Register</b> below</h4>
                            <p className="grey-text text-darken-1">Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" className={classnames("cred w-100", { invalid: errors.name })} placeholder="Name"/>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className={classnames("cred w-100", { invalid: errors.email })} placeholder="Email" />
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames("cred w-100", { invalid: errors.password })} placeholder="Password" />
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" className={classnames("cred w-100", { invalid: errors.password2 })} placeholder="Confirm Password" />
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12">
                                <button style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} type="submit" className="btn btn-dark hoverable accent-3">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));