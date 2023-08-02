import React, {useState} from 'react';
import { LoadScript, Autocomplete} from '@react-google-maps/api';
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

    return (
        <div>
            <LoadScript googleMapsApiKey={googleMapApiKey} libraries={["places"]}>
                <Autocomplete
                    onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
                    onPlaceChanged={handlePlaceSelect}
                >
                    <input type="text" placeholder="Enter a location"/>
                </Autocomplete>
                <p>Selected Address: {selectedAddress}</p>

            </LoadScript>

            {selectedAddress ? <GoogleMapComponent height={'400px'} width={'400px'} address={selectedAddress}/> : <></>}

        </div>
    );
};


export default AddActivity;