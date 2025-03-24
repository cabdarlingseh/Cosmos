import { useState, useEffect } from "react";
import axios from "axios";

export const nasa_API = process.env.REACT_APP_NASA_API_KEY;
const GNEWS_API_KEY = process.env.REACT_APP_GNEWS_KEY;

if (!nasa_API) {
    console.error("NASA API key is missing.");
}
if (!GNEWS_API_KEY) {
    console.error("GNews API key is missing.");
}

function useDataFetcher(url, initialData = null) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cache = new Map();

        const fetchData = async (retries = 3) => {
            setLoading(true);
            if (cache.has(url)) {
                setData(cache.get(url));
                setLoading(false);
                return;
            }
            for (let attempt = 0; attempt < retries; attempt++) {
                try {
                    const response = await axios.get(url, { timeout: 10000 });
                    cache.set(url, response.data);
                    setData(response.data);
                    setError(null);
                    break;
                } catch (error) {
                    if (attempt === retries - 1) {
                        const errorMessage = error.response
                            ? `Error ${error.response.status}: ${error.response.data.message || error.response.statusText}`
                            : error.message || "An error occurred while fetching data.";
                        setError(errorMessage);
                    }
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [url]);



    return { data, loading, error };
}

export default function useDashboardData() {
    const launches = useDataFetcher("https://ll.thespacedevs.com/2.0.0/launch/upcoming/");
    const picture = useDataFetcher(`https://api.nasa.gov/planetary/apod?api_key=${nasa_API}`);
    const news = useDataFetcher(`https://gnews.io/api/v4/top-headlines?category=science&apikey=${GNEWS_API_KEY}`, {
        articles: []
    })

    return {
        launches: launches.data?.results || [],
        launchesLoading: launches.loading,
        launchesError: launches.error,
        picture: picture.data || { url: "", title: "No Picture Available" },
        pictureLoading: picture.loading,
        pictureError: picture.error,
        news: news.data?.articles || [],
        newsLoading: news.loading,
        newsError: news.error,
    };
}

