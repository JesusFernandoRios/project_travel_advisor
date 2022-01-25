import axios from "axios";

 export const getPlacesData = async ( type, sw , ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary` , {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                
              },
              headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': 'bfce10d481mshd4737c9a8639a4fp1fa23djsn5b71ddac24ea'
              }
        });

        return data;

    } catch ( err ) {
        console.log(err)
    }
}