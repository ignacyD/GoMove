import React from 'react';
import './ActivitCard.css';
import testPhoto from '../../assets/images/test.jpg'
import GoogleMapComponent from "../GoogleMap/GoogleMap";

function ActivityCard({activity}) {
    return (
        <div className="card">
            <div className="top-section">
                {activity.photoUrl ?
                    <img className="photo" src={activity.photoUrl} alt="Activity"/> :
                    <img className="photo" src={testPhoto} alt="Activity"/>
                }
                <div className="title-section">
                    <h2>{activity.title}</h2>
                    <h3>{activity.activityType}</h3>
                </div>
            </div>
            <br/>
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
            <br/>
            <br/>
            <br/>
            <h3>Description: </h3>
            <p>{activity.description}</p>
            <br/>
            <h2>Google Maps</h2>
            <div className="google-maps">
                <GoogleMapComponent height={'350px'} width={'650px'} address={`${activity.city} ${activity.street}`}/>
            </div>
        </div>
    )
}

export default ActivityCard;