import axios from "axios";


const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
// const travelApiKey = 'bfce10d481mshd4737c9a8639a4fp1fa23djsn5b71ddac24ea'

// const options = {
//     params: {
//       bl_latitude: '11.847676',
//       tr_latitude: '12.838442',
//       bl_longitude: '109.095887',
//       tr_longitude: '109.149359',
      
//     },
//     headers: {
//       'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//       'x-rapidapi-key': 'bfce10d481mshd4737c9a8639a4fp1fa23djsn5b71ddac24ea'
//     }
// };
  

 export const getPlacesData = async ( sw , ne) => {
    try {
        const { data: { data } } = await axios.get(URL , {
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