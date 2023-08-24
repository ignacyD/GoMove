import React, {useState} from 'react';
import './ActivitCard.css';
import testPhoto from '../../assets/images/test.jpg'
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import {useNavigate} from "react-router-dom";

function ActivityCard({activity}) {

    const [showMap, setShowMap] = useState(false);

    const navigate = useNavigate();

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
                    <h2>{activity.title}</h2>
                    <h3>{activity.activityType}</h3>
                </div>
            </div>
            <div className="card-changeable-space">
                <div className={showMap ? "map-side" : "no-map-side"}>
                    <div className="middle-section">
                        <div className="location">
                            <h3>Location: </h3>
                            <p>{activity.city}, {activity.street}</p>
                        </div>
                        <div className="datetime">
                            <h3>Date: </h3>
                            <p>{activity.date}, {activity.time}</p>
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
                                            address={`${activity.city} ${activity.street}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard;