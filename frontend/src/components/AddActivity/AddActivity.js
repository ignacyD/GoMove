import React, { useState } from 'react';
import { LoadScript, Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const AddActivity = () => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handlePlaceSelect = () => {
        const selectedPlace = window.autocomplete.getPlace();
        if (selectedPlace) {
            setSelectedAddress(selectedPlace.formatted_address);

            const cityComponent = selectedPlace.address_components.find(
                component => component.types.includes('locality')

            );
            console.log(cityComponent)
            if (cityComponent) {
                setSelectedCity(cityComponent.long_name);
            }
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapApiKey,
        libraries: ['places'],
    });

    return isLoaded ? (
        <div>
            <Autocomplete
                onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
                onPlaceChanged={handlePlaceSelect}
            >
                <input type="text" placeholder="Enter a location" />
            </Autocomplete>
            <p>Selected Address: {selectedAddress}</p>
            {<p>Selected City: {selectedCity}</p>}
        </div>
    ) : (
        <></>
    );
};

export default AddActivity;
