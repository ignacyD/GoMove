import './App.css';
import Navbar from "./components/Header/Navbar";
import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Modal from "react-modal";
import loginFormStyles from "./ModalStyles";
import {handleBlur} from "react-modal/lib/helpers/focusManager";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [displayLoginForm, setDisplayLoginForm] = useState(false)
    const [displayRegistrationForm, setDisplayRegistrationForm] = useState(false);

    function handleLogout() {
        setDisplayLoginForm(false);
        // wylogowanie użytkownika, wyjście z zakładki profile itp.
    }

    function closeForms(){
        setDisplayLoginForm(false);
        setDisplayRegistrationForm(false);
    }

    return (
        <div className="App">
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setDisplayLoginForm={setDisplayLoginForm}
                    handleLogout={handleLogout}/>
            <Modal
                isOpen={displayLoginForm || displayRegistrationForm}
                onRequestClose={() => closeForms()}
                contentLabel="Login-modal"
                style={loginFormStyles}
                class="login-modal"
                appElement={document.getElementById("root") || undefined}
            >
                {displayLoginForm && <LoginForm setDisplayLoginForm={setDisplayLoginForm} setDisplayRegistrationForm={setDisplayRegistrationForm}/>}
                {displayRegistrationForm && <RegistrationForm setDisplayLoginForm={setDisplayLoginForm} setDisplayRegistrationForm={setDisplayRegistrationForm}/>}
            </Modal>
            <Outlet/>
        </div>
    );
}

export default App;
