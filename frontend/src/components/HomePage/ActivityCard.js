import React, {useState} from 'react';
import './ActivitCard.css';
import testPhoto from '../../assets/images/test.jpg'
import GoogleMapComponent from "../GoogleMap/GoogleMap";

function ActivityCard({activity}) {

    const [showMap, setShowMap] = useState(false);

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
                        <button onClick={() => setShowMap(!showMap)}>{showMap ? "Back to details" : "See on map"}</button>
                    </div>
                    <div className="google-maps">
                        <GoogleMapComponent height={'calc(60vh - 200px)'} width={'650px'}
                                            address={`${activity.city} ${activity.street}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard;