import {useContext, useEffect, useState} from "react";
import ActivitySmallCard from "./ActivitySmallCard";
import "./Search.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {Context} from "../../App";

function Search() {

    const isUserLogged = useContext(Context).isUserLogged;
    const userData = useContext(Context).userData;

    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [selectedActivityType, setSelectedActivityType] = useState("");
    const [cityOptionsVisible, setCityOptionsVisible] = useState(false);
    const [cityOptionsSuggestions, setCityOptionsSuggestions] = useState("");
    const [carouselIndex, setCarouselIndex] = useState(0);

    const today = new Date().toISOString().split("T")[0];
    const handleCarouselPrev = () => {
        if (carouselIndex > 0) {
            setCarouselIndex(carouselIndex - 1);
        }
    };

    const handleCarouselNext = () => {
        if (carouselIndex < activities.length - 1) {
            setCarouselIndex(carouselIndex + 1);
        }
    };
    useEffect(() => {
        const carousel = document.querySelector('.activities-carousel-visible')
        carousel.style.bottom = `${(carouselIndex - 1) * 220}px`;
    }, [carouselIndex])

    useEffect(() => {
        getActivities();
        getAllCities();
    }, [])


    async function getActivities() {
        const response = await fetch("http://localhost:8080/activities/future");
        const activitiesData = await response.json();

        if (isUserLogged) {
            let filteredActivities = filterActivitiesIfEnrolled(activitiesData)
            let sortedFilteredActivities = filteredActivities.sort(chronologicalSort)
            setActivities(sortedFilteredActivities)
        } else {
            let sortedActivities = activitiesData.sort(chronologicalSort)
            setActivities(sortedActivities);
        }
    }

    function filterActivitiesIfEnrolled(activities) {
        return activities
            .filter(activity => !activity.participants.map(participant => participant.userId).includes(userData.userId))

    }

    async function getAllCities() {
        const response = await fetch("http://localhost:8080/activities/cities");
        const data = await response.json();
        setCities(data);
    }

    async function getFilteredActivities() {
        setCarouselIndex(0);

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

        let sortedFilteredActivities = filteredActivities.sort(chronologicalSort)
        setActivities(filterActivitiesIfEnrolled(sortedFilteredActivities));
    }

    function resetFilter() {
        setSelectedActivityType("");
        setSelectedCity("");
        setCityOptionsSuggestions("")
        setDateFrom("");
        setDateTo("");
        getActivities();
    }

    const handleOptionChange = (event) => {
        setSelectedActivityType(event.target.value);
    };
    const closeSelectCity = () => {
        setCityOptionsVisible(false);
    };

    useEffect(() => {
        const handleBodyClick = (event) => {
            if (!event.target.classList.contains('city-select')) {
                closeSelectCity();
            }
        };

        window.addEventListener("click", (event) => handleBodyClick(event));

        return () => {
            window.removeEventListener("click", (event) => handleBodyClick(event));
        };
    }, []);

    useEffect(() => {
        const cityOptionsSpace = document.querySelector(".city-options-field");
        cityOptionsSpace.style.height = cityOptionsVisible ? '100px' : '0px';
        cityOptionsSpace.style.border = cityOptionsVisible ? '1px solid yellowgreen' : 'none';
    }, [cityOptionsVisible])

    useEffect(() => {
        getActivities();
    }, [userData, isUserLogged]);

    const handleCityClick = (selectedCity) => {
        setCityOptionsSuggestions(selectedCity);
        setSelectedCity(selectedCity);
    };

    function chronologicalSort(a, b) {
        const aDateTime = new Date(`${a.date} ${a.time}`);
        const bDateTime = new Date(`${b.date} ${b.time}`);
        return aDateTime - bDateTime;
    }


    const enrollUserToActivity = (activityId) => {
        fetch(`http://localhost:8080/users/enroll/${userData.userId}/${activityId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Enrollment failed');
                }
            })
            .then(() => {
                setActivities(activities.filter(activity => activity.activityId !== activityId));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


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
                        <input type="text" value={cityOptionsSuggestions}
                               placeholder="Select city"
                               onChange={(event) => {
                                   setCityOptionsSuggestions(event.target.value);
                                   setCityOptionsVisible(true);
                               }}
                               className="city-select" onClick={() => {
                            setCityOptionsVisible(true)
                        }}/>
                        <div className="city-options-field">
                            {cityOptionsVisible &&
                                <div className="city-options">
                                    {cities.filter(city => city.toString().toLowerCase().includes(cityOptionsSuggestions.toLocaleLowerCase())).map(city =>
                                        <div
                                            onClick={() => handleCityClick(city)} key={city}
                                            value={city}>{city}</div>
                                    )}
                                </div>
                            }
                        </div>
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
                <div className="activities-carousel">
                    <div className="activities-carousel-visible">
                        {
                            activities.length > 0 ?
                                <div>
                                    {activities.map((activity, index) => (
                                        <div
                                            className={index === carouselIndex ? 'active-card' : 'non-active-card'}
                                            key={activity.activityId}
                                        >
                                            <ActivitySmallCard
                                                activity={activity}
                                                handleJoinActivity={() => enrollUserToActivity(activity.activityId)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                :
                                <div>No activities found for requested criteria</div>
                        }
                    </div>
                    <div className="manage-searched-buttons">
                        <button onClick={handleCarouselPrev}><FontAwesomeIcon icon={faAngleUp}/></button>
                        <button onClick={handleCarouselNext}><FontAwesomeIcon icon={faAngleDown}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;