import React, {useEffect, useState} from 'react';
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import GoogleMapComponent from "../GoogleMap/GoogleMap";

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const googleMapsLibraries = ["places"];

const AddActivity = () => {
    const [title, setTitle] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [activityType, setActivityType] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [city, setCity] = useState("");
    const [timeDisable, setTimeDisable] = useState(true);

    const userId = localStorage.getItem("userId");
    const today = new Date().toISOString().substring(0, 10);

    const handlePlaceSelect = () => {
        const selectedPlace = window.autocomplete.getPlace();
        if (selectedPlace) {
            setSelectedAddress(selectedPlace.formatted_address);
        }

        const cityComponent = selectedPlace.address_components.find(
            component => component.types.includes('locality')
        );
        if (cityComponent) {
            setCity(cityComponent.long_name);
        }

    }

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey,
        libraries: googleMapsLibraries
    });

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:8080/activities", {
            headers: {Authorization: localStorage.getItem("jwt"), "Content-Type": "application/json"},
            method: "POST",
                body: JSON.stringify({
                    "activityType": activityType,
                    "owner": {
                        "userId": userId
                    },
                    "title": title,
                    "city": city,
                    "address": selectedAddress,
                    "date": date,
                    "time": time,
                    "description": description,
                    "participants": null,
                    "activityPhotoUrl": null
                })
        }).then(response => {
            if (response.status === 200) {
                console.log("Activity added");
            } else {
                console.log("something went wrong")
            }
        })
    }

    function addHours(date, hours) {
        date.setHours(date.getHours() + hours);
        return date.toLocaleString().substring(12, 17);
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

    useEffect(() => {
        manageTime();
    }, [date])

    return isLoaded ? (

        <div>
            <form className="add-activity-form" onSubmit={handleSubmit}>
                <div className="title-field">
                    <label className="title-label">Title</label>
                    <input
                        required={true}
                        className="title-input"
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="location-field">
                    <label className="location-label">Select location</label>
                    <Autocomplete
                        onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
                        onPlaceChanged={handlePlaceSelect}
                    >
                        <input type="text" placeholder="Enter a location" required={true}/>
                    </Autocomplete>
                </div>
                <div className="activity-type-field">
                    <label className="activity-type-label">Activity type</label>
                    <select required={true}
                            className="activity-select"
                            id="activity-select"
                            value={activityType}
                            onChange={e => setActivityType(e.target.value)}>
                        <option value="" disabled={true}>Select activity Type</option>
                        <option value="RUNNING">Running</option>
                        <option value="WALKING">Walking</option>
                        <option value="SKATING">Skating</option>
                        <option value="CYCLING">Cycling</option>
                    </select>
                    </div>
                    <div>
                        <label className="description-label">Description</label>
                        <input
                            required={true}
                            className="description-input"
                            type="text"
                            id="description"
                            value={description}
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
                <button className="submit-btn" type="submit">Create activity</button>
            </form>

                <p>Selected Address: {selectedAddress}</p>


                {selectedAddress ?
                    <GoogleMapComponent height={'400px'} width={'400px'} address={selectedAddress}/> : <></>}
        </div>

    ) : <></>;
};


export default AddActivity;