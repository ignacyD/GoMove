import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './RegistrationForm.css'
import {UserContext} from "../../App";

function RegistrationForm({setDisplayLoginForm, setDisplayRegistrationForm}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);
    const [modalSize, setModalSize] = useState('40vh');
    const navigate = useNavigate();

    const setIsUserLogged = useContext(UserContext).setter


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleOpenLoginForm = () => {
        setDisplayRegistrationForm(false);
        setDisplayLoginForm(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage([]);
        if (!validateRegisterForm()) {
            return;
        }
        fetch("http://localhost:8080/auth/register", {
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "POST",
            "body": JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        }).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(data => {
                        localStorage.setItem("jwt", "Bearer " + data.token);
                        localStorage.setItem("userId", data.userId);
                        setDisplayRegistrationForm(false);
                        setIsUserLogged(true)
                        console.log("Registration successful");
                    })
                navigate("/additional-info-form")
            } else {
                console.log("Username or E-mail already exists")
                setErrorMessage(["Username or E-mail already in use"])
            }
        })
    };

    function validateRegisterForm() {
        const errors = [];
        if (username.trim().length < 4) {
            errors.push("username has to be at least 4 characters long");
        }
        if (!validateEmail(email)) {
            errors.push("provided e-mail adress is incorrect");
        }
        if (password !== confirmPassword) {
            errors.push("passwords doesn't match")
        }
        setErrorMessage(errors);
        if (!validatePassword(password) || errorMessage.length > 0) {
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePassword(password) {
        const minLength = 8;
        const minLowercase = 1;
        const minUppercase = 1;
        const minDigits = 1;
        const minSpecialChars = 1;
        const specialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        const errors = [];

        if (password.length < minLength) {
            errors.push("be " + minLength + " characters long");
        }

        const lowercaseCount = (password.match(/[a-z]/g) || []).length;
        if (lowercaseCount < minLowercase) {
            errors.push("have " + minLowercase + " lowercase characters");
        }

        const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
        if (uppercaseCount < minUppercase) {
            errors.push("have " + minUppercase + " uppercase characters");
        }

        const digitCount = (password.match(/\d/g) || []).length;
        if (digitCount < minDigits) {
            errors.push("have at least " + minDigits + " digits");
        }

        const specialCharCount = (password.match(specialChars) || []).length;
        if (specialCharCount < minSpecialChars) {
            errors.push("have at least " + minSpecialChars + " special characters");
        }

        setPasswordErrorMessage(errors);

        return errors.length === 0;
    }

    useEffect(() => {
        const registrationForm = document.querySelector('.registration-form');
        const newModalSize = registrationForm.scrollHeight + 40 + 'px';

        setModalSize(newModalSize);

        const modal = document.querySelector('.login-modal');
        modal.style.height = newModalSize;
        modal.style.top = `calc(50vh - ${newModalSize}/2)`;
    }, [errorMessage, passwordErrorMessage]);


    return (
        <div>
            <form className="registration-form" onSubmit={handleSubmit}>
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
                <div className="e-mail-field">
                    <label className="e-mail-label">E-mail</label>
                    <input
                        className="e-mail-input"
                        type="text"
                        id="e-mail"
                        value={email}
                        onChange={handleEmailChange}
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
                <div className="confirm-password-field">
                    <label className="confirm-password-label">Confirm password</label>
                    <input
                        className="confirm-password-input"
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    ></input>
                </div>
                <button className="register-submit-btn" type="submit">Register</button>
                <div className={errorMessage.length > 0 || passwordErrorMessage.length > 0 ? "errors-space" : ""}>
                    {errorMessage.length > 0 && (
                        <div>
                            <ul>
                                {errorMessage.map((message, index) => (
                                    <li className="error-mesage" key={index}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )
                    }
                    {
                        passwordErrorMessage.length > 0 && (
                            <div>
                                <p>Password has to:</p>
                                <ul>
                                    {passwordErrorMessage.map((message, index) => (
                                        <li className="error-mesage" key={index}>{message}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
                <p>Already have an account?<br></br>
                    <a className="register-link"
                       onClick={() => handleOpenLoginForm()}>Login</a> instead!</p>
            </form>
        </div>
    )
}

export default RegistrationForm;
