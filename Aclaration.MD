#### Introducción
Este documento detalla las concesiones realizadas durante el desarrollo del proyecto de tienda web, que incluye un catálogo de productos y un carrito de compras implementado con React (Frontend) y .Net Core (Backend). Las concesiones se debieron principalmente a limitaciones de tiempo y familiaridad con algunas de las tecnologías requeridas.

#### Concesiones y Aclaraciones del Proyecto

1. **Paginación**:
   - La implementación de la paginación se realizó completamente en el backend. Debido a restricciones de tiempo y a que la paginación en el frontend era un concepto nuevo para mí, no se logró implementar completamente en el lado del cliente.

2. **Interfaz del Carrito**:
   - En lugar de utilizar un campo de entrada (input) para definir la cantidad de productos a agregar al carrito, se optó por botones que incrementan o decrementan la cantidad de uno en uno. 
   - Esta decisión asegura que la cantidad no sea menor a uno, ya que el botón de decremento se desactiva cuando la cantidad es uno. De igual manera, el botón de incremento se desactiva cuando la cantidad alcanza el límite de stock disponible, evitando así superar el inventario.

3. **CRUD de Tablas**:
   - Aunque inicialmente se planeó implementar funcionalidades CRUD completas para usuarios, categorías, productos y órdenes, solo se logró preparar la infraestructura necesaria en el backend. La implementación completa no fue posible dentro del tiempo asignado para la prueba.

#### Validaciones Adicionales

- **Validación de Cliente**:
  - No se permite agregar productos al carrito sin antes validar la existencia del cliente mediante su correo electrónico. Esto asegura que todos los pedidos estén asociados a un cliente existente, de la misma manera una vez validado el usuario mostrará en pantalla, EMAIL, NOMBRE Y APELLIDO.

- **Notificaciones**:
  - Se implementaron notificaciones push para informar al usuario sobre respuestas de la API y manejar errores de forma proactiva desde el frontend.

- **Confirmación de Pedido**:
  - Al finalizar un pedido, se muestra un mensaje que lista todos los productos agregados al carrito, proporcionando un resumen claro de la compra realizada.

#### Consideraciones Generales

- **Idioma**:
  - Todo el código y las variables se implementaron en inglés para mantener la consistencia y asegurar la claridad en un entorno de desarrollo global.

- **Configuración de la Base de Datos**:
  - Las conexiones a la base de datos están preparadas para funcionar en dos ambientes: desarrollo (DEV) y producción (PROD), facilitando la configuración y el despliegue del API en diferentes entornos.

#### Conclusión

A pesar de las concesiones realizadas, se cumplió con la mayoría de los requisitos exigidos para el proyecto. Las adaptaciones realizadas fueron pensadas para maximizar la funcionalidad y la eficiencia del sistema bajo las restricciones de tiempo y conocimiento técnico actuales. Este documento sirve como una guía transparente sobre las decisiones de diseño y desarrollo que influenciaron la versión final del proyecto.