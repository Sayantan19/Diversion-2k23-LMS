import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Landing.css';
class Landing extends Component {
    render() {
        return (
            <div style={{ height: "60vh" }} className="card w-50 container bg-white my-3" id="Landing">

                <h4>
                    Do you want to Login or Register?
                </h4>
                <br />
                <div className="row">
                    <div className="col">
                        <Link to="/register" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "140px",border: "1px solid black", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large btn-dark btn-outline-light waves-effect waves-dark hoverable accent-3">
                            Register
                        </Link>
                    </div>
                    <div className="col">
                        <Link
                            to="/login"
                            style={{
                                display: "flex", justifyContent: "center", alignItems: "center",
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large btn-outline-dark waves-effect waves-light hoverable light-text accent-3"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>


        );
    }
}
export default Landing;