# Tasker App ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)

Aplicaci贸n de productividad

[DEMO](https://tasker-application.herokuapp.com/)

## Comenzando 馃殌

_Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas._

### Pre-requisitos 馃搵

* Node JS >=14.17.4
* Yarn >=1.22.16
* Npm >=7.20.3


## Instalaci贸n 馃敡

1. Clona este proyecto
2. Ve a la carpeta del proyecto `cd tasker-app`
3. Instala las dependencias `yarn add`
4. Corre el ambiente local `yarn run dev`
5. Corre el servidor de prueba `yarn run server` -> inicializa el servidor

```
yarn run dev | Inicializa por defecto la aplicaci贸n en el puerto 3000
```

## Base de Datos 馃摫
Todos los datos son almacenados en un archivo `db.json` y es controlado por `json-server` el cual cumple el rol de un API Rest Ful

```
yarn run server | Inicializa por defecto el servidor en el puerto 3001
```

```
yarn run seed | Genera 50 tareas aleatorias, completadas consumiendo entre el 80% y el 100% de su duraci贸n
```


## Autor 鉁掞笍
**Paulo Martinez** - *Trabajo Inicial* - [paulonner](https://github.com/paulonner)

## 馃Ь License
The MIT License (MIT)