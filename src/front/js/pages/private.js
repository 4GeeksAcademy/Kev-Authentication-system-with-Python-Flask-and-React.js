import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private = () => {
    const { actions } = useContext(Context)
    const [isAuthenticated, setIsAuthenticated] = useState('pending')

    useEffect(() => {
        let authenticate = async () => {
            try {
                const result = await actions.goPrivate();
                setIsAuthenticated(result ? "yes" : "no")
            } catch (error) {
                console.error('error occurred during athentication', error)
                setIsAuthenticated('no')
            }
        }
        authenticate();
    }, [actions])


    switch (isAuthenticated) {
        case 'pending':
            return (
                <div className="container text-center mt-4">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            )
        case "yes":
            return (
                <div className="container text-center mt-4">
                    <h1>private page</h1>
                    <p>this page is only accessable to successfully login users</p>
                </div>
            )
        case "no":
            return (
                <div className="container text-center mt-4">
                    <h1>Access Denied</h1>
                    <p>you're not an authenticated user, please login successfully to access private page</p>
                </div>
            )
    }
}