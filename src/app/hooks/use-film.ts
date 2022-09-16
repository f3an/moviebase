import {useState, useEffect} from 'react'

export const useFilm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData]:Array<any> = useState([]);
    const [error, setError] = useState('');
    const apiKeyTmdb = <API KEY>;

    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true);
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKeyTmdb}&language=en-US`;

            try {
                const response = await fetch(url);
                const data:any = await response.json();
                if (data.status !== 404) {
                    setFilmData(data.results);
                }
            } catch (error:any) {
                setError(
                    'There has been a problem with your fetch operation: ' +
                        error.message
                );
            } finally {
                setIsLoading(false);
            }
            
        }

        fetchData();
    },[])

    return [filmData, isLoading, error];
}
