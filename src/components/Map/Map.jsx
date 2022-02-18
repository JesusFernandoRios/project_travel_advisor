import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating  from '@material-ui/lab/Rating'

import useStyles from './styles'

export default function Map( {setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) {

    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width:600px)");

    const API_KEY = process.env.API_KEY

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={ { key: "AIzaSyDVqoA0rDo-uGc0Ip5XdXIvP4BFRbWlS-Q" } }
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={ 14 }
                margin={ [ 50,50,50,50] }
                options={''}
                onChange={(e) => { 
                    console.log("this is onchange on google map", e)
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng})
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child) }
            >

                {places?.map((place, index) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={index}
                    >
                        {
                            !isDesktop ? 
                            (
                                <LocationOnOutlinedIcon  color="primary" fontSize='large'/>
                            ) 
                            : 
                            (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.Typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>

                                    <img 
                                        className={classes.pointer} 
                                        src={place.photo ? place.photo.images.large.url :'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' }
                                        alt={place.name}
                                    />

                                    <Rating size='small' value={Number(place.rating)} readOnly/>

                                </Paper>
                            )
                        }
                    </div>
                ))}

                {
                    weatherData?.list.map((data, index) => (
                        <div key={index} lat={data.coord.lat} lon={data.coord.lon}>
                            <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                        </div>
                    ))
                }
            </GoogleMapReact>
            
        </div>
    )
}
