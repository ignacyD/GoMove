import {useEffect, useState} from "react";
import ActivitySmallCard from "./ActivitySmallCard";
import "./Search.css";

function Search() {
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [selectedActivityType, setSelectedActivityType] = useState(null);

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


    const handleOptionChange = (event) => {
        setSelectedActivityType(event.target.value);
    };

    return (
        <div className="activity-search-page">
            <div className="activity-search-filters">
                <h2>Activity search filters</h2>
                <div className="choose-activity">
                    <h4>Choose activity type</h4>
                    <div>
                        <input
                            type="radio"
                            value="RUNNING"
                            checked={selectedActivityType === "RUNNING"}
                            onChange={handleOptionChange}
                        />
                        Running
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="CYCLING"
                            checked={selectedActivityType === "CYCLING"}
                            onChange={handleOptionChange}
                        />
                        Cycling
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="SKATING"
                            checked={selectedActivityType === "SKATING"}
                            onChange={handleOptionChange}
                        />
                        Skating
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="WALKING"
                            checked={selectedActivityType === "WALKING"}
                            onChange={handleOptionChange}
                        />
                        Walking
                    </div>
                </div>
                <div>
                    <div className="select-city">
                        <h4>
                            Select City:
                        </h4>
                        <select name="citySelect"
                                onChange={event => setSelectedCity(event.target.value)}
                                value={selectedCity}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                </div>
                <div className="date-filters">
                    <h4>Select date</h4>
                    <div className="date-from-filter">
                        <div>
                            <label htmlFor="dateFrom">Date from:</label>
                        </div>
                        <input
                            value={dateFrom}
                            type="date"
                            id="dateFrom"
                            name="dateFrom"
                            min={today}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </div>
                    <div className="date-to-filter">
                        <div>
                            <label htmlFor="dateTo">Date to:</label>
                        </div>
                        <input
                            value={dateTo}
                            type="date"
                            id="dateTo"
                            name="dateTo"
                            min={today}
                            onChange={(e) => setDateTo(e.target.value)}/>
                    </div>
                </div>

                <div className="filter-buttons">
                    <button className="reset-filters-button" onClick={() => resetFilter()}>Reset filters</button>
                    <button className="filter-button" onClick={() => getFilteredActivities()}>Filter</button>
                </div>
            </div>
            <div className="found-activities">
                {
                    activities.length > 0 ?
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
        </div>
    )
        ;
}

export default Search;