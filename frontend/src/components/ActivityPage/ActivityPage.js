import './ActivityPage.css';
import {useEffect, useState} from "react";


function ActivityPage() {
    const [activityData, setActivityData] = useState("");


    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await fetch('http://localhost:8080/activities/1111e4ee-06f5-40ab-935e-442074f939a1', );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data)
                setActivityData(data);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };
        fetchActivityData();
    }, []);


    return (
        <div>
            {activityData ? (
                <div>

                    <p>ID: {activityData.activityId}</p>
                    <p>Name: {activityData.title}</p>

                    <h5>Address:</h5>
                    <p>City: {activityData.city}</p>
                    <p>Street: {activityData.street}</p>


                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ActivityPage;