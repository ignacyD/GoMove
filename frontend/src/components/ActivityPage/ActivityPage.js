import './ActivityPage.css';
import {useEffect, useState} from "react";
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import ActivityComments from "../ActivityComments/ActivityComments";


function ActivityPage() {
    const [activityData, setActivityData] = useState("");


    const activityId = '1111e4ee-06f5-40ab-935e-442074f939a1'


    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/activities/${activityId}`,);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setActivityData(data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };
        fetchActivityData();
    }, []);


    return (
        <div className={"activity-page"}>
            {activityData ? (
                <div>

                    <p>Name: {activityData.title}</p>

                    <img src={activityData.activityPhotoUrl} alt={activityData.title} className="activity-image"/>

                    <p>>What?</p>
                    <p>{activityData.description}</p>

                    <h5>When?:</h5>
                    <p>{activityData.date}, {activityData.time}</p>

                    <h5>Where?</h5>
                    <p>City: {activityData.city}</p>
                    <p>Street: {activityData.street}</p>

                    <GoogleMapComponent height={'400px'} width={'400px'}
                                        address={`${activityData.city} ${activityData.street}`}/>




                    <p>Leave a message:</p>
                    <ActivityComments currentActivityID={activityId}/>


                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ActivityPage;