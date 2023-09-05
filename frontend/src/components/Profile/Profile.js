import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Profile.css';
import {Context} from "../../App";
import testPhoto from "../../assets/images/test.jpg";

function Profile() {
    const userData = useContext(Context).userData;

    const [ownedActivities, setOwnedActivities] = useState([]);
    const [allUserActivities, setAllUserActivities] = useState([]);
    const navigate = useNavigate();

    function displayActivities(activities) {
        if (activities.length > 0) {
            return (
                <div className="activities">
                    <h3>{activities === ownedActivities ? "Owned" : "Take part"}</h3>
                    <div className="activities-container">
                        {activities.map((activity) => (
                            <div
                                className="activity-card"
                                key={activity.activityId}
                                onClick={() => navigate(`/activity-page/${activity.activityId}`)}
                            >
                                <div className="activity-title">{activity.title}</div>
                                <hr />
                                <div className="activity-type">{activity.activityType}</div>
                                <div className="activity-details">
                                    <div className="activity-city">{activity.city}</div>
                                    <div className="activity-date-time">
                                        <span className="activity-date">{activity.date}</span>
                                        <span className="activity-time">{activity.time}</span>
                                    </div>
                                </div>
                                <img src={testPhoto} alt={activity.title} className="activity-image" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return <h3>User has no activities</h3>;
    }

    async function fetchOwnedActivities(userId) {
        const response = await fetch(
            `http://localhost:8080/activities/user/${userId}`, {
                headers: {Authorization: localStorage.getItem("jwt")}
            })
        const data = await response.json();
        setOwnedActivities(data);
    }

    async function fetchAllUserActivities(userId) {
        const response = await fetch(
            `http://localhost:8080/activities/participant/${userId}`, {
                headers: {Authorization: localStorage.getItem("jwt")}
            })
        const activities = await response.json();
        setAllUserActivities(activities);
    }

    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            fetchOwnedActivities(userData.userId);
            fetchAllUserActivities(userData.userId);
        }
    }, [userData]);


    return (
        <div>
            <div className="user-container">
                <div className="user-card">
                    <p className="username">{userData.username}</p>
                    <div className="profile-picture-container">
                        <img
                            className="profile-picture"
                            src={userData.userPhotoUrl}
                            alt="Profile picture"
                        />
                    </div>
                </div>
                <div className="user-details">
                        <h3 className="activity-label">Preferred Activity:</h3>
                        <p className="activity-info">{userData.preferredActivity}</p>

                        <h3 className="activity-label">City:</h3>
                        <p className="activity-info">{userData.city}</p>

                        <h3 className="activity-label">Description:</h3>
                        <p className="activity-info">{userData.description}</p>
                </div>
            </div>
            {displayActivities(allUserActivities)}
            {displayActivities(ownedActivities)}
            <button onClick={() => navigate("/additional-info-form")}>Update info</button>
        </div>
    )
}

export default Profile;