const prompt = require("prompt-sync")();

const tareas = [];

function mostrarMenu() {
  console.log("\n--- MIS TAREAS ---");
  console.log("1. Ver mis tareas");
  console.log("2. Buscar una tarea");
  console.log("3. Agregar una tarea");
  console.log("0. Salir");
}

function agregarTarea() {
  console.log("\n--- AGREGAR UNA TAREA ---");

  // Pedir el titulo y que no este vacio
  let titulo = "";
  while (titulo.trim() === "") {
    titulo = prompt("Ingresa el titulo de la tarea: ");
    if (titulo.trim() === "") {
      console.log("Error: El titulo no puede estar vacio.");
    }
  }

  // Pedir la descripcion opcional
  const descripcion = prompt("Ingresa una descripcion (opcional): ");

  // Elegir dificultad
  console.log("Elige la dificultad de la tarea:");
  console.log("1. Facil");
  console.log("2. Media");
  console.log("3. Dificil");
  const dif = prompt("Opcion (por defecto 1): ");

  let dificultad = "Facil";
  if (dif === "2") dificultad = "Media";
  if (dif === "3") dificultad = "Dificil";

  // Armar el objeto tarea
  const tarea = {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: "Pendiente",
    dificultad: dificultad,
    createdAt: new Date().toLocaleString()
  };

  tareas.push(tarea);
  console.log("Tarea guardada con exito.\n");
}

function verTareas() {
  if (tareas.length === 0) {
    console.log("\nNo hay tareas cargadas todavia.");
    return;
  }

  console.log("\n--- QUE TAREAS QUERES VER? ---");
  console.log("1. Todas");
  console.log("2. Pendientes");
  console.log("3. En curso");
  console.log("4. Terminadas");
  console.log("0. Volver");

  const filtro = prompt("Elegi una opcion: ");
  let filtradas = [];

  if (filtro === "1") {
    filtradas = tareas;
  } else if (filtro === "2") {
    filtradas = tareas.filter(t => t.estado === "Pendiente");
  } else if (filtro === "3") {
    filtradas = tareas.filter(t => t.estado === "En Curso");
  } else if (filtro === "4") {
    filtradas = tareas.filter(t => t.estado === "Terminada");
  } else if (filtro === "0") {
    return;
  } else {
    console.log("Opcion no valida.");
    return;
  }

  if (filtradas.length === 0) {
    console.log("\nNo hay tareas para ese filtro.");
    return;
  }

  console.log("\n--- LISTADO DE TAREAS ---");
  for (let i = 0; i < filtradas.length; i++) {
    let estrellas = "★☆☆";
    if (filtradas[i].dificultad === "Media") estrellas = "★★☆";
    if (filtradas[i].dificultad === "Dificil") estrellas = "★★★";

    console.log(`[${i + 1}] ${filtradas[i].titulo} (${filtradas[i].estado}) - Dificultad: ${estrellas}`);
  }

  const elegida = prompt("\nIngresa el numero de tarea para ver detalle (o 0 para volver): ");
  const indice = parseInt(elegida, 10) - 1;

  if (elegida !== "0" && !isNaN(indice) && indice >= 0 && indice < filtradas.length) {
    verDetalleTarea(filtradas[indice]);
  }
}

function buscarTarea() {
  if (tareas.length === 0) {
    console.log("\nNo hay tareas cargadas para buscar.");
    return;
  }

  console.log("\n--- BUSCAR TAREA ---");
  const texto = prompt("Ingresa el titulo o parte del titulo a buscar: ");

  if (texto.trim() === "") {
    console.log("No ingresaste nada para buscar.");
    return;
  }

  const encontradas = tareas.filter(t => 
    t.titulo.toLowerCase().includes(texto.toLowerCase().trim())
  );

  if (encontradas.length === 0) {
    console.log(`\nNo se encontraron tareas con: "${texto}"`);
    return;
  }

  console.log("\n--- TAREAS ENCONTRADAS ---");
  for (let i = 0; i < encontradas.length; i++) {
    let estrellas = "★☆☆";
    if (encontradas[i].dificultad === "Media") estrellas = "★★☆";
    if (encontradas[i].dificultad === "Dificil") estrellas = "★★★";

    console.log(`[${i + 1}] ${encontradas[i].titulo} (${encontradas[i].estado}) - Dificultad: ${estrellas}`);
  }

  const elegida = prompt("\nIngresa el numero de tarea para ver detalle (o 0 para volver): ");
  const indice = parseInt(elegida, 10) - 1;

  if (elegida !== "0" && !isNaN(indice) && indice >= 0 && indice < encontradas.length) {
    verDetalleTarea(encontradas[indice]);
  }
}

function verDetalleTarea(tarea) {
  console.log("\n--- DETALLES DE LA TAREA ---");
  console.log("Titulo:      ", tarea.titulo);
  console.log("Descripcion: ", tarea.descripcion || "Sin datos");
  console.log("Estado:      ", tarea.estado);
  console.log("Dificultad:  ", tarea.dificultad);
  console.log("Creacion:    ", tarea.creacion || tarea.createdAt || "Sin datos");

  const accion = prompt("\nPresiona 'E' para editar o '0' para volver: ");
  if (accion.toUpperCase() === "E") {
    editarTarea(tarea);
  }
}

function editarTarea(tarea) {
  console.log("\n--- EDITAR TAREA (Enter para mantener el valor actual) ---");

  const nuevoTitulo = prompt(`Titulo [${tarea.titulo}]: `);
  if (nuevoTitulo.trim() !== "") {
    tarea.titulo = nuevoTitulo.trim();
  }

  const nuevaDesc = prompt(`Descripcion [${tarea.descripcion || "Vacio"}]: `);
  if (nuevaDesc !== "") {
    tarea.descripcion = nuevaDesc.trim();
  }

  console.log("Estado actual: " + tarea.estado);
  console.log("1. Pendiente | 2. En Curso | 3. Terminada | 4. Cancelada");
  const nuevoEst = prompt("Elegi nuevo estado (o Enter para dejar igual): ");
  if (nuevoEst === "1") tarea.estado = "Pendiente";
  if (nuevoEst === "2") tarea.estado = "En Curso";
  if (nuevoEst === "3") tarea.estado = "Terminada";
  if (nuevoEst === "4") tarea.estado = "Cancelada";

  console.log("Dificultad actual: " + tarea.dificultad);
  console.log("1. Facil | 2. Media | 3. Dificil");
  const nuevaDif = prompt("Elegi nueva dificultad (o Enter para dejar igual): ");
  if (nuevaDif === "1") tarea.dificultad = "Facil";
  if (nuevaDif === "2") tarea.dificultad = "Media";
  if (nuevaDif === "3") tarea.dificultad = "Dificil";

  console.log("Tarea actualizada con exito.");
}

function iniciarApp() {
  let salir = false;

  while (!salir) {
    mostrarMenu();
    const opcion = prompt("Que queres hacer?: ");

    switch (opcion) {
      case "1":
        verTareas();
        break;
      case "2":
        buscarTarea();
        break;
      case "3":
        agregarTarea();
        break;
      case "0":
        console.log("Chau!");
        salir = true;
        break;
      default:
        console.log("Opcion invalida, manda 1, 2, 3 o 0.");
        break;
    }
  }
}

// Arranca el programa al final de todo
iniciarApp();