import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import { getPlacesData, getWeatherData } from './api'

const App = () => {

    // cascading to map component
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)

    // cascading to list component
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [isLoading, setIsLoading] =useState(false)

    // cascading to list and map components
    const [filteredPlaces, setFilteredPlaces] =useState([])


    // getting user location 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoordinates( {lat: latitude, lng: longitude} )
        })
    },[]);

    // getting user Rating
    useEffect(() => {
      const filteredPlaces = places.filter((place) => place.rating > rating)

      setFilteredPlaces(filteredPlaces)
      
    }, [rating]);
    


    useEffect(() => {

        if(bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data))

            getPlacesData( type, bounds.sw, bounds.ne) 
                .then((data)=> {
                    
                    let filteredData = data?.filter((place) => place.name && place.num_reviews > 0)
                    setPlaces(filteredData);
                    setFilteredPlaces([])
                    setIsLoading(false)
            })
        }

    },[type, bounds]);

    console.log(places)
    console.log(filteredPlaces)

    
    return (
        <>
            <CssBaseline />
            <Header  setCoordinates={setCoordinates}/>

            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places ={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates} 
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;