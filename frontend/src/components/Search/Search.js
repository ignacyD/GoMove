import {useState, useEffect} from "react";

function Search() {
    const [search, setSearch] = useState("");
    const [activitiesList, setActivitiesList] = useState([]);
    const [idToSearch, setIdToSearch] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);

    async function getActivities() {
        const activitiesResponse = await fetch(
            "http://localhost:8080/activities"
        );
        const response = await activitiesResponse.json();
        setActivitiesList(JSON.stringify(response));
    }

    const getActivityById = async (id) => {
            const activitiesResponse = await fetch(
                `http://localhost:8080/activities/${id}`
            );
            const response = await activitiesResponse.json();
            setActivitiesList(JSON.stringify(response));
    };

    return (
        <div className="Search">
            <input placeholder={"get activity by id"} onChange={event => setIdToSearch(event.target.value)}/>
            <button placeholder={"get activity by id"} onClick={getActivityById(idToSearch)}>get activity by id</button>
            <button placeholder={"get all activites"} onClick={getActivities}>get all activities</button>
            <div>{activitiesList}</div>
        </div>
    );
}

export default Search;