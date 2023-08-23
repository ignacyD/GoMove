import React from 'react';
import {useNavigate} from "react-router-dom";
import "./ActivitySmallCard.css";

const ActivitySmallCard = ({activity}) => {

    const navigate = useNavigate();

    return (
        <div
            className="activity-small-card"
            onClick={() => navigate(`/activity-page/${activity.activityId}`)}
        >
            <div>{activity.title}</div>
            <div>{activity.activityType}</div>
            <div>{activity.city}, {activity.street}</div>
            <div>{activity.date}, {activity.time}</div>
            <div>---------</div>
        </div>
    );
};

export default ActivitySmallCard;