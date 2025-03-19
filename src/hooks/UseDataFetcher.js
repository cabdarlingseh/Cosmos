import { useState, useEffect } from 'react';
import axios from 'axios';

const nasa_API = process.env.REACT_APP_NASA_API_KEY || 'sjYX75buPFbu82hp7QafJqBqTypxLttZRibp38d6';

function useDataFetcher(url, initialData = null) {

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            }
            catch (error) {
                if (error.response?.data?.msg === "API_KEY_INVALID") {
                    setError("Invalid NASA API key. Please get a valid key from https://api.nasa.gov.");
                }
                else {
                    setError(error.message || "An error occurred while fetching data.");
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default function useDashboardData() {
    const launches = useDataFetcher("https://ll.thespacedevs.com/2.0.0/launch/upcoming/");
    const picture = useDataFetcher(`https://api.nasa.gov/planetary/apod?api_key=${nasa_API}`);
    const trivia = useDataFetcher("https://ll.thespacedevs.com/2.0.0/launch/upcoming/?search=SpaceX&limit=5", { results: [] });
    console.log(trivia);

    return {
        launches: launches.data?.results || [],
        launchesLoading: launches.loading,
        launchesError: launches.error,
        picture: picture.data,
        pictureLoading: picture.loading,
        pictureError: picture.error,
        trivia: trivia.data?.results || [],
        triviaLoading: trivia.loading,
        triviaError: trivia.error,
    };
}

