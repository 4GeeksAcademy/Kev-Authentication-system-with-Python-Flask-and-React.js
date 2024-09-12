import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const {actions} = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let email = event.target.emailInput.value;
        let password = event.target.passwordInput.value;
        let confirmPassword = event.target.confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert('passwords do not match')
            return 
        }

        const response = await actions.signUp(email, password);
        if (response) {
            console.log('signup successful')
            alert("signup successful")
            navigate('/login')
        } else {
            console.log('signup failed')
        }
    }

    return (
        <div className="container authDiv">
            <h1 className="text-center my-3">Signup</h1>
            <form className="d-flex flex-column align-items-center " onSubmit={handleSubmit}>
                <input type="email" placeholder="Type Email" name="emailInput" required></input>
                <input type="password" placeholder="Type Password" name="passwordInput" required></input>
                <input type="password" placeholder="Confirm password" name="confirmPasswordInput" required></input>
                <button className="btn btn-primary mt-3" type="submit">Signup</button>

            </form>
        </div>
    )
}