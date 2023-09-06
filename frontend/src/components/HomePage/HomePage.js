import './HomePage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import ActivityCard from "./ActivityCard";
import {Context} from "../../App";
import {Link} from 'react-router-dom';

function HomePage() {
    const isUserLogged = useContext(Context).isUserLogged;
    const setDisplayLoginForm = useContext(Context).setDisplayLoginForm;
    const userData = useContext(Context).userData;

    const [activities, setActivities] = useState([]);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    useEffect(() => {
        fetchActivities();
    }, [userData, isUserLogged]);

    function filterActivities(activities) {
        return activities
            .filter(activity => !activity.participants.map(participant => participant.userId).includes(userData.userId))
            .filter(activity => activity.city === userData.city)
            .filter(activity => activity.activityType === userData.preferredActivity);
    }

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:8080/activities/future');
            const activitiesData = await response.json();
            if (isUserLogged) {
                let filteredActivities = filterActivities(activitiesData)
                let sortedFilteredActivities = filteredActivities.sort(chronologicalSort)
                setActivities(sortedFilteredActivities)
            } else {
                let sortedActivities = activitiesData.sort(chronologicalSort)
                setActivities(sortedActivities);
            }
            setCurrentActivityIndex(0);

        } catch (error) {
            console.error('Błąd podczas pobierania aktywności:', error);
        }
    };

    function chronologicalSort(a, b) {
        const aDateTime = new Date(`${a.date} ${a.time}`);
        const bDateTime = new Date(`${b.date} ${b.time}`);
        return aDateTime - bDateTime;
    }

    const fetchNextActivity = () => {
        if (currentActivityIndex < activities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            alert('Nie ma więcej aktywności. Chcesz wrócić do pierwszej?');
            fetchActivities();
        }
    };

    const enrollUserToActivity = () => {
        fetch(`http://localhost:8080/users/enroll/${userData.userId}/${activities[currentActivityIndex].activityId}`, {
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


    const handleAcceptActivity = async () => {
        await enrollUserToActivity();
        alert('Dodano do ulubionych!');
        await fetchNextActivity();
    };

    return (
        <div className='home-page'>

            {activities.length > 0 ? (
                <div className='delete-activity' onClick={() => fetchNextActivity()}>
                    <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}}/>
                </div>

            ) : <></>}


            <div className='card-activity'>
                {activities.length > 0 ? (
                    <ActivityCard activity={activities[currentActivityIndex]}/>
                ) : (
                    <div className={"no-more-activities"}>
                        <h3>
                            We don't have more activities with Your preferences
                        </h3>

                        <Link to="/search" className={"go-to-search"}>
                            <p>Go to search to find more</p>
                        </Link>


                    </div>


                )}
            </div>

            {activities.length > 0 ? (
                isUserLogged ? (
                    <div className='accept-activity' onClick={handleAcceptActivity}>
                        <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000"}}/>
                    </div>
                ) : (
                    <div className='accept-activity' onClick={() => setDisplayLoginForm(true)}>
                        <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000"}}/>
                    </div>
                )
            ) : (
                <></>
            )}


        </div>
    )
}

export default HomePage;