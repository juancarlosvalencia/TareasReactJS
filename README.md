# Getting Started with Create React App

Este proyecto fue diseñado y creado por Juan Carlos Valencia 

## Available Scripts

para iniciar el proyecto se debe contar con los siguientes requisitos:

### Una instalacion activa de Node.js
### la instalación de los paquetes siguientes:

- react-event-calendar
- react-datepicker
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome
- bootstrap 

### Como consideración adicional se debe ejecutar el siguiente comando en windows para que permita la ejecucion de los scripts desde visual studio code

`Set-ExecutionPolicy -Scope CurrentUser unrestricted`

### Como último punto se debe ejecutar el siguiente comando para visualizar la aplicación

### `npm start`

Una vez se inicie la aplicación se podra visualizar en la url http://localhost:3000 a travez de un navegador web

## Funcionalidad

- La aplicación cuenta con un panel a la izquierda en el cual se puede crear, eliminar, listar y actualizar el estado de las tareas.
- Cada tarea esta compuesta de Un titulo, una descripción y una fecha de vencimiento, asi mismo tiene 2 estados, Pendiente y Completado.
- todas las tareas completadas se pueden eliminar
- En el apartado derecho todas las tareas se encuentran ocultas solo se debe activar el checkbox para visualizar todas las tareas completadas
- Las acciones de crear, eliminar, listar y actualizar estan conectadas a una API Rest gratuita la cual se encuentra en https://api.restful-api.dev/objects dicha api tiene restricciones de uso por dia
- en el apartado derecho se visualiza un calendario en el cual se muestran las tareas realizadas
- la aplicación es responsive, se realizaron pruebas en firefox para validar la disposición, el funcionamiento y apariencia.
- Para el cambio de estado de pendiente a completado se usa useState asi como para diversos comportamientos.