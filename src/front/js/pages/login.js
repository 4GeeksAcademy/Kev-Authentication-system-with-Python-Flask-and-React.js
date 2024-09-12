import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {

    return (
        <div className="container authDiv">
            <h1 className="text-center my-3">Login</h1>
            <form className="d-flex flex-column align-items-center">
                <input type="email" placeholder="Type Email" name="emailInput" required></input>
                <input type="password" placeholder="Type Password" name="passwordInput" required></input>
                <button className="btn btn-primary mt-3" type="submit">Login</button>
                <br></br>
                <Link to="/signup">Click here to signup</Link>
            </form>
        </div>
    )
}