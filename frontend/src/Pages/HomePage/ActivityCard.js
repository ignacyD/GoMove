import React, {useEffect, useState} from 'react';
import './ActivityCard.css';
import testPhoto from '../../assets/images/cycling.jpg'
import GoogleMapComponent from "../../components/GoogleMap/GoogleMap";
import {useNavigate} from "react-router-dom";
import {iconSelector, photoSelector} from '../../components/functions'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ActivityCard({activity}) {

    const [showMap, setShowMap] = useState(false);
    const [isUserMobile, setIsUserMobile] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsUserMobile(true)
        } else {
            setIsUserMobile(false);
        }
    }, [window.innerWidth])
    const navigateToActivityPage = (e) => {
        const mapButton = document.querySelector('.map-button button')
        if(e.target !== mapButton){
        navigate(`/activity-page/${activity.activityId}`)
        }
    }

    return (
        <div className="card"
             onClick={(e) => navigateToActivityPage(e)}
        >
            <div
                className="top-section"
            >
                <div className="activity-photo">
                    <img
                        src={activity.activityPhoto ? 'data:image/jpeg;base64,' + activity.activityPhoto : photoSelector(activity.activityType)}
                        alt="Activity"/>
                </div>
                <div className="title-section">
                    <div className="activityCard-icon">{iconSelector(activity.activityType)}</div>
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
                    <div className="bottom-section">
                        <div className="description">
                            <h3>Description: </h3>
                            <p>{activity.description}</p>
                        </div>
                        <div className="participants-container">
                            <h3>Participants: </h3>
                            <div className="participants">
                                <FontAwesomeIcon icon={faUser} style={{color: "#FFFFFF",}}/>
                                <h2>{activity.participants.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="map-button">
                        <button
                            onClick={() => setShowMap(!showMap)}>{showMap ? "Back to details" : "See on map"}</button>
                    </div>
                    <div className="google-maps">
                        <GoogleMapComponent height={isUserMobile ? 'calc(50vh - 150px)' : '270px'}
                                            width={isUserMobile ? '60vw' : '400px'}
                                            address={`${activity.address}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard;