import { useEffect, useState } from 'react';

export const useFilmsList = (page:number,isFirstTimeOpen:boolean) => {
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms]:Array<any> = useState([]);
    const [error, setError] = useState('');
    const apiKeyTmdb = <API KEY>;

    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true);
            const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKeyTmdb}&page=${page}`;

            try {
                const response = await fetch(url);
                const data:any = await response.json();
                if (data.status !== 404) {
                    setFilms(data.results);
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

        if(isFirstTimeOpen === true) {
            setTimeout(() => {
                fetchData();
            }, 1900);
        } else {
            fetchData();
        }
    },[])

    return [films, isLoading, error];
};
