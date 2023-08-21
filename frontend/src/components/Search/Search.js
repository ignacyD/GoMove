import {useEffect, useState} from "react";
import CitySelect from "./CitySelect";
import ActivitySelect from "./ActivitySelect";

function Search() {
    const [activities, setActivities] = useState([]);
    const [activityType, setActivityType] = useState("");

    useEffect(() => {
        getActivities();
    }, [])

    console.log(activities)

    async function getActivities() {
        const response = await fetch("http://localhost:8080/activities/future");
        const activitiesData = await response.json();
        setActivities(activitiesData);
    }

    return (
        <div className="Search">
            <ActivitySelect setActivitiesList={setActivities} setActivityType={setActivityType}
                            activityType={activityType}/>
            <CitySelect setActivitiesList={setActivities}/>
            {activities.map(activity => (
                <div>
                    <div>{activity.title}</div>
                    <div>{activity.activityType}</div>
                    <div>{activity.city}, {activity.street}</div>
                    <div>{activity.date}, {activity.time}</div>
                    <div>---------</div>
                </div>
            ))}
        </div>
    );
}

export default Search;