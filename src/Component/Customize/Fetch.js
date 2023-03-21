import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [api, setApi] = useState([]);
    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                let data = res && res.data ? res.data : [];
                setApi(data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [url]);

    return { api };
}

export default useFetch;
