# Burger Queen

## Índice

- [1. Introducción]()
- [2. Resumen del proyecto]()
- [3. Consideraciones técnicas ]()
- [4. Definición del producto]()
- [5. Despliegue]()
- [6. Autoras]()

---

## 1. Introducción

Aplicación web para restaurante de makis, donde se toma pedidos a través de una tablet y enviarlos a cocina para que se preparen de forma ordenada y eficiente. El proyecto consta de la interfaz (cliente) y se trabajó con Firebase como base de datos para las cuentas y pedidos realizados.

## 2. Resumen del proyecto

Makis Queen es un plataforma para la gestión de pedidos, con vistas para los siguientes roles: chef y mesero. El objetivo es brindar una herramienta con la(s) funcionalidad(es) requeridas.

Consta de una vista inicial para el ingreso a la plataforma con su respectivo correo. En el caso de nuestra plataforma se usaron dos correo:

- chef@makisqueen.com
- waiter@makisqueen.com

Ambos con la siguiente contraseña: 123456.

Para el rol de mesero tenemos la vista: Place Order, en la que podemos hacer el filtrado del tipo de menú disponible, así como un carrito de compra al costado del menú para mejorar la visualización del resumen de la orden. En el cual podemos agregar un producto, editar la cantidad de este y/o eliminarlo. De la misma forma, podemos agregar el nombre del cliente y la mesa respectiva ello para poder guardar el pedido. Como plus adicional podemos observar el subtotal, igv y el total del pedido a medida que vamos modificándolo.
El mesero cuenta con otra vista disponible: Order Status, en la cual puede observar el estado de los pedidos que se hayan realizado, de la misma forma puede escoger ver todos los pedidos en general, los listos para servir y los ya entregados.

Para el rol de chef contamos con la vista Order Status, la diferencia con respecto a la del mesero es un menu en el que podemos modificar el estado de los pedidos.

## 3. Consideraciones técnicas

### 3.1. Tecnologías empleadas

- <a href="https://angular.io/">Angular</a>
- <a href="https://www.typescriptlang.org/">TypeScript</a>
- <a href="https://firebase.google.com/docs?authuser=0&hl=es">Firebase</a>
- <a href="https://getbootstrap.com/docs/5.1/getting-started/introduction/">Bootstrap</a> 
- <a href="https://sass-lang.com/documentation">SASS</a>
- <a href="https://www.netlify.com/">Netlify</a>

## 4. Definición del producto

---

![imagen1](./my-app/src/assets/img/1.png)

---

## ![imagen2](./my-app/src/assets/img/2.png)

![imagen3](./my-app/src/assets/img/3.png)

---

## 5. Ejecución del proyecto

### 5.1. Diseño

Integramos ATOMIC DESIGN como metodología de diseño del producto, esto nos permite verificar que cada elemento de la interfaz debe funcionar tanto de manera individual como en conjunto. Para llevar a cabo el desarrollo de los prototipos bajo esta metodología elegimos la herramienta FIGMA.

### 5.2. Prototipos

#### 5.2.1. Prototipo baja fidelidad

![imagen4](./my-app/src/assets/img/prototipo_baja_fidelidad.PNG)

#### 5.2.2. Prototipo alta fidelidad

![imagen5](./my-app/src/assets/img/prototipo_alta_fidelidad.PNG)

## 6. Despliegue

Para el despliegue de nuestra aplicación utilizamos NETLIFY el cual te permite crear, alojar y mantener tu sitio web con implementación continua.

[AppDesplegada]()

## 7. Autoras

### Luz Torres Villavicencio

  * <code><a href = "https://www.linkedin.com/in/luz-elanny-torres-villavicencio-590745183/"> <img height="30" src="https://img.icons8.com/fluent/48/000000/linkedin.png"/></a></code>

  * <code><a href = "https://github.com/ElannyTorres"> <img height="30" src="https://icones.pro/wp-content/uploads/2021/06/icone-github-grise.png"/> </a></code>
  
  


### Pilar Rivera Romero

 * <code><a href = "https://www.linkedin.com/in/pilar-rivera-romero/"> <img height="30" src="https://img.icons8.com/fluent/48/000000/linkedin.png"/> </a></code>

  * <code><a href = "https://github.com/MopiRiro"> <img height="30" src="https://icones.pro/wp-content/uploads/2021/06/icone-github-grise.png"/> </a></code>
  
  

