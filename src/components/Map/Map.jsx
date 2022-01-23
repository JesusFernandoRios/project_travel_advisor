import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import { Rating } from '@material-ui/lab'

import useStyles from './styles'

export default function Map( {setCoordinates, setBounds, coordinates}) {

    const classes = useStyles();
    const isMobile = useMediaQuery("(min-width:600px)");
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
                onChildClick={''}
            >

            </GoogleMapReact>
            
        </div>
    )
}
