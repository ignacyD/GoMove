import React, {useState} from 'react';
import {LoadScript, Autocomplete, useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';
import GoogleMapComponent from "../GoogleMap/GoogleMap";


const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const AddActivity = () => {
    const [selectedAddress, setSelectedAddress] = useState('');


    const handlePlaceSelect = () => {
        const selectedPlace = window.autocomplete.getPlace();
        if (selectedPlace) {
            setSelectedAddress(selectedPlace.formatted_address);

        }

    }

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey,
        libraries: ["places"]
    });


    return isLoaded ? (

        <div>

            <Autocomplete
                onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
                onPlaceChanged={handlePlaceSelect}
            >
                <input type="text" placeholder="Enter a location"/>
            </Autocomplete>
            <p>Selected Address: {selectedAddress}</p>


            {selectedAddress ? <GoogleMapComponent height={'400px'} width={'400px'} address={selectedAddress}/> : <></>}


        </div>

    ) : <></>;
};


export default AddActivity;