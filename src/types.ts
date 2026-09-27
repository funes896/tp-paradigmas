export type EstadoTarea = 'Pendiente' | 'En Curso' | 'Terminada' | 'Cancelada';
export type DificultadTarea = 'Fácil' | 'Medio' | 'Difícil';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: EstadoTarea;
  dificultad: DificultadTarea;
  fechaCreacion: Date;
  fechaEdicion?: Date;
  fechaVencimiento?: Date;
}