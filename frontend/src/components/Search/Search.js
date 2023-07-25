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

    const fetchData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/activities`);
            const data = await response.json();
            setActivitiesList(JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleButtonClick = (id) => {
        if (!buttonClicked) {
            setButtonClicked(true);
            fetchData(id);
        }
    };

    return (
        <div className="Search">
            <input placeholder={"get activity by id"} onChange={event => setIdToSearch(event.target.value)}/>
            <button placeholder={"get activity by id"} onClick={handleButtonClick(idToSearch)}>get activity by id</button>
            <button placeholder={"get all activites"} onClick={getActivities}>get all activities</button>
            <div>{activitiesList}</div>
        </div>
    );
}

export default Search;