import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Profile.css';
import {Context} from "../../App";
import testPhoto from "../../assets/images/test.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

function Profile() {
    const userData = useContext(Context).userData;
    const [carouselIndex, setCarouselIndex] = useState({owned: 0, takePart: 0});
    const [ownedActivities, setOwnedActivities] = useState([]);
    const [allUserActivities, setAllUserActivities] = useState([]);
    const navigate = useNavigate();

    function displayActivities(activities, type) {

        if (activities.length > 0) {
            return (
                <div className={'activities-carousel-in-profile'}>
                    <div className='activities-in-profile-swipe-left-container'
                         onClick={() => handleIndexChange(-1, type)}>
                        <button className="activities-in-profile-swipe-left-button">
                            <FontAwesomeIcon icon={faChevronLeft}/></button>
                    </div>
                    <div className="activities-in-profile-carousel">
                        <div className="activities-container">
                            {activities.map((activity) => (
                                <div
                                    className="activity-card"
                                    key={activity.activityId}
                                    onClick={() => navigate(`/activity-page/${activity.activityId}`)}
                                >
                                    <div className="activity-title">{activity.title}</div>
                                    <hr/>
                                    <div className="activity-type">{activity.activityType}</div>
                                    <div className="activity-details">
                                        <div className="activity-city">{activity.city}</div>
                                        <div className="activity-date-time">
                                            <span className="activity-date">{activity.date}</span>
                                            <span className="activity-time">{activity.time}</span>
                                        </div>
                                    </div>
                                    <img src={testPhoto} alt={activity.title} className="activity-image"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='activities-in-profile-swipe-right-container'>
                        <button className="activities-in-profile-swipe-right-button"
                                onClick={() => handleIndexChange(1, type)}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </div>
                </div>
            )
        } else {
            return <h3>User has no activities</h3>;
        }
    }

    const handleIndexChange = (amount, type) => {
        if (type === 'owned') {
            const newIndex = carouselIndex[type] + amount;
            if (newIndex >= 0 && newIndex <= allUserActivities.length - 5) {
                setCarouselIndex({...carouselIndex, [type]: newIndex});
            }
        } else if (type === 'takePart') {
            const newIndex = carouselIndex[type] + amount;
            if (newIndex >= 0 && newIndex <= allUserActivities.length - 5) {
                setCarouselIndex({...carouselIndex, [type]: newIndex});
            }
        }
    }
    useEffect(() => {
        const displayedActivities = document.querySelector('.activities-container');
        console.log('lol')
        if (displayedActivities) {
            const swipeLeftButton = document.querySelector('.activities-in-profile-swipe-left-container')
            const swipeRightButton = document.querySelector('.activities-in-profile-swipe-right-container')
            if (carouselIndex.takePart <= 0) {
                swipeLeftButton.style.opacity = 0;
                setTimeout(() => {
                    swipeLeftButton.style.visibility = 'hidden';
                }, 500)
            } else {
                swipeLeftButton.style.opacity = 1;
                swipeLeftButton.style.visibility = 'visible';
            }
            if (carouselIndex.takePart > allUserActivities.length - 6) {
                swipeRightButton.style.opacity = 0;
                setTimeout(() => {
                    swipeRightButton.style.visibility = 'hidden';
                }, 500)
            } else {
                swipeRightButton.style.opacity = 1;
                swipeRightButton.style.visibility = 'visible';
            }
            displayedActivities.style.right = `${carouselIndex.takePart * 230 + 'px'}`
        }
    }, [carouselIndex.takePart])

    useEffect(() => {
        const displayedActivities = document.querySelectorAll('.activities-container')[1];
        console.log(displayedActivities);
        console.log(carouselIndex.owned);
        console.log(carouselIndex.takePart)
        if (displayedActivities) {
            const swipeLeftButton = document.querySelectorAll('.activities-in-profile-swipe-left-container')[1]
            const swipeRightButton = document.querySelectorAll('.activities-in-profile-swipe-right-container')[1]
            if (carouselIndex.owned <= 0) {
                swipeLeftButton.style.opacity = 0;
                setTimeout(() => {
                    swipeLeftButton.style.visibility = 'hidden';
                }, 500)
            } else {
                swipeLeftButton.style.opacity = 1;
                swipeLeftButton.style.visibility = 'visible';
            }
            if (carouselIndex.owned > allUserActivities.length - 6) {
                swipeRightButton.style.opacity = 0;
                setTimeout(() => {
                    swipeRightButton.style.visibility = 'hidden';
                }, 500)
            } else {
                swipeRightButton.style.opacity = 1;
                swipeRightButton.style.visibility = 'visible';
            }
            displayedActivities.style.right = `${carouselIndex.owned * 230 + 'px'}`
        }
    }, [carouselIndex.owned])

    async function fetchOwnedActivities(userId) {
        const response = await fetch(
            `http://localhost:8080/activities/user/${userId}`, {
                headers: {Authorization: localStorage.getItem("jwt")}
            })
        const data = await response.json();
        setOwnedActivities(data);
    }

    async function fetchAllUserActivities(userId) {
        const response = await fetch(
            `http://localhost:8080/activities/participant/${userId}`, {
                headers: {Authorization: localStorage.getItem("jwt")}
            })
        const activities = await response.json();
        setAllUserActivities(activities);
    }

    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            fetchOwnedActivities(userData.userId);
            fetchAllUserActivities(userData.userId);
        }
    }, [userData]);


    return (
        <div>
            <div className="user-container">
                <div className="user-card">
                    <p className="username">{userData.username}</p>
                    <div className="profile-picture-container">
                        <img
                            className="profile-picture"
                            src={userData.userPhotoUrl}
                            alt="Profile picture"
                        />
                    </div>
                </div>
                <div className="user-details">
                    <h3 className="activity-label">Preferred Activity:</h3>
                    <p className="activity-info">{userData.preferredActivity}</p>

                    <h3 className="activity-label">City:</h3>
                    <p className="activity-info">{userData.city}</p>

                    <h3 className="activity-label">Description:</h3>
                    <p className="activity-info">{userData.description}</p>
                    <button className="update-info-button" onClick={() => navigate("/additional-info-form")}>Update info</button>
                </div>
            </div>
            <h3 className="activity-type-title">Take part</h3>
            <div className="activity-carousel-container">
                {displayActivities(allUserActivities, 'takePart')}
            </div>
            <h3 className="activity-type-title">Owned</h3>
            <div className="activity-carousel-container">
                {displayActivities(ownedActivities, 'owned')}
            </div>
        </div>
    )
}

export default Profile;