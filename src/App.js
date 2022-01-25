import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import { getPlacesData } from './api'

const App = () => {

    // cascading to map component
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)

    // cascading to list component
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [isLoading, setIsLoading] =useState(false)


    // getting user location 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoordinates( {lat: latitude, lng: longitude} )
        })
    },[]);


    useEffect(() => {

        setIsLoading(true);

        getPlacesData( type, bounds.sw, bounds.ne) 
            .then((data)=> {
                
                setPlaces(data);
                setIsLoading(false)
        })

    },[type, coordinates, bounds]);

    
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places ={places}
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
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;