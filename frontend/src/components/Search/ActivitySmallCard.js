import React from 'react';
import './ActivitySmallCard.css';
import testPhoto from "../../assets/images/test.jpg";
import {useNavigate} from "react-router-dom";

const ActivitySmallCard = ({activity}) => {

    const navigate = useNavigate();

    return (
        <div className="searched-activity-card"
        >
            <div className="activity-photo">{activity.photoUrl ?
                <img src={activity.photoUrl} alt="Activity"/> :
                <img src={testPhoto} alt="Activity"/>
            }</div>
            <div className="info-section">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-type">{activity.activityType}</div>
                <div className="activity-city">{activity.city}</div>
                <div className="activity-date">{activity.date}, {activity.time}</div>
                <div className="searched-card-buttons">
                    <button onClick={() => navigate(`/activity-page/${activity.activityId}`)}
                            className="details-button">Details
                    </button>
                <button className="join-button">Join</button>
                </div>
            </div>
        </div>
    );
};

export default ActivitySmallCard;