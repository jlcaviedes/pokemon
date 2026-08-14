# Tecnologías utilizadas

- Vue.js versión 3
- Vue Router para manejar las rutas de la aplicación
- Pinia para el manejo del estado global

# Proceso de desarrollo

1. **Revisión del diseño**
   - Primero revisé el diseño del sitio web para entender el flujo de la aplicación.

2. **Construcción de vistas y navegación**
   - Construí las vistas inicialmente vacías.
   - Configuré Vue Router y la navegación entre las diferentes vistas.

3. **Listado de Pokémon**
   - Construí la vista principal de la Pokédex.
   - Implementé la obtención del listado de Pokémon desde la API.
   - Inicialmente se cargan los primeros 20 Pokémon.

4. **Tarjeta de Pokémon**
   - Creé el componente de tarjeta para mostrar la información básica de cada Pokémon.

5. **Sistema de favoritos**
   - Implementé el flujo para agregar y eliminar Pokémon de favoritos.
   - Extraje los iconos e imágenes proporcionados en Figma.

6. **Detalle del Pokémon**
   - Creé la vista de detalle con información más completa del Pokémon.

7. **Vistas de información y alertas**
   - Implementé vistas y componentes para mostrar información, errores y opciones para reintentar las solicitudes.

8. **Vistas en construcción**
   - Creé las vistas que todavía no tienen funcionalidad, como:
     - Regiones
     - Perfil

9. **Filtro de Pokémon**
   - Creé el componente de filtros.
   - Implementé la selección de tipos.
   - Validé la aplicación de filtros y la eliminación de los mismos.

10. **Ajustes visuales**
    - Ajusté los estilos de:
      - Tarjetas
      - Layouts
      - Vistas
      - Componentes
    - El objetivo fue mantener la implementación lo más fiel posible al diseño proporcionado en Figma.

# Arquitectura y funcionalidades

## Pinia

La aplicación utiliza **Pinia** para manejar el estado global.

Actualmente el store administra principalmente:

- Pokémon cargados.
- Tipos de Pokémon.
- Estado relacionado con la carga de información.

## Carga progresiva de Pokémon

Los Pokémon no se cargan todos de una sola vez.

La aplicación utiliza un mecanismo de **infinite scroll**, cargando nuevos Pokémon conforme el usuario se desplaza por la lista.

Esto evita realizar una solicitud demasiado grande al iniciar la aplicación y permite que el contenido se cargue progresivamente.

```text
Inicio
  ↓
Pokémon 1 - 20
  ↓
Scroll
  ↓
Pokémon 21 - 40
  ↓
Scroll
  ↓
Pokémon 41 - 60
  ↓
...
```

## Unit Test

carga a la list of pokemones

# TODO

Las siguientes funcionalidades están pendientes:

 - Implementar traducciones para soportar diferentes idiomas.
 
 - Continuar mejorando detalles visuales y de UX según sea necesario.