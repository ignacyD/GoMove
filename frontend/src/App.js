import './App.css';
import Navbar from "./components/Navbar/Navbar";
import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Modal from "react-modal";
import loginFormStyles from "./ModalStyles";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

function App() {
    const [displayLoginForm, setDisplayLoginForm] = useState(false)
    const [displayRegistrationForm, setDisplayRegistrationForm] = useState(false);
    let navigate = useNavigate();

    function handleLogout() {
        localStorage.setItem("userId", "");
        localStorage.setItem("jwt", "");
        navigate("/");
        console.log("Logout successful");
    }

    function closeForms() {
        setDisplayLoginForm(false);
        setDisplayRegistrationForm(false);
    }

    return (
        <div className="App">
            <Navbar setDisplayLoginForm={setDisplayLoginForm} handleLogout={handleLogout}/>
            <Modal
                isOpen={displayLoginForm || displayRegistrationForm}
                onRequestClose={() => closeForms()}
                contentLabel="Login-modal"
                style={loginFormStyles}
                class="login-modal"
                appElement={document.querySelector("#root") || undefined}
            >
                {displayLoginForm && <LoginForm setDisplayLoginForm={setDisplayLoginForm}
                                                setDisplayRegistrationForm={setDisplayRegistrationForm}/>}
                {displayRegistrationForm && <RegistrationForm setDisplayLoginForm={setDisplayLoginForm}
                                                              setDisplayRegistrationForm={setDisplayRegistrationForm}/>}
            </Modal>
            <Outlet/>
        </div>
    );
}

export default App;
