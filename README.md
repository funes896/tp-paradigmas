                # Aplicando lo Aprendido 2 — Paradigmas de Programación

## Ejercicio 1: Análisis de TypeScript en Programación Estructurada (Kuhn)

### 1. Generalización Simbólica: ¿Cuáles son las reglas escritas del lenguaje?
Al limitar TypeScript estrictamente al paradigma de **programación estructurada** (prescindiendo de clases, interfaces como contratos de objetos, herencia y polimorfismo propio de OOP), las reglas formales compartidas por la comunidad abarcan:

* **Estructuras de Control de Flujo Clásicas:**
  * **Secuencia:** Ejecución lineal de sentencias delimitadas por saltos de línea o punto y coma.
  * **Selección (Bifurcación):** Condicionales `if`, `else if`, `else` y sentencias `switch` para evaluar flujos lógicos.
  * **Iteración:** Ciclos determinados e indeterminados (`for`, `while`, `do...while`).
* **Abstracción Procedural (Subprogramas):**
  * Modularización de lógica mediante funciones puras y procedimientos declarados con `function` o funciones flecha (`const fn = () => ...`).
  * Delimitación estricta de ámbitos (*scope*) de bloque utilizando `{}` y variables locales mediante `const` y `let` (descartando `var`).
* **Reglas de Tipado Estático:**
  * Declaración explícita de tipos primitivos (`number`, `string`, `boolean`, `Date`).
  * Modelado de datos estructurados mediante `type` e `interface` para definir esquemas rígidos de datos sin incorporar métodos.
  * Firmas de funciones formales: tipado estricto en parámetros de entrada y valores de retorno (`(param: Tipo): TipoRetorno`).
* **Verificación Formal en Tiempo de Compilación:**
  * Reglas semánticas impuestas por el compilador (`tsc`) que verifican la compatibilidad estricta de tipos antes de generar código ejecutable.

### 2. Creencias de los Profesionales: ¿Qué características particulares del lenguaje se cree que sean "mejores" que en otros lenguajes?
* **Detección Temprana de Errores (Compile-time vs. Runtime):** La comunidad asume que atrapar errores de tipo durante la compilación reduce drásticamente fallas en producción en comparación con lenguajes de tipado dinámico como JavaScript puro.
* **Autodocumentación y Claridad Semántica:** El uso de interfaces y tipos explícitos hace que los contratos de datos y funciones sean evidentes sin depender exclusivamente de documentación externa.
* **Refactorización Segura y Soporte de Herramientas:** Se valora fuertemente la precisión que el sistema de tipos brinda al autocompletado (*IntelliSense*), a la navegación por definiciones y al mantenimiento de proyectos medianos o grandes.
* **Tipado Estático sin Pérdida del Ecosistema:** A diferencia de lenguajes tradicionales de tipado estricto como C o Java, los desarrolladores aprecian que TypeScript conserve la flexibilidad, sintaxis y el ecosistema de librerías de Node.js/npm.

---

## Ejercicio 2: ToDo List en TypeScript Estructurado

### Justificación de Abstracción y Modularización
* **Abstracción de Datos (`src/types.ts`):** Modela la entidad `Tarea` mediante una `interface`, unificando estados y dificultades mediante tipos literales (`EstadoTarea` y `DificultadTarea`).
* **Abstracción Procedural y Lógica de Negocio (`src/operaciones.ts`):** Gestiona la colección de tareas en memoria (`crearTarea`, `actualizarTarea`, `buscarPorTitulo`, `obtenerPorEstado`) de forma pura, sin interactuar con la consola.
* **Módulo de Interfaz (`src/interfaz.ts`):** Centraliza la interacción por consola con el usuario (menús interactivos, formato de dificultades con estrellas `★☆☆` y capturas con `prompt-sync`).
* **Módulo Principal (`src/index.ts`):** Controla el bucle de ejecución principal (`while`) y el menú de navegación (`switch`).