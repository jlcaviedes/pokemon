# Tecnologias utilizadas

- Vue.js version 3
- vue-router para manejar las rutas de la aplicación
- npm install pinia para el manejador de estados

- Primero revise el diseño del sitio web, entendiendo el flujo.
- Segundo construir las vista pero vacias y router con su navegacion
- tercero construi la vista mas influyecte que era optener el listado de los pokemones, no importaba si traia solo los 20 primero
- cuarto cree una tarjeta que muestra la informacion del pokemon basica
- quito agregue el flujo de los favoritos, extrañendo los iconos e images de figma
- sexto cree la vista de los detalle del pokemon
- sectimo cree las vista de informacion y alertas, ya se para reintentar
- octavo cree la vista de construcion como la de region y perfil
- noveno cree el component de filtro y validar si realizaba los filtro y cuando lo borra
- decimo ajuste stylos de las tarjetas, layouts, views y demas components que sea lo mas fiel al diseño de figma

La applicacion tiene un store pinia que guarda los pokemones y los tipos.
Tambien carga los pokemones cuando realiza el scroll y no todo una sola vez, porque demoraria la carga del app, es como lazy load. 

En el local store guarda el onbording por primera vez, para no mostrar nuevamente

Tome los gif de los pokemones para que se vea mas animado.

Tambien me apoye en la IA, pidiendo ciertos elemento o preguntado cualquier duda como por ejemplo:

- que me diera los colores claros y oscuro con respecto a tipo de pokemones, ya que en el diseño solo pude visualizar 2 tipos colores.

- Tuve la limitacion del diseño de figma como images de Hoja y Fuego.


# TODO:
- lo que tengo pensado hacer es las traduciones, para poder usarlo en otros idiomas.
- agregar los unit tests.
