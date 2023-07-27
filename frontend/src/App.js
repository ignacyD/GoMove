import './App.css';
import Navbar from "./components/Header/Navbar";
import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Modal from "react-modal";
import loginFormStyles from "./ModalStyles";
import {handleBlur} from "react-modal/lib/helpers/focusManager";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [displayLoginForm, setDisplayLoginForm] = useState(false)

    function handleLogout() {
        setDisplayLoginForm(false);
        // wylogowanie użytkownika, wyjście z zakładki profile itp.
    }

    return (
        <div className="App">
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setDisplayLoginForm={setDisplayLoginForm}
                    handleLogout={handleLogout}/>
            <Modal
                isOpen={displayLoginForm}
                onRequestClose={() => setDisplayLoginForm(false)}
                contentLabel="Login-modal"
                style={loginFormStyles}
                class="login-modal"
                appElement={document.getElementById("root") || undefined}
            >
                {displayLoginForm && <LoginForm/>}
            </Modal>
            <Outlet/>
        </div>
    );
}

export default App;
