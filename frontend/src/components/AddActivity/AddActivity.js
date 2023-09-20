import React, {useContext, useEffect, useRef, useState} from 'react';
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import GoogleMapComponent from "../GoogleMap/GoogleMap";
import {useNavigate} from "react-router-dom";
import {Context} from "../../App";
import {v4 as UUID} from 'uuid';
import './AddActivity.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonBiking, faPersonRunning, faPersonSkating, faPersonWalking} from "@fortawesome/free-solid-svg-icons";
import ModalStyles from "../../ModalStyles";
import ActivityAddedModal from "../ActivityAddedModal/ActivityAddedModal";
import Modal from "react-modal";
import {convertBase64, updateInfo} from "../functions";

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const googleMapsLibraries = ["places"];

const AddActivity = () => {
    const setDisplayActivityAddedModal = useContext(Context).setDisplayActivityAddedModal;
    const selectedUserPlace = {
        selectedAddress: "",
        city: "",
        street: "",
        streetNumber: "",
        country: "",
    }
    const [activityData, setActivityData] = useState({
        title: "",
        activityType: "",
        description: "",
        date: "",
        time: "",
        activityPhoto: null,
        selectedUserPlace: selectedUserPlace
    })
    const [timeDisable, setTimeDisable] = useState(true);
    const [chosenOption, setChosenOption] = useState(null);
    const [showIncorrectActivityModal, setShowIncorrectActivityModal] = useState(false);
    const [showWrongAddressModal, setShowWrongAddressModal] = useState(false);
    const uploadImageRef = useRef(null);


    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const today = new Date().toISOString().substring(0, 10);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateISO = maxDate.toISOString().split('T')[0];

    useEffect(() => {
        manageTime();
    }, [activityData.date])

    const handleChosenOption = (option) => {
        const value = chosenOption === option ? null : option;
        setChosenOption(value);
        updateInfo(setActivityData, "activityType", value);
    };

    const handlePlaceSelect = () => {
        const selectedPlace = window.autocomplete.getPlace();

        if (!selectedPlace || !selectedPlace.address_components) {
            updateInfo(setActivityData, "selectedUserPlace", null);
            return;
        }

        activityData.selectedUserPlace.selectedAddress = selectedPlace.formatted_address;

        selectedPlace.address_components.forEach((component) => {
            if (component.types.includes("locality")) {
                updateInfo(setActivityData, "selectedUserPlace.city", component.long_name)
            } else if (component.types.includes("route")) {
                updateInfo(setActivityData, "selectedUserPlace.street", component.long_name)
            } else if (component.types.includes("street_number")) {
                updateInfo(setActivityData, "selectedUserPlace.streetNumber", component.long_name)
            } else if (component.types.includes("country")) {
                updateInfo(setActivityData, "selectedUserPlace.country", component.long_name)
            }
        });
    };

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey,
        libraries: googleMapsLibraries
    });

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        updateInfo(setActivityData, "activityPhoto", base64);
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!selectedUserPlace) {
            setShowWrongAddressModal(true);
            setTimeout(() => {
                setShowWrongAddressModal(false);
            }, 3000)
            return;
        }

        if (activityData.activityType === "") {
            setShowIncorrectActivityModal(true);
            setTimeout(() => {
                setShowIncorrectActivityModal(false);
            }, 3000)
            return;
        }

        if (![activityData.selectedUserPlace.selectedAddress, activityData.selectedUserPlace.city, activityData.selectedUserPlace.street].every(Boolean)) {
            setShowWrongAddressModal(true);
            setTimeout(() => {
                setShowWrongAddressModal(false);
            }, 3000)
            return;
        }

        const activityId = UUID();
        fetch("http://localhost:8080/activities", {
            headers: {Authorization: localStorage.getItem("jwt"), "Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({
                "activityId": activityId,
                "activityType": activityData.activityType,
                "owner": {
                    "userId": userId
                },
                "title": activityData.title,
                "city": activityData.selectedUserPlace.city,
                "street": activityData.selectedUserPlace.street,
                "streetNumber": activityData.selectedUserPlace.streetNumber,
                "country": activityData.selectedUserPlace.country,
                "address": activityData.selectedUserPlace.selectedAddress,
                "date": activityData.date,
                "time": activityData.time,
                "description": activityData.description,
                "participants": null,
                "activityPhoto": activityData.activityPhoto && activityData.activityPhoto.length > 0 ? activityData.activityPhoto.split(",")[1] : null
            })
        }).then(response => {
            if (response.status !== 200) {
                console.error("something went wrong");
                return;
            }
            setDisplayActivityAddedModal(true);
            setTimeout(() => {
                setDisplayActivityAddedModal(false)
                navigate(`/activity-page/${activityId}`)
            }, 3000)
        })
    }

    function addHours(date, hours) {
        date.setHours(date.getHours() + hours);
        const timeString = date.toLocaleTimeString();
        return timeString.substring(0, timeString.length - 3);
    }

    function manageTime() {
        if (new Date(activityData.date).getDate() === new Date().getDate()) {
            return addHours(new Date(), 2);
        }
    }

    function dateHandler(e) {
        updateInfo(setActivityData, "date", e.target.value);
        setTimeDisable(false);
    }


    return isLoaded ? (
        <div className="add-activity">
            <Modal
                isOpen={showWrongAddressModal}
                onRequestClose={() => setShowWrongAddressModal(false)}
                style={ModalStyles.smallModalStyles}
                className="activity-added-modal"
                appElement={document.querySelector("#root") || undefined}
            >
                Choose correct address. Address must include city, street, and street number.
            </Modal>
            <Modal
                isOpen={showIncorrectActivityModal}
                onRequestClose={() => setShowIncorrectActivityModal(false)}
                style={ModalStyles.smallModalStyles}
                className="activity-added-modal"
                appElement={document.querySelector("#root") || undefined}
            >
                Choose correct activity type.
            </Modal>
            <form className="add-activity-form" onSubmit={handleSubmit}>
                <div className="title-field">
                    <label className="title-label">Title</label>
                    <input
                        required={true}
                        className="title-input"
                        type="text"
                        id="title"
                        value={activityData.title}
                        minLength={8}
                        maxLength={32}
                        onChange={e => updateInfo(setActivityData, "title", e.target.value)}
                    />
                </div>
                <div className="location-field">
                    <label className="location-label">Select location</label>
                    <Autocomplete
                        onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
                        onPlaceChanged={handlePlaceSelect}
                    >
                        <input type="text"
                               placeholder="Enter a location"
                               required={true}
                        />
                    </Autocomplete>
                </div>
                <div className="activity-type-field">
                    <label className="activity-type-label">Activity type</label>
                    <div className="activities ">
                        <div className={`${chosenOption === 'RUNNING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('RUNNING')}
                        >
                            <FontAwesomeIcon icon={faPersonRunning} size="2xl"/>
                            <p>Running</p>
                        </div>
                        <div className={`${chosenOption === 'WALKING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('WALKING')}
                        >
                            <FontAwesomeIcon icon={faPersonWalking} size="2xl"/>
                            <p>Walking</p>
                        </div>
                        <div className={`${chosenOption === 'SKATING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('SKATING')}
                        >
                            <FontAwesomeIcon icon={faPersonSkating} size="2xl"/>
                            <p>Skating</p>
                        </div>
                        <div className={`${chosenOption === 'CYCLING' ? 'activity-add' : 'activity'}`}
                             onClick={() => handleChosenOption('CYCLING')}
                        >
                            <FontAwesomeIcon icon={faPersonBiking} size="2xl"/>
                            <p>Cycling</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="description-label">Description</label>
                    <textarea
                        required={true}
                        className="description-input"
                        type="text"
                        id="description"
                        value={activityData.description}
                        minLength={8}
                        maxLength={1024}
                        onChange={e => updateInfo(setActivityData, "description", e.target.value)}
                    /></div>
                <div className="date-field">
                    <label className="date-label">Date</label>
                    <input
                        required={true}
                        value={activityData.date}
                        type="date"
                        id="date"
                        name="date"
                        min={today}
                        max={maxDateISO}
                        onChange={(e) => dateHandler(e)}/>
                </div>
                <div className="time-field">
                    <label className="time-label">Time</label>
                    <input
                        disabled={timeDisable}
                        required={true}
                        value={activityData.time}
                        type="time"
                        id="time"
                        name="time"
                        min={manageTime()}
                        onChange={(e) => updateInfo(setActivityData, "time", e.target.value)}/>
                </div>
                <div className="add-activity-add-photo">
                    <button className="custom-file-button" type="button" onClick={() => uploadImageRef.current.click()}>
                        {activityData.activityPhoto ? <img className='activity-picture'
                             src={activityData.activityPhoto}></img> :
                        <div className='change-photo-button'>
                            Click to choose activity image
                        </div>}
                    </button>
                    <div className="image-field">
                        <input
                            required={false}
                            ref={uploadImageRef}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleImageUpload}
                            style={{display: 'none'}}
                        />
                    </div>
                </div>
                <button className="submit-btn" type="submit">Create activity</button>
            </form>
            {activityData.selectedUserPlace && activityData.selectedUserPlace.selectedAddress ?
                <div className="google-maps">
                    <p>Selected Address: {activityData.selectedUserPlace.selectedAddress}</p>
                    <GoogleMapComponent height={'400px'} width={'1020px'} address={activityData.selectedUserPlace.selectedAddress}/>
                </div> : <></>}
        </div>
    ) : <></>;
};


export default AddActivity;