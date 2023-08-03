import {useState} from "react";
import './LoginForm.css'

function LoginForm({setDisplayLoginForm, setDisplayRegistrationForm}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        //sprawdzenie, czy nie ma użytkownika o takim loginie
        // validacja hasła
        // zapisanie użytkownika do bazy danych
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
            <button className="login-submit-btn" type="submit">Login</button>
            <p>Don't have an account?<br></br>
            <a className="register-link"
                  onClick={() => handleOpenRegisterForm()}>Register</a> instead!</p>
        </form>
    );
};
export default LoginForm;