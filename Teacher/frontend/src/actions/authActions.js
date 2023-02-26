import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";
import jwt_decode from "jwt-decode";
// import { redirect } from "react-router-dom";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types.js";
// Register User
export const registerUser = (userData, navigate) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(function (res) {
            console.log(res.status);
            alert('You have successfully registered. Redirecting you to Login page')
            navigate("/")
        }) // re-direct to login on successful register
        .catch(function (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};
// Login - get user token
export const loginUser = (userData) => dispatch => {
    axios.post("/api/users/login", userData)
        .then(function (res) {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(function (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export function accessCurrentUser() {
    if (localStorage.jwtToken) {
        const decoded = jwt_decode(localStorage.jwtToken);
        return decoded;
    }
    else
        return null;
}


// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};