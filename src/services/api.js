import axios from "axios";

export const imgPath = " https://image.tmdb.org/t/p/w500"
export const imgPathOriginal = "https://image.tmdb.org/t/p/original"

const baseUrl = "https://api.themoviedb.org/3"
const apiKey = import.meta.env.VITE_API_KEY;

//tredning
export const fetchTrending = async (time_window = "day") => {
    const { data } = await axios.get(`${baseUrl}/trending/all/${time_window}?api_key=${apiKey}`);
    return data?.results;

    //clean the result response, only take data 
    //same as
    //const reponse = await....
    //return response.data.results
}

//movies and series details
export const fetchDetails = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    return res?.data;
}
export const fetchCredits = async (type,id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`);
    return res?.data;
}

//trailers
export const fetchVideos = async (type, id) => {
    const rest = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`);
    return rest?.data;
}

//discover movies
export const fetchMovies = async (page,sortBy)=>{
    const rest = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    return rest?.data;
}
//discover shows
export const fetchShows = async (page,sortBy)=>{
    const rest = await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    return rest?.data;
}

//search movies and shows
export const searchData = async(query,page)=>{
    const rest = await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`);
    return rest?.data;
}

