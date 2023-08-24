import './App.css';
import Navbar from "./components/Navbar/Navbar";
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Modal from "react-modal";
import loginFormStyles from "./ModalStyles";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import ActivityAddedModal from "./components/ActivityAddedModal/ActivityAddedModal";
import ModalStyles from "./ModalStyles";

export const Context = React.createContext();

function App() {
    const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem("userId") !== "" );
    const [displayLoginForm, setDisplayLoginForm] = useState(false)
    const [displayRegistrationForm, setDisplayRegistrationForm] = useState(false);
    const [displayActivityAddedModal, setDisplayActivityAddedModal] = useState(false);
    const [userData, setUserData] = useState({});
  
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLogged) {
            fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`, {
                headers: {
                    Authorization: localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(userData => setUserData(userData));
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
        <Context.Provider value={{
            isUserLogged: isUserLogged,
            setIsUserLogged: setIsUserLogged,
            setDisplayLoginForm: setDisplayLoginForm,
            setDisplayActivityAddedModal: setDisplayActivityAddedModal,
            userData: userData
        }}>
            <div className="App">
                <Navbar setDisplayLoginForm={setDisplayLoginForm} handleLogout={handleLogout}/>
                <Modal
                    isOpen={displayLoginForm || displayRegistrationForm}
                    onRequestClose={() => closeForms()}
                    contentLabel="Login-modal"
                    style={ModalStyles.loginFormStyles}
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
                <Modal
                    isOpen={displayActivityAddedModal}
                    style={ModalStyles.activityAddedModalStyles}
                    appElement={document.querySelector("#root") || undefined}
                >
                    {displayActivityAddedModal && <ActivityAddedModal/>}
                </Modal>
                <Outlet/>
            </div>
        </Context.Provider>
    );
}

export default App;
