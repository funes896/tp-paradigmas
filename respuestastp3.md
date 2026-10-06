# Aplicando lo Aprendido 3 - Respuestas Teóricas

## Ejercicio 1: Análisis de JavaScript (POO basada en Prototipos) según Thomas Kuhn

### 1. Generalizaciones Simbólicas
Representan los componentes formales, la sintaxis y las leyes técnicas explícitas que definen el funcionamiento del modelo prototípico en JavaScript:

* **Naturaleza de los Objetos:** Un objeto es una colección dinámica y mutable de propiedades clave-valor. No se necesita definir una clase previa para crearlo; puede instanciarse directamente mediante literales (`{}`) o mediante `Object.create()`.
* **Funciones Constructoras y Operador `new`:** La instanciación de objetos con estructura compartida se realiza mediante funciones convencionales invocadas con la palabra clave `new`. El operador `new` ejecuta cuatro pasos formales:
  1. Crea un nuevo objeto vacío en memoria.
  2. Enlaza la referencia interna `[[Prototype]]` del nuevo objeto a la propiedad `.prototype` de la función constructora.
  3. Ejecuta la función constructora asociando el contexto `this` al nuevo objeto creado.
  4. Retorna dicho objeto.
* **Propiedad `prototype` vs Enlace interno `[[Prototype]]` (`__proto__`):** Toda función constructora posee por defecto una propiedad accesible llamada `.prototype`. Cada instancia creada a partir de ella hereda una referencia interna `[[Prototype]]` que apunta a ese prototipo.
* **Delegación y Cadena de Prototipos (Prototype Chain):** No existe un copiado de métodos en cada instancia. Cuando se accede a una propiedad o método que no está presente en el objeto local, el motor de ejecución recorre la cadena de prototipos hacia arriba buscando en `Object.prototype` hasta llegar a `null`.
* **Mutabilidad en Tiempo de Ejecución:** Los prototipos son objetos vivos en memoria. Cualquier método o propiedad añadido a `Constructor.prototype` durante la ejecución queda disponible de forma instantánea para todas las instancias, tanto las creadas previamente como las futuras.

### 2. Creencias de los Profesionales
Corresponden a los valores compartidos, convicciones y ventajas que la comunidad de desarrollo sostiene que este paradigma ofrece frente a la POO clásica basada en clases:

* **Flexibilidad Dinámica:** Permite alterar, extender o reparar objetos y comportamientos en tiempo de ejecución sin depender de jerarquías estáticas ni recompilaciones.
* **Delegación sobre Jerarquías Rígidas:** Se considera más natural y desacoplado delegar comportamiento entre objetos reales que diseñar pirámides complejas de herencia formal.
* **Eficiencia de Memoria:** Al alojar los métodos en el prototipo y no clonarlos dentro de cada instancia, todos los objetos comparten una única referencia en memoria.
* **Simplicidad Ontológica:** No existe la distinción dual entre "clase abstracta" y "objeto concreto". Todo parte de objetos reales que pueden servir directamente como modelo o prototipo de otros.

---

## Ejercicio 4: Justificación Teórica de Características de POO Utilizadas

Para la resolución de los Ejercicios 2 (Calculadora con Clases) y 3 (Gestor de Tareas con Prototipos), apliqué los conceptos fundamentales de la Programación Orientada a Objetos. A continuación, detallo cuáles características utilicé y cuáles no fueron necesarias según el alcance de los problemas.

### 1. Características Utilizadas

**A. Encapsulamiento**
Utilicé el encapsulamiento en ambos ejercicios para agrupar los datos y los comportamientos (métodos) que operan sobre ellos en una misma entidad, evitando tener funciones sueltas y variables globales.
* **En el Ejercicio 2 (Calculadora):** Encapsulé las cuatro operaciones matemáticas básicas dentro de la clase `Calculadora`. Además, la lógica de validación (como evitar la división por cero) quedó contenida y protegida dentro del método `dividir()`.
* **En el Ejercicio 3 (ToDo List):** Agrupé el estado de la aplicación (el array `this.tareas` y el contador `this.proximoId`) junto con todas las funciones de manipulación (`crearTarea`, `actualizarTarea`, `buscarPorId`, etc.) dentro de la función constructora `GestorTareas` y su `.prototype`. De esta forma, el menú de la consola no interactúa directamente con el array, sino a través de los métodos del gestor.

**B. Abstracción**
Apliqué la abstracción al separar la interfaz de usuario (lo que se ve en consola y los inputs) de la lógica de negocio subyacente.
* **Ejemplo:** En el Ejercicio 3, el archivo `interfaz.ts` simplemente llama a `gestor.crearTarea(titulo, descripcion, estado, dificultad)`. Al menú no le importa cómo el gestor genera el ID automático, cómo instancia la fecha de creación, o cómo hace el `push` al array interno. Toda esa complejidad está oculta (abstraída) detrás de la firma del método.

### 2. Características NO Utilizadas

**A. Herencia (Clásica o de Prototipos en cadena)**
No implementé herencia porque los dominios de los problemas planteados eran simples y planos. 
* **Por qué no fue necesario:** No existía una jerarquía de objetos. En la calculadora, solo necesitaba una calculadora estándar (no había necesidad de crear una clase base `Dispositivo` o una subclase `CalculadoraCientifica`). En la lista de tareas, todas las tareas compartían exactamente la misma estructura (tipo `Tarea`); no había distintos tipos de tareas (ej. `TareaConAlarma` o `TareaRecurrente`) que justificaran heredar comportamientos de un prototipo base hacia prototipos más específicos.

**B. Polimorfismo**
Tampoco utilicé polimorfismo en la resolución de estos programas.
* **Por qué no fue necesario:** El polimorfismo es útil cuando distintas clases o prototipos responden al mismo nombre de método pero con comportamientos diferentes (por ejemplo, si tuviéramos distintos tipos de calculadoras donde el método `calcular()` hiciera cosas distintas). En estos ejercicios, cada método tiene un único propósito lineal y no hay múltiples objetos compartiendo interfaces intercambiables.