import './App.css';
import Navbar from "./components/Navbar/Navbar";
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Modal from "react-modal";
import loginFormStyles from "./ModalStyles";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

export const UserContext = React.createContext();

function App() {
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [displayLoginForm, setDisplayLoginForm] = useState(false)
    const [displayRegistrationForm, setDisplayRegistrationForm] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setIsUserLogged(true)
        }
    }, [])

    function handleLogout() {
        localStorage.setItem("userId", "");
        localStorage.setItem("jwt", "");
        setIsUserLogged(false);
        navigate("/");
        console.log("Logout successful");
    }

    function closeForms() {
        setDisplayLoginForm(false);
        setDisplayRegistrationForm(false);
    }

    return (
        <UserContext.Provider value={{getter: isUserLogged, setter: setIsUserLogged}}>
            <div className="App">
                <Navbar setDisplayLoginForm={setDisplayLoginForm} handleLogout={handleLogout}/>
                <Modal
                    isOpen={displayLoginForm || displayRegistrationForm}
                    onRequestClose={() => closeForms()}
                    contentLabel="Login-modal"
                    style={loginFormStyles}
                    className="login-modal"
                    appElement={document.querySelector("#root") || undefined}
                >
                    {displayLoginForm && <LoginForm setDisplayLoginForm={setDisplayLoginForm}
                                                    setDisplayRegistrationForm={setDisplayRegistrationForm}
                    />}
                    {displayRegistrationForm && <RegistrationForm setDisplayLoginForm={setDisplayLoginForm}
                                                                  setDisplayRegistrationForm={setDisplayRegistrationForm}
                    />}
                </Modal>
                <Outlet/>
            </div>
        </UserContext.Provider>
    );
}

export default App;
