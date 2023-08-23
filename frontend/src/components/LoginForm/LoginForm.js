import {useContext, useState} from "react";
import './LoginForm.css'
import {Context} from "../../App";

function LoginForm({setDisplayLoginForm, setDisplayRegistrationForm}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const setIsUserLogged = useContext(Context).setIsUserLogged;

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleOpenRegisterForm = () => {
        setDisplayRegistrationForm(true);
        setDisplayLoginForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/auth/authenticate", {
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "POST",
            "body": JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(data => {
                        setShowErrorMessage(false);
                        localStorage.setItem("jwt", "Bearer " + data.token);
                        localStorage.setItem("userId", data.userId);
                        setDisplayLoginForm(false);
                        setIsUserLogged(true);
                        console.log("Login successful");
                        // TODO wyświetlić użytkownikowi informację o pomyślnym zalogowaniu
                    })
            } else {
                console.log("Invalid Credentials")
                setShowErrorMessage(true);
                // TODO wyświetlić komunikat o niepoprawnych danych
            }
        })
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="username-field">
                <label className="username-label">Username</label>
                <input
                    className="username-input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                ></input>
            </div>
            <div className="password-field">
                <label className="password-label">Password</label>
                <input
                    className="password-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                ></input>
            </div>
            {showErrorMessage &&
                <div className="log-error-message">
                    Incorrect username or password
                </div>
            }
            <button className="login-submit-btn" type="submit">Login</button>
            <p>Don't have an account?<br></br>
                <a className="register-link"
                   onClick={() => handleOpenRegisterForm()}>Register</a> instead!</p>
        </form>
    );
}

export default LoginForm;