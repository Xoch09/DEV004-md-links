### 1.- MdLinks     

Markdown es un lenguaje de marcado que facilita la aplicación de formato a un texto empleando una serie de caracteres de una forma especial. En principio, fue pensado para elaborar textos cuyo destino iba a ser la web con más rapidez y sencillez que si estuviésemos empleando directamente HTML. Y si bien ese suele ser el mejor uso que podemos darle, también podemos emplearlo para cualquier tipo de texto, independientemente de cual vaya a ser su destino. (1)

### 2.- Descripción del proyecto
Node.js es un entorno de ejecución para JavaScript, lo que permite ejecutar JavaScript en el entorno del sistema operativo, de esta forma podemos interactuar con el sistema.

En MdLinks se construyó un programa que se ejecuta usando Node.js, esta conformado por una línea de comando **(CLI)** asi como una libreria propia de JS.

El diseño de una *libreria propia*  es una gran experiencia pues logra que el desarrollador piense en la interfaz **(API)** y cómo podría ser usado por otros desarrolladores. 

### 3.- Tabla de contenido

- [1.- MdLinks](#1--mdlinks)
- [2.- Descripción del proyecto](#2--descripción-del-proyecto)
- [3.- Tabla de contenido](#3--tabla-de-contenido)
- [4.- Cómo instalar el proyecto](#4--cómo-instalar-el-proyecto)
- [5.- Cómo utilizar el proyecto](#5--cómo-utilizar-el-proyecto)
- [6. Prueba en consola](#6-prueba-en-consola)
- [7.- Referencias utilizadas](#7--referencias-utilizadas)
- [8.- Crédito](#8--crédito)


### 4.- Cómo instalar el proyecto

npm install @xoch09/md-links


### 5.- Cómo utilizar el proyecto

API <br>

Contiene la función mdLinks y las siguientes opciones <br>

*1.- Validate:false* 

href: URL encontrada.<br>
text: Texto que aparecía dentro del link (<a>).<br>
file: Ruta del archivo donde se encontró el link.<br>

*2.-Validate:true*

href: URL encontrada.<br>
text: Texto que aparecía dentro del link (<a>).<br>
file: Ruta del archivo donde se encontró el link.<br>
status: Código de respuesta HTTP.<br>
statusText: Mensaje fail,Not Found,Internal Server Error,Bad Request,Forbidden,etc en caso de fallo u ok,No Content,etc en caso de éxito. <br>

**Diagrama de flujo**<br>
![Diagrama de flujo](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/API%20final.png)<br>

CLI<br>

Tiene los parámetros<br>

path-to-file: Ruta absoluta o relativa al archivo o directorio.
<br>
options: pueden ser<br>

**--validate:** el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.<br>
**--stats:** el output (salida) será un texto con estadísticas básicas sobre los links. (total y unique)<br>
**--validate --stats:** para obtener estadísticas que necesiten de los resultados de la validación. (total, unique y broken)<br>


**Diagrama de flujo** <br>

![Diagrama de flujo](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/diagrama%20CLI.jpg)<br>


### 6. Prueba en consola

El siguiente es un ejemplo de cómo ejecutarlo.

 *node cli.js readmep.md*<br>
   ![Resultado leer archivo](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/readmedp.jpg)<br>

 *node cli.js readmep.md --validate*<br>
 ![Resultado opción validate](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/validate%20options.jpg)<br>
 
 *node cli.js readmep.md --stats*<br>
  ![Resultado opción stats](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/stats%20options.jpg)<br>

  *node cli.js readmep.md --validate --stats*
   ![Resultado opción validate stats](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/validate%2C%20stats%20options.jpg)<br>


### 7.- Referencias utilizadas<br>

👉(1) Markdown qué es: https://www.genbeta.com/guia-de-inicio/que-es-markdown-para-que-sirve-y-como-usarlo<br>
👉(2) ¿Qué es NODE?: https://www.youtube.com/watch?v=9U8EaVjuq6U&t=78s<br>
👉(3) Promesas: https://www.youtube.com/watch?v=pHBmmbDQl0o&t=280s<br>
👉(4) Asincronismo, elaborado por Xóchitl:<br> ![Entendiendo el asincronísmo](https://github.com/Xoch09/DEV004-md-links/blob/main/Imagenes/ASINCR%C3%93NISMO.jpg)<br>

### 8.- Crédito

Elaborado por Xóchitl Luna Jara, con apoyo de los couches Jorge, Génesis y en la contención y apoyo emocional Araceli.<br>

lunajarax@gmail.com <br>
https://www.linkedin.com/in/xochluja/ <br>
https://github.com/Xoch09  <br>




