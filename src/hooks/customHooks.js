import {useState ,useEffect} from 'react'
export function useFetch(fetchApi,initialValue){
    const [fetchData, setFetchData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
          setIsFetching(true);
          try {
            const places = await fetchApi();
            setFetchData(places);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }
    
          setIsFetching(false);
        }
    
        fetchPlaces();
      }, [fetchApi]);

      

        return {
            fetchData,
            setFetchData,
            isFetching,
            error
        }
}