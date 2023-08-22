import {useEffect, useState} from "react";

function Search() {
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedActivityType, setSelectedActivityType] = useState("")
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        getActivities();
        getAllCities();
    }, [])

    async function getActivities() {
        const response = await fetch("http://localhost:8080/activities/future");
        const activitiesData = await response.json();
        setActivities(activitiesData);
    }

    async function getAllCities() {
        const response = await fetch(
            "http://localhost:8080/activities/cities");
        const data = await response.json();
        setCities(data);
    }

    async function getFilteredActivities() {
        let url = "http://localhost:8080/activities/filter?";
        if (selectedCity !== "") {
            url += `city=${selectedCity}&`
        }
        if (selectedActivityType !== "") {
            url += `type=${selectedActivityType}`
        }
        const response = await fetch(url);
        const data = await response.json();
        setActivities(data);
    }

    return (
        <div>
            <div>
                <select
                    name="activitySelect"
                    onChange={event => setSelectedActivityType(event.target.value)}
                >
                    <option value="">Select Activity Type</option>
                    <option value="RUNNING">Running</option>
                    <option value="WALKING">Walking</option>
                    <option value="CYCLING">Cycling</option>
                    <option value="SKATING">Skating</option>
                </select>
            </div>

            <div>
                <div>
                    <select name="citySelect"
                            onChange={event => setSelectedCity(event.target.value)}
                    >
                        <option value="">Select City</option>
                        {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <button onClick={() => getFilteredActivities()}>Filter</button>
            </div>

            <div>
                <button onClick={() => getActivities()}>Reset Filter</button>
            </div>

            <div>
                {activities.map(activity => (
                    <div key={activity.activityId}>
                        <div>{activity.title}</div>
                        <div>{activity.activityType}</div>
                        <div>{activity.city}, {activity.street}</div>
                        <div>{activity.date}, {activity.time}</div>
                        <div>---------</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;