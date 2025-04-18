import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/customHooks.js';


async function fetchSorted(){
  const places=await fetchAvailablePlaces();
  return new Promise((resolve)=>{
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      )
       resolve(sortedPlaces)
  })
    
})}


  

export default function AvailablePlaces({ onSelectPlace }) {
  const {error,fetchData:availablePlaces,setFetchData:setAvailablePlaces,isFetching}=useFetch(fetchSorted,[])


  
       

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
