import './HomePage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import ActivityCard from "./ActivityCard";
import LoginForm from "../LoginForm/LoginForm";
import App from "../../App";
import Navbar from "../Navbar/Navbar";
import Modal from "react-modal";
import loginFormStyles from "../../ModalStyles";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

function HomePage() {
    const [activities, setActivities] = useState([]);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    const [displayLoginForm, setDisplayLoginForm] = useState(false)
    const [displayRegistrationForm, setDisplayRegistrationForm] = useState(false);

    const loggedUserId = localStorage.getItem("userId");

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:8080/activities/future');
            const data = await response.json();
            setActivities(data);
            setCurrentActivityIndex(0);
        } catch (error) {
            console.error('Błąd podczas pobierania aktywności:', error);
        }
    };

    const fetchNextActivity = () => {
        if (currentActivityIndex < activities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            alert('Nie ma więcej aktywności. Chcesz wrócić do pierwszej?');
            setCurrentActivityIndex(0);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);


    const enrollUserToActivity = () => {
        fetch(`http://localhost:8080/users/enroll/${loggedUserId}/${activities[currentActivityIndex].activityId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Enrollment failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    function closeForms() {
        setDisplayLoginForm(false);
        setDisplayRegistrationForm(false);
    }

    return (
        <div className='home-page'>
            <div className='delete-activity' onClick={() => fetchNextActivity()}>
                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}}/>
            </div>
            <div className='card-activity'>
                {activities.length > 0 ? (
                    <ActivityCard activity={activities[currentActivityIndex]}/>
                ) : (
                    <p>Pobieranie aktywności...</p>
                )}
            </div>


            {loggedUserId !== "" ? (
                <div className='accept-activity' onClick={() => {
                    fetchNextActivity();
                    enrollUserToActivity();
                    alert('Dodano do ulubionych!');
                }}>
                    <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000"}}/>
                </div>
            ) : (
                <div className='accept-activity' onClick={() => {
                    setDisplayLoginForm(true);
                }}>
                    <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000"}}/>
                </div>
            )}




            <Modal
                isOpen={displayLoginForm || displayRegistrationForm}
                onRequestClose={() => closeForms()}
                contentLabel="Login-modal"
                style={loginFormStyles}
                className="login-modal"
                appElement={document.querySelector("#root") || undefined}
            >
                {displayLoginForm && <LoginForm setDisplayLoginForm={setDisplayLoginForm}
                                                setDisplayRegistrationForm={setDisplayRegistrationForm}/>}
                {displayRegistrationForm && <RegistrationForm setDisplayLoginForm={setDisplayLoginForm}
                                                              setDisplayRegistrationForm={setDisplayRegistrationForm}/>}
            </Modal>


        </div>
    )
}

export default HomePage;