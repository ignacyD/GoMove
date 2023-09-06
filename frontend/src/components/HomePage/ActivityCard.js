import React, {useState} from 'react';
import './ActivitCard.css';
import testPhoto from '../../assets/images/test.jpg'
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import {faPersonBiking, faPersonRunning, faPersonSkating, faPersonWalking} from "@fortawesome/free-solid-svg-icons";

import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {iconSelector} from '../IconSelector'

function ActivityCard({activity}) {

    const [showMap, setShowMap] = useState(false);

    const navigate = useNavigate();

    let iconToDisplay;

    switch (activity.activityType) {
        case "RUNNING":
            iconToDisplay = <FontAwesomeIcon icon={faPersonRunning} size="2xl"/>
            break;
        case "CYCLING":
            iconToDisplay = <FontAwesomeIcon icon={faPersonBiking} size="2xl"/>
            break;
        case "WALKING":
            iconToDisplay = <FontAwesomeIcon icon={faPersonWalking} size="2xl"/>
            break;
        case "SKATING":
            iconToDisplay = <FontAwesomeIcon icon={faPersonSkating} size="2xl"/>
            break;
    }

    return (
        <div className="card">
            <div
                className="top-section"
                onClick={() => navigate(`/activity-page/${activity.activityId}`)}
            >
                {activity.photoUrl ?
                    <img className="photo" src={activity.photoUrl} alt="Activity"/> :
                    <img className="photo" src={testPhoto} alt="Activity"/>
                }
                <div className="title-section">
                    <div className="activityCard-icon">{iconToDisplay}</div>
                    <h2>{activity.title}</h2>
                </div>
            </div>
            <div className="card-changeable-space">
                <div className={showMap ? "map-side" : "no-map-side"}>
                    <div className="middle-section">
                        <div className="location">
                            <h3>Location: </h3>
                            <p>{activity.address}</p>
                        </div>
                        <div className="datetime">
                            <h3>Date: </h3>
                            <p>{activity.date}, {activity.time.substring(0, 5)}</p>
                        </div>
                    </div>
                    <div className="description-section">
                        <h3>Description: </h3>
                        <p>{activity.description}</p>
                    </div>
                    <div className="map-button">
                        <button
                            onClick={() => setShowMap(!showMap)}>{showMap ? "Back to details" : "See on map"}</button>
                    </div>
                    <div className="google-maps">
                        <GoogleMapComponent height={'33vh'} width={'27vw'}
                                            address={`${activity.address}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard;