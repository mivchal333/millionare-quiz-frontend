import axios from "axios";

const unsplashUrl = "https://api.unsplash.com";
const apiKey = 'epiOlnKbTjedlJrcyOO-CR8E_xJBjqdGZ3Pa4AfNTb4';
export const fetchImages = query => axios
    .get(unsplashUrl + '/search/photos', {
        params: {
            query,
            q: 1,
            dpr: 0.5,
            orientation: "squarish",
            per_page: 15
        },
        headers: {
            Authorization:
                'Client-ID ' + apiKey
        }
    })
    .then(({data: {results = []}}) => results);

export const fetchRandomPhotos = () => axios
    .get(unsplashUrl + '/photos/random', {
        params: {
            q: 1,
            dpr: 0.5,
            orientation: "squarish",
            count: 20,
            client_id: apiKey
        },
        headers: {
            Authorization:
                'Client-ID ' + apiKey
        }
    })
    .then(response => response.data || []);


