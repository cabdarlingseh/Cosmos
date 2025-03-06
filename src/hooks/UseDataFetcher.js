import { useState, useEffect } from 'react';
import axios from 'axios';

const nasa_API = 'sjYX75buPFbu82hp7QafJqBqTypxLttZRibp38d6';

export default function UseDataFetcher() {

    const [launches, setLaunches] = useState([]);
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const launchesData = await axios.get('https://ll.thespacedevs.com/2.0.0/launch/upcoming/');
                const pictureData = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasa_API}`);

                setLaunches(launchesData.data.results);
                setPicture(pictureData.data);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData()
    }, []);

    return { launches, picture, loading, error };
}