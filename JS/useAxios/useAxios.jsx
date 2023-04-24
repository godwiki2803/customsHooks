import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import LRUCache from 'lru-cache';

const useAxios = (url, method = 'get', options = {}, cacheSize = 100) => {
const [response, setResponse] = useState(null);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [networkError, setNetworkError] = useState(null);
const [serverError, setServerError] = useState(null);
const [cancelToken, setCancelToken] = useState(null);

const cache = useMemo(() => new LRUCache(cacheSize), [cacheSize]);

useEffect(() => {
setIsLoading(true);
const source = axios.CancelToken.source();
setCancelToken(source);

const fetchData = async () => {
  try {
    let result;

    if (cache.has(url)) {
      result = cache.get(url);
    } else {
      result = await axios({
        url,
        method,
        ...options,
        cancelToken: source.token
      });

      cache.set(url, result);
    }

    setResponse(result.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Llamada cancelada');
    } else if (error.response) {
      setServerError(error.response.data);
    } else if (error.request) {
      setNetworkError('Error de red. Por favor, revise su conexión a internet.');
    } else {
      setError(error);
    }
  }

  setIsLoading(false);
};

fetchData();

return () => {
  source.cancel('Llamada cancelada desde el hook personalizado');
};
}, [url, method, options, cache]);

return { response, error, isLoading, networkError, serverError };
};

useAxios.propTypes = {
url: PropTypes.string.isRequired,
method: PropTypes.string,
options: PropTypes.object,
cacheSize: PropTypes.number
};

export default useAxios;