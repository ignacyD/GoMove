import {useEffect, useState} from "react";
import ActivitySmallCard from "./ActivitySmallCard";

function Search() {
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedActivityType, setSelectedActivityType] = useState("")
    const [selectedCity, setSelectedCity] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const today = new Date().toISOString().split("T")[0];

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
        const response = await fetch("http://localhost:8080/activities/cities");
        const data = await response.json();
        setCities(data);
    }

    async function getFilteredActivities() {

        let url = "http://localhost:8080/activities/future";

        if (selectedCity !== "" || selectedActivityType !== "") {
            url = "http://localhost:8080/activities/filter";
            if (selectedCity !== "") {
                url += `?city=${selectedCity}`;
            }
            if (selectedActivityType !== "") {
                url += selectedCity !== "" ? `&type=${selectedActivityType}` : `?type=${selectedActivityType}`;
            }
        }

        const response = await fetch(url);

        let filteredActivities = await response.json();

        if (dateFrom !== "") {
            filteredActivities = filteredActivities.filter(activity => activity.date >= dateFrom);
        }

        if (dateTo !== "") {
            filteredActivities = filteredActivities.filter(activity => activity.date <= dateTo);
        }

        setActivities(filteredActivities);
    }

    function resetFilter() {
        setSelectedActivityType("");
        setSelectedCity("");
        setDateFrom("");
        setDateTo("");
        getActivities();
    }

    return (
        <div>
            <div>
                Select activity type:
                <select
                    name="activitySelect"
                    onChange={event => setSelectedActivityType(event.target.value)}
                    value={selectedActivityType}
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
                    Select City:
                    <select name="citySelect"
                            onChange={event => setSelectedCity(event.target.value)}
                            value={selectedCity}
                    >
                        <option value="">Select City</option>
                        {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="dateFrom">Date from:</label>
                <input
                    value={dateFrom}
                    type="date"
                    id="dateFrom"
                    name="dateFrom"
                    min={today}
                    onChange={(e) => setDateFrom(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="dateTo">Date to:</label>
                <input
                    value={dateTo}
                    type="date"
                    id="dateTo"
                    name="dateTo"
                    min={today}
                    onChange={(e) => setDateTo(e.target.value)}/>
            </div>

            <div>
                <button onClick={() => getFilteredActivities()}>Filter</button>
            </div>

            <div>
                <button onClick={() => resetFilter()}>Reset Filter</button>
            </div>

            {activities.length > 0 ?
                <div>
                    {activities.map(activity => (
                        <ActivitySmallCard
                            key={activity.activityId}
                            activity={activity}
                        />
                    ))}
                </div>
                :
                <div>No activities found for requested criteria</div>
            }
        </div>
    );
}

export default Search;