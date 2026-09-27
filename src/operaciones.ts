import { Tarea, EstadoTarea, DificultadTarea } from './types';

let tareas: Tarea[] = [];
let proximoId: number = 1;

export function obtenerTodas(): Tarea[] {
  return tareas;
}

export function obtenerPorEstado(estado: EstadoTarea): Tarea[] {
  return tareas.filter((t) => t.estado === estado);
}

export function buscarPorTitulo(clave: string): Tarea[] {
  const claveMin = clave.toLowerCase();
  return tareas.filter((t) => t.titulo.toLowerCase().includes(claveMin));
}

export function buscarPorId(id: number): Tarea | undefined {
  return tareas.find((t) => t.id === id);
}

export function crearTarea(
  titulo: string,
  descripcion?: string,
  estado: EstadoTarea = 'Pendiente',
  dificultad: DificultadTarea = 'Fácil',
  fechaVencimiento?: Date
): Tarea {
  const nueva: Tarea = {
    id: proximoId++,
    titulo,
    descripcion,
    estado,
    dificultad,
    fechaCreacion: new Date(),
    fechaVencimiento
  };
  tareas.push(nueva);
  return nueva;
}

export function actualizarTarea(
  id: number,
  datos: {
    titulo?: string;
    descripcion?: string;
    estado?: EstadoTarea;
    dificultad?: DificultadTarea;
    fechaVencimiento?: Date;
  }
): boolean {
  const tarea = buscarPorId(id);
  if (!tarea) return false;

  if (datos.titulo !== undefined) tarea.titulo = datos.titulo;
  if (datos.descripcion !== undefined) tarea.descripcion = datos.descripcion;
  if (datos.estado !== undefined) tarea.estado = datos.estado;
  if (datos.dificultad !== undefined) tarea.dificultad = datos.dificultad;
  if (datos.fechaVencimiento !== undefined) tarea.fechaVencimiento = datos.fechaVencimiento;

  tarea.fechaEdicion = new Date();
  return true;
}