# Hook personalizado useAxios
El hook personalizado useAxios es una utilidad de React que te permite hacer llamadas a una API de manera sencilla y eficiente. Este hook utiliza la librería axios para realizar las solicitudes HTTP y tiene un sistema de caché basado en el tamaño del caché LRU.

# Instalación
Para instalar useAxios en tu proyecto, simplemente ejecuta el siguiente comando:
```
bash
Copy code
npm install axios lru-cache prop-types
```

# Uso
Para utilizar el hook useAxios, primero importa el hook en el componente donde lo vayas a utilizar:

javascript
Copy code
```
import useAxios from 'useAxios';
```
Luego, llama al hook en tu componente y pasa la URL de la API como primer argumento:

javascript
Copy code
```
const { response, error, isLoading, networkError, serverError } = useAxios('https://ejemplo.com/api/datos');
```
Puedes pasar un método HTTP diferente al método predeterminado GET como segundo argumento y opciones adicionales para la solicitud como tercer argumento.


javascript
Copy code
```
const { response, error, isLoading, networkError, serverError } = useAxios('https://ejemplo.com/api/datos', 'post', { data: { nombre: 'Juan', edad: 25 } });
```
También puedes especificar el tamaño de la caché como cuarto argumento. El tamaño predeterminado de la caché es 100.


javascript
Copy code
```
const { response, error, isLoading, networkError, serverError } = useAxios('https://ejemplo.com/api/datos', 'get', {}, 50);
```

# Propiedades
El hook useAxios devuelve un objeto que contiene las siguientes propiedades:

response: el resultado de la solicitud HTTP.
error: cualquier error generado por la solicitud HTTP.
isLoading: un booleano que indica si la solicitud está en curso o no.
networkError: un mensaje de error si hay un problema de red.
serverError: un mensaje de error si el servidor responde con un código de error HTTP.
#PropTypes
El hook useAxios también incluye PropTypes para asegurar que los parámetros sean del tipo correcto:

javascript
Copy code
```
useAxios.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  options: PropTypes.object,
  cacheSize: PropTypes.number
};
```
# Ejemplo completo
Aquí hay un ejemplo completo de cómo utilizar el hook useAxios en un componente de React:

javascript
Copy code
```
import React from 'react';
import useAxios from 'useAxios';

const App = () => {
  const { response, error, isLoading, networkError, serverError } = useAxios('https://ejemplo.com/api/datos', 'get', {}, 50);

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (networkError) {
    return <p>{networkError}</p>;
  }

  if (serverError) {
    return <p>{serverError}</p>;
  }

  if (error) {
    return <p>Ocurrió un error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Datos:</h1>
      <ul>
        {response.map(dato => <li key={dato.id}>{dato.nombre}</li>)}
      </ul>
    </div>
  );
};

```