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

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const googleMapsLibraries = ["places"];

const AddActivity = () => {
    const setDisplayActivityAddedModal = useContext(Context).setDisplayActivityAddedModal;
    const [title, setTitle] = useState("");
    const [selectedUserPlace, setSelectedUserPlace] = useState(null)
    const [activityType, setActivityType] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [activityImage, setActivityImage] = useState("");
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
    }, [date])

    const handleChosenOption = (option) => {
        const value = chosenOption === option ? null : option;
        setChosenOption(value);
        setActivityType(value);
    };

    const handlePlaceSelect = () => {
        const selectedPlace = window.autocomplete.getPlace();

        if (!selectedPlace || !selectedPlace.address_components) {
            setSelectedUserPlace(null);
            return;
        }

        const formattedPlace = {
            selectedAddress: "",
            city: "",
            street: "",
            streetNumber: "",
            country: "",
        };

        formattedPlace.selectedAddress = selectedPlace.formatted_address;

        selectedPlace.address_components.forEach((component) => {
            if (component.types.includes("locality")) {
                formattedPlace.city = component.long_name;
            } else if (component.types.includes("route")) {
                formattedPlace.street = component.long_name;
            } else if (component.types.includes("street_number")) {
                formattedPlace.streetNumber = component.long_name;
            } else if (component.types.includes("country")) {
                formattedPlace.country = component.long_name;
            }
        });

        setSelectedUserPlace(formattedPlace);
    };

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey,
        libraries: googleMapsLibraries
    });

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setActivityImage(base64);
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

        if (activityType === "") {
            setShowIncorrectActivityModal(true);
            setTimeout(() => {
                setShowIncorrectActivityModal(false);
            }, 3000)
            return;
        }

        if (![selectedUserPlace.selectedAddress, selectedUserPlace.city, selectedUserPlace.street].every(Boolean)) {
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
                "activityType": activityType,
                "owner": {
                    "userId": userId
                },
                "title": title,
                "city": selectedUserPlace.city,
                "street": selectedUserPlace.street,
                "streetNumber": selectedUserPlace.streetNumber,
                "country": selectedUserPlace.country,
                "address": selectedUserPlace.selectedAddress,
                "date": date,
                "time": time,
                "description": description,
                "participants": null,
                "activityPhoto": activityImage.split(",")[1]
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
        if (new Date(date).getDate() === new Date().getDate()) {
            return addHours(new Date(), 2);
        }
    }

    function dateHandler(e) {
        setDate(e.target.value);
        setTimeDisable(false);
    }


    return isLoaded ? (
        <div className="add-activity">
            <Modal
                isOpen={showWrongAddressModal}
                onRequestClose={() => setShowWrongAddressModal(false)}
                style={ModalStyles.activityAddedModalStyles}
                className="activity-added-modal"
                appElement={document.querySelector("#root") || undefined}
            >
                Choose correct address. Address must include city, street, and street number.
            </Modal>
            <Modal
                isOpen={showIncorrectActivityModal}
                onRequestClose={() => setShowIncorrectActivityModal(false)}
                style={ModalStyles.activityAddedModalStyles}
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
                        value={title}
                        minLength={8}
                        maxLength={32}
                        onChange={e => setTitle(e.target.value)}
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
                        value={description}
                        minLength={8}
                        maxLength={1024}
                        onChange={e => setDescription(e.target.value)}
                    /></div>
                <div className="date-field">
                    <label className="date-label">Date</label>
                    <input
                        required={true}
                        value={date}
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
                        value={time}
                        type="time"
                        id="time"
                        name="time"
                        min={manageTime()}
                        onChange={(e) => setTime(e.target.value)}/>
                </div>
                <div className="add-activity-add-photo">
                    <button className="custom-file-button" type="button" onClick={() => uploadImageRef.current.click()}>
                        {activityImage ? <img className='activity-picture'
                             src={activityImage}></img> :
                        <div className='change-photo-button'>
                            Click to choose activity image
                        </div>}
                    </button>
                    <div className="image-field">
                        <input
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
            {selectedUserPlace && selectedUserPlace.selectedAddress ?
                <div className="google-maps">
                    <p>Selected Address: {selectedUserPlace.selectedAddress}</p>
                    <GoogleMapComponent height={'400px'} width={'1020px'} address={selectedUserPlace.selectedAddress}/>
                </div> : <></>}
        </div>
    ) : <></>;
};


export default AddActivity;