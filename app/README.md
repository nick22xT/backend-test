# app-eventos-service

Servicio para la creacion y obtencion de Eventos.

## Usuario de Pruebas
Existe un usuario de pruebas ya configurado en la base de datos para poder autenticarse a las diferentes APIS que lo requieran, el mismo es:
````
{
    "username": "test",
    "password": "test123"
}
````

## Variables de Entorno
Para que el proyecto funcione correctamente en de forma local, se debe de crear un archivo .env con las siguientes variables de entorno:

- **DB_HOST:** url del host en donde se encuentra alojada la base de datos.
- **DB_NAME:** nombre de la base o esquema.
- **DB_PORT:** puerto por el cual se accede a la base de datos.
- **DB_USER:** usuario de la base de datos.
- **DB_PASS:** contraseña del usuario de la base de datos.
- **JWT_SECRET:** secret con el cual se codifican / decodifican las contraseñas de los usuarios (recomendado para probar: trabajo-final-node-nico).
- **PORT (Opcional):** puerto por el cual se va a acceder al servicio (por defecto 3000).

## Endpoints
### Login
- **Descripcion:** autentica un usuario en el sistema.
- **BaseUrl:** /auth/login
- **Tipo:** POST
- **Request Body:** 
````
{
    "username": "test",
    "password": "test123"
}
````
- **Response:**
````
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTYyODMwMTY4NCwiZXhwIjoxNjI4Mzg4MDg0fQ.dTFsVJpXs1rU-1yxBnJQxHyx0IxgEZpkyi8BOB0Ozds"
}
````

### Search Eventos
- **Descripcion:** obtiene una lista de eventos de la base de datos y su fecha futura mas proxima. Si el usuario esta autenticado permite paginar los registros, de lo contrario solo devuelve 4 registros como maximo.
- **BaseUrl:** /eventos
- **Tipo:** GET
- **Query Params:**
  - **destacados:** obtiene los eventos destacados de la base de datos. Admite los valores **true** o **false**.
  - **pageIndex:** define el indice de pagina actual. Es de tipo entero y por defecto es **1**.
  - **pageSize:** define la cantidad de registros por pagina. Es de tipo numerico y por defecto es **4**.
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.

````
http://{SERVER_URL}/eventos?destacados=true&pageSize=10&pageIndex=1
````

### Get Eventos by ID
- **Descripcion:** obtiene un evento de la base de datos por su clave primaria.
- **BaseUrl:** /eventos/{id}
- **Tipo:** GET
- **Url Params:**
  - **id:** es el ID del registro del evento que se quiere obtener, es de tipo numeric **(requerido)**. 
````
http://{SERVER_URL}/eventos/3
````

### Add Evento
- **Descripcion:** agrega un nuevo evento a la base de datos
- **BaseUrl:** /eventos
- **Tipo:** POST
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
- **Request Body:**
  - **titulo:** es el titulo del evento, es de tipo string **(requerido)**.
  - **descripcion:** es una descripcion mas destacada del evento, es de tipo string **(requerido)**.
  - **lugar:** lugar donde se llevará a cabo el evento, es de tipo string **(requerido)**.
  - **destacado:** indica si el evento es destacado, es de tipo boolean **(requerido)**.
  - **imagen:** la url de alguna imagen asociada al evento, es de tipo string.
  - **eventosFechas:** contiene la lista de fechas en las que se llevará a cabo el evento **(requerido)**.
    - **inicio:** indica la fecha de inicio del evento, es de tipo date time y debe respetar el formato de fecha **ISO8601** **(requerido)**.
    - **fin:** indica la fecha de fin de un evento, es de tipo date time y debe respetar el formato de fecha **ISO8601** **(requerido)**.
    - **precio:** indica el precio de la entrada al evento, es de tipo numeric. Si se incluye debe ser mayor o igual a 0.
````
{
    "titulo": "Prueba POST Evento 5",
    "descripcion": "Esta es una prueba de la API POST de Eventos",
    "lugar": "Algun lugar",
    "destacado": false,
    "imagen": ""
    "eventosFechas": [
        {
            "inicio": "2021-09-26T12:00:00Z",
            "fin": "2021-10-26T12:00:00Z",
            "precio": 4
        }
    ]
}
````

### Update Evento
- **Descripcion:** actualiza un evento en la base de datos
- **BaseUrl:** /eventos/{id}
- **Tipo:** PUT
- **Url Params:**
  - **id:** es el ID del registro del evento que se quiere actualizar, es de tipo numeric **(requerido)**.
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
- **Request Body:**
  - **eventoId:** es el ID del evento, es de tipo numeric y debe de coincidir con el ID pasado como parametro en la Url **(requerido)**.
  - **titulo:** es el titulo del evento, es de tipo string **(requerido)**.
  - **descripcion:** es una descripcion mas destacada del evento, es de tipo string **(requerido)**.
  - **lugar:** lugar donde se llevará a cabo el evento, es de tipo string **(requerido)**.
  - **destacado:** indica si el evento es destacado, es de tipo boolean **(requerido)**.
  - **imagen:** la url de alguna imagen asociada al evento, es de tipo string.
````
http://{SERVER_URL}/eventos/3
````
````
{
    "eventoId": 3,
    "titulo": "Prueba POST Evento 3",
    "descripcion": "Esta es una prueba de la API POST de Eventos",
    "lugar": "Algun lugar",
    "destacado": false,
    "imagen": null,
    "created": "2021-08-05T03:48:29.000Z",
    "updated": null
}
````

### Delete Evento
- **Descripcion:** elimina un evento en la base de datos
- **BaseUrl:** /eventos/{id}
- **Tipo:** DELETE
- **Url Params:**
  - **id:** es el ID del registro del evento que se quiere eliminar, es de tipo numeric **(requerido)**.
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
````
http://{SERVER_URL}/eventos/3
````

### Compartir Evento
- **Descripcion:** comparte un evento en twitter.
- **BaseUrl:** /eventos/{id}/compartir
- **Tipo:** GET
````
http://{SERVER_URL}/eventos/3/compartir
````
- **Response:**
````
"Iré al evento Prueba POST Evento 2 @ 24/08/2021 09:00 http://localhost:3000/eventos/2"
````

### Search EventosFechas
- **Descripcion:** obtiene una lista de eventosFechas de la base de datos.
- **BaseUrl:** /eventosFechas
- **Tipo:** GET
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
- **Query Params:**
  - **eventoId:** es el ID de un evento particular, permite filtrar las fechas por evento. Es de tipo numeric.
  - **fromDate:** permite filtrar fechas a partir de una fecha de inicio determinada. Es de tipo date time y si se incluye, debe respetar el formato de fecha **ISO8601**.
  - **toDate:** permite filtrar fechas a partir de una fecha de fin determinada. Es de tipo date time y si se incluye, debe respetar el formato de fecha **ISO8601**.
````
http://{SERVER_URL}/eventosFechas?eventoId=2&fromDate=2021-08-24T12:00:00.000Z&toDate=2021-11-26T12:00:00.000Z
````

### Get EventosFechas by ID
- **Descripcion:** obtiene un eventoFecha de la base de datos por su clave primaria.
- **BaseUrl:** /eventosFechas/{id}
- **Tipo:** GET
- **Url Params:**
  - **id:** es el ID del eventoFecha que se quiere obtener, es de tipo numeric **(requerido)**.
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
````
http://{SERVER_URL}/eventosFechas/3
````

### Add EventoFecha
- **Descripcion:** agrega un nuevo eventoFecha a la base de datos
- **BaseUrl:** /eventosFechas
- **Tipo:** POST
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
- **Request Body:**
  - **eventoId:** es el ID del evento al que pertenece la fecha, es de tipo numeric **(requerido)**.
  - **inicio:** indica la fecha de inicio del evento, es de tipo date time y debe respetar el formato de fecha **ISO8601** **(requerido)**.
  - **fin:** indica la fecha de fin de un evento, es de tipo date time y debe respetar el formato de fecha **ISO8601** **(requerido)**.
  - **precio:** indica el precio de la entrada al evento, es de tipo numeric. Si se incluye debe ser mayor o igual a 0.
````
{
    "eventoId": 2,
    "inicio": "2021-08-26T12:00:00Z",
    "fin": "2021-07-26T12:00:00Z",
    "precio": 0
}
````

### Update EventoFecha
- **Descripcion:** actualiza un eventoFecha en la base de datos
- **BaseUrl:** /eventosFechas/{id}
- **Tipo:** PUT
- **Url Params:**
  - **id:** es el ID del eventoFecha que se quiere actualizar, es de tipo numeric **(requerido)**.
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
- **Request Body:**
  - **eventoFechaId:** es el ID del eventoFecha, es de tipo numeric y debe de coincidir con el ID pasado como parametro en la Url **(requerido)**.
  - **eventoId:** es el ID del evento al que pertenece la fecha, es de tipo numeric **(requerido)**.
  - **inicio:** indica la fecha de inicio del evento, es de tipo date time y debe respetar el formato de fecha **ISO8601** **(requerido)**.
  - **fin:** indica la fecha de fin de un evento, es de tipo date time y debe respetar el formato de fecha **ISO8601** **(requerido)**.
  - **precio:** indica el precio de la entrada al evento, es de tipo numeric. Si se incluye debe ser mayor o igual a 0.
````
http://{SERVER_URL}/eventosFechas/3
````
````
{
    "eventoFechaId": 3,
    "eventoId": 1,
    "inicio": "2021-08-24T12:00:00.000Z",
    "fin": "2021-09-26T12:00:00.000Z",
    "precio": "0",
    "created": "2021-08-05T03:40:01.000Z",
    "updated": null
}
````

### Delete EventoFecha
- **Descripcion:** elimina un eventoFecha en la base de datos
- **BaseUrl:** /eventosFechas/{id}
- **Tipo:** DELETE
- **Url Params:**
  - **id:** es el ID del eventoFecha que se quiere eliminar, es de tipo numeric **(requerido)**.
- **Headers:**
  - **Authorization:** contiene el token de autenticacion del usuario. Es de tipo **Bearer Token**.
````
http://{SERVER_URL}/eventosFechas/3
````