import {useState} from "react";
import CitySelect from "./CitySelect";
import ActivitySelect from "./ActivitySelect";

function Search() {
    const [activitiesList, setActivitiesList] = useState([]);
    const [idToSearch, setIdToSearch] = useState("");
    const [activityType, setActivityType] = useState("");


    async function getActivities() {
        const response = await fetch(
            "http://localhost:8080/activities"
        );
        const data = await response.json();
        setActivitiesList(JSON.stringify(data));
    }
    async function getActivityById(idToSearch) {
        const response = await fetch(
            `http://localhost:8080/activities/${idToSearch}`
        );
        const data = await response.json();
        setActivitiesList(JSON.stringify(data));
    }


    return (
        <div className="Search">
            <input placeholder={"get activity by id"} onChange={event => setIdToSearch(event.target.value)}/>
            <button placeholder={"get activity by id"} onClick={() => getActivityById(idToSearch)}>get activity by id</button>
            <button placeholder={"get all activities"} onClick={getActivities}>get all activities</button>
            <ActivitySelect setActivitiesList={setActivitiesList} setActivityType={setActivityType} activityType={activityType}/>
            <CitySelect setActivitiesList={setActivitiesList}/>
            <div>{activitiesList}</div>
        </div>
    );
}

export default Search;