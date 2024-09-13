import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const {actions} = useContext(Context)
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        let email = event.target.emailInput.value;
        let password = event.target.passwordInput.value;
        let response = await actions.login(email, password);
        if(response) {
            console.log('login successful')
            alert('login successful')
            navigate('/private')
        } else{
            console.log('login failed')
            alert('invalid username or password please try again')
            // navigate('/private')
        }
    }

    return (
        <div className="container authDiv">
            <h1 className="text-center my-3">Login</h1>
            <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <input type="email" placeholder="Type Email" name="emailInput" required></input>
                <input type="password" placeholder="Type Password" name="passwordInput" required></input>
                <button className="btn btn-primary mt-3" type="submit">Login</button>
                <br></br>
                <Link to="/signup">Click here to signup</Link>
            </form>
        </div>
    )
}