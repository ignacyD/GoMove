import './HomePage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import ActivityCard from "./ActivityCard";

function HomePage() {
    const [activities, setActivities] = useState([]);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:8080/activities/future');
            const data = await response.json();
            setActivities(data);
            setCurrentActivityIndex(0);
        } catch (error) {
            console.error('Błąd podczas pobierania aktywności:', error);
        }
    };

    const fetchNextActivity = () => {
        if (currentActivityIndex < activities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            alert('Nie ma więcej aktywności. Chcesz wrócić do pierwszej?');
            setCurrentActivityIndex(0);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);


    return (
        <div className='home-page'>
            <div className='delete-activity' onClick={() => fetchNextActivity()}>
                <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#000000",}}/>
            </div>
            <div className='card-activity'>
                {activities.length > 0 ? (
                    <ActivityCard activity={activities[currentActivityIndex]}/>
                ) : (
                    <p>Pobieranie aktywności...</p>
                )}
            </div>
            <div className='accept-activity' onClick={() => {
                fetchNextActivity();
                alert('Dodano do ulubionych!');
            }}>
                <FontAwesomeIcon icon={faCheck} size="2xl" style={{color: "#000000",}}/>
            </div>
        </div>
    )
}

export default HomePage;