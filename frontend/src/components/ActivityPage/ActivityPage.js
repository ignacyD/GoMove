import './ActivityPage.css';
import {useEffect, useState} from "react";
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import ActivityComments from "../ActivityComments/ActivityComments";
import {faCalendarDays, faLocationPin, faUser, faUserMinus, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router-dom";


function ActivityPage() {
    const [activityData, setActivityData] = useState("");
    const [isUserEnrolled, setIsUserEnrolled] = useState(true);

    const {activityId} = useParams();

    const fetchActivityData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/activities/${activityId}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setActivityData(data);
        } catch (error) {
            console.error('Error fetching activity data:', error);
        }
    };

    const handleUnsubscribeButton = async () => {
        fetch(`http://localhost:8080/activities/unsubscribe-user/${localStorage.getItem("userId")}/${activityId}`, {
            headers: {Authorization: localStorage.getItem("jwt"), "Content-Type": "application/json"},
            method: "PATCH",
        })
        .then(response => {
            if (response.status === 200) {
                console.log("User unsubscribed successfully");
                setIsUserEnrolled(false);
            } else {
                console.log("something went wrong")
            }
        })
    }

    const handleEnrollButton = () => {
        fetch(`http://localhost:8080/users/enroll/${localStorage.getItem("userId")}/${activityId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.status === 200) {
                console.log("User enrolled successfully");
                setIsUserEnrolled(true);
            } else {
                console.log("something went wrong")
            }
        })
    }

    const checkIsUserEnrolled = () => {
        setIsUserEnrolled(activityData.participants.filter(participant =>
            participant.userId === localStorage.getItem("userId")
        ).length > 0)
    }

    useEffect(() => {
        fetchActivityData();
    }, [isUserEnrolled]);

    useEffect(() => {
        if (Object.keys(activityData).length !== 0) {
            checkIsUserEnrolled();
        }
    },[activityData])

    return (
        <div className={"activity-page"}>
            {activityData ? (
                <div>
                    <h1>{activityData.title}</h1>
                    <hr/>
                    <h2>Information</h2>
                    <br/>
                    <br/>
                    {activityData.activityPhotoUrl ?
                        <img src={activityData.activityPhotoUrl} alt={activityData.title} className="activity-image"/>
                        : null}

                    <h3>Description</h3>
                    <p>{activityData.description}</p>
                    <br/>
                    <br/>
                    <br/>
                    <div className="place-date">
                        <h3>Place of meeting:</h3>
                        <div className="place">
                            <FontAwesomeIcon icon={faLocationPin} size="2xl" style={{color: "#2a2a2a",}}/>
                            <p>{activityData.city}, {activityData.street}</p>
                        </div>
                        <div className="date">
                            <FontAwesomeIcon icon={faCalendarDays} size="2xl" style={{color: "#2a2a2a",}}/>
                            <p>{activityData.date}, {activityData.time}</p>
                        </div>
                    </div>
                    <br/>
                    <div className="google-maps">
                        <GoogleMapComponent height={'400px'} width={'1020px'}
                                            address={`${activityData.city} ${activityData.street}`}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="info-users">
                        <div className="minus">
                            <FontAwesomeIcon icon={isUserEnrolled ? faUserMinus : faUserPlus} size="2xl" style={{color: "#90EE90FF"}}
                                             onClick={() => isUserEnrolled ? handleUnsubscribeButton() : handleEnrollButton()}/>
                        </div>
                    </div>
                    <hr/>
                    <br/>
                    <h3>Participants</h3>
                    <p>
                        {activityData.participants.map(participant => (
                            <div className="users">
                                <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#2a2a2a",}}/>
                                <p>{participant.username}</p>
                            </div>
                        ))}
                    </p>

                    <h3>Leave a message:</h3>
                    <div className="activity-comments">
                        <ActivityComments currentActivityID={activityId}/>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ActivityPage;