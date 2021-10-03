import { useEffect, useState} from 'react';

const useFetch = () => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null);
    
    useEffect(() => { 
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
            .then(res =>{
                if(!res.ok)
                throw Error('could not fetch the data from the resource');
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setError(null);
                setData(data);
            })
            .catch(err =>{
                if(err.name === 'AbortError') {
                    console.log('fetch aborted')
                }else{
                    setError(err.message)
                    setIsPending(false);
                }
                
            })
        }, 1000)
    }, [])
   return { data, isPending, error}
}
export default useFetch;