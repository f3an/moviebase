import { useEffect, useState } from 'react';

export const useGenres = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [genres, setGenres]:Array<any> = useState([]);
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
                    setGenres(data.results);
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

    return [genres, isLoading, error];
};
