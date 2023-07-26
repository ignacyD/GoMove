
function ActivitySelect({setActivitiesList, activityType, setActivityType}) {

    async function getActivityByType(activityType) {
        const response = await fetch(
            `http://localhost:8080/activities/filter?type=${activityType}`
        );
        const data = await response.json();
        setActivitiesList(JSON.stringify(data));
    }

    return (
        <div>
            <select
                name="activitySelect"
                onChange={event => setActivityType(event.target.value)}
            >
                <option value="RUNNING">Running</option>
                <option value="WALKING">Walking</option>
                <option value="CYCLING">Cycling</option>
                <option value="SKATING">Skating</option>
            </select>
            <button onClick={() => getActivityByType(activityType)}>get activity by type</button>
        </div>
    )
}

export default ActivitySelect;