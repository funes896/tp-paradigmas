import promptSync from 'prompt-sync';
import { GestorTareas } from './operaciones';
import { Tarea, EstadoTarea, DificultadTarea } from './types';

const prompt = promptSync({ sigint: true });
const gestor: any = new (GestorTareas as any)();

function formatearDificultad(dificultad: DificultadTarea): string {
  switch (dificultad) {
    case 'Fácil': return '★☆☆ (Fácil)';
    case 'Medio': return '★★☆ (Medio)';
    case 'Difícil': return '★★★ (Difícil)';
  }
}

function mostrarDetalle(tarea: Tarea): void {
  console.log('\n--- DETALLES DE LA TAREA ---');
  console.log(`ID:          ${tarea.id}`);
  console.log(`Título:      ${tarea.titulo}`);
  console.log(`Descripción: ${tarea.descripcion ?? 'Sin datos'}`);
  console.log(`Estado:      ${tarea.estado}`);
  console.log(`Dificultad:  ${formatearDificultad(tarea.dificultad)}`);
  console.log(`Creación:    ${tarea.fechaCreacion.toLocaleString()}`);
  console.log(`Últ. Edición:${tarea.fechaEdicion ? tarea.fechaEdicion.toLocaleString() : 'Sin modificaciones'}`);
  console.log(`Vencimiento: ${tarea.fechaVencimiento ? tarea.fechaVencimiento.toLocaleDateString() : 'Sin datos'}`);
  console.log('----------------------------\n');
}

function editarTareaMenu(tarea: Tarea): void {
  console.log('\n--- EDITAR TAREA (Enter para no modificar) ---');

  const nuevoTitulo = prompt(`Título [${tarea.titulo}]: `);
  const nuevaDesc = prompt(`Descripción [${tarea.descripcion ?? 'vacío'}]: `);

  console.log('1. Pendiente | 2. En Curso | 3. Terminada | 4. Cancelada');
  const opcEstado = prompt('Estado: ');
  let nuevoEstado: EstadoTarea | undefined;
  if (opcEstado === '1') nuevoEstado = 'Pendiente';
  else if (opcEstado === '2') nuevoEstado = 'En Curso';
  else if (opcEstado === '3') nuevoEstado = 'Terminada';
  else if (opcEstado === '4') nuevoEstado = 'Cancelada';

  console.log('1. Fácil | 2. Medio | 3. Difícil');
  const opcDif = prompt('Dificultad: ');
  let nuevaDif: DificultadTarea | undefined;
  if (opcDif === '1') nuevaDif = 'Fácil';
  else if (opcDif === '2') nuevaDif = 'Medio';
  else if (opcDif === '3') nuevaDif = 'Difícil';

  gestor.actualizarTarea(tarea.id, {
    titulo: nuevoTitulo.trim() !== '' ? nuevoTitulo : undefined,
    descripcion: nuevaDesc.trim() !== '' ? nuevaDesc : undefined,
    estado: nuevoEstado,
    dificultad: nuevaDif
  });

  console.log('¡Tarea actualizada con éxito!');
}

function subMenuDetalle(tarea: Tarea): void {
  mostrarDetalle(tarea);
  const accion = prompt('Presiona [E] para editar la tarea o [Enter] para volver: ');
  if (accion.trim().toUpperCase() === 'E') {
    editarTareaMenu(tarea);
  }
}

function listarYSeleccionar(lista: Tarea[]): void {
  if (lista.length === 0) {
    console.log('\nNo se encontraron tareas.');
    return;
  }

  console.log('\n--- LISTADO DE TAREAS ---');
  lista.forEach((t) => {
    console.log(`[${t.id}] ${t.titulo} (${t.estado}) - ${formatearDificultad(t.dificultad)}`);
  });

  const seleccion = prompt('Ingresa el número de tarea para ver detalles (o Enter para volver): ');
  const numId = parseInt(seleccion, 10);

  if (!isNaN(numId)) {
    const tarea = lista.find((t) => t.id === numId);
    if (tarea) {
      subMenuDetalle(tarea);
    } else {
      console.log('Número de tarea inválido.');
    }
  }
}

export function menuVerTareas(): void {
  console.log('\n--- VER TAREAS ---');
  console.log('1. Ver todas');
  console.log('2. Ver Pendientes');
  console.log('3. Ver En Curso');
  console.log('4. Ver Terminadas');
  console.log('0. Volver al menú principal');

  const opc = prompt('Elige una opción: ');
  switch (opc) {
    case '1':
      listarYSeleccionar(gestor.obtenerTodas());
      break;
    case '2':
      listarYSeleccionar(gestor.obtenerPorEstado('Pendiente'));
      break;
    case '3':
      listarYSeleccionar(gestor.obtenerPorEstado('En Curso'));
      break;
    case '4':
      listarYSeleccionar(gestor.obtenerPorEstado('Terminada'));
      break;
    case '0':
      break;
    default:
      console.log('Opción inválida.');
  }
}

export function menuBuscarTarea(): void {
  console.log('\n--- BUSCAR TAREA ---');
  const clave = prompt('Introduce palabra clave del título: ');
  if (clave.trim() === '') {
    console.log('Búsqueda cancelada.');
    return;
  }
  const resultados = gestor.buscarPorTitulo(clave);
  listarYSeleccionar(resultados);
}

export function menuAgregarTarea(): void {
  console.log('\n--- AGREGAR TAREA ---');
  const titulo = prompt('Título: ');
  if (!titulo || titulo.trim() === '') {
    console.log('El título no puede estar vacío.');
    return;
  }

  const descripcion = prompt('Descripción (opcional): ');

  console.log('Elige dificultad: 1. Fácil | 2. Medio | 3. Difícil (por defecto 1)');
  const opcDif = prompt('> ');
  let dificultad: DificultadTarea = 'Fácil';
  if (opcDif === '2') dificultad = 'Medio';
  else if (opcDif === '3') dificultad = 'Difícil';

  gestor.crearTarea(
    titulo.trim(),
    descripcion.trim() !== '' ? descripcion.trim() : undefined,
    'Pendiente',
    dificultad
  );

  console.log('¡Tarea creada con éxito!');
}