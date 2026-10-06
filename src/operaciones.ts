import { Tarea, EstadoTarea, DificultadTarea } from './types';

export function GestorTareas(this: any) {
    this.tareas = [];
    this.proximoId = 1;
}

GestorTareas.prototype.obtenerTodas = function(): Tarea[] {
    return this.tareas;
};

GestorTareas.prototype.obtenerPorEstado = function(estado: EstadoTarea): Tarea[] {
    return this.tareas.filter((t: Tarea) => t.estado === estado);
};

GestorTareas.prototype.buscarPorTitulo = function(clave: string): Tarea[] {
    const claveMin = clave.toLowerCase();
    return this.tareas.filter((t: Tarea) => t.titulo.toLowerCase().includes(claveMin));
};

GestorTareas.prototype.buscarPorId = function(id: number): Tarea | undefined {
    return this.tareas.find((t: Tarea) => t.id === id);
};

GestorTareas.prototype.crearTarea = function(
    titulo: string,
    descripcion?: string,
    estado: EstadoTarea = 'Pendiente',
    dificultad: DificultadTarea = 'Fácil',
    fechaVencimiento?: Date
): Tarea {
    const nueva: Tarea = {
        id: this.proximoId++,
        titulo,
        descripcion,
        estado,
        dificultad,
        fechaCreacion: new Date(),
        fechaVencimiento
    };
    this.tareas.push(nueva);
    return nueva;
};

GestorTareas.prototype.actualizarTarea = function(
    id: number,
    datos: {
        titulo?: string;
        descripcion?: string;
        estado?: EstadoTarea;
        dificultad?: DificultadTarea;
        fechaVencimiento?: Date;
    }
): boolean {
    const tarea = this.buscarPorId(id);
    if (!tarea) return false;

    if (datos.titulo !== undefined) tarea.titulo = datos.titulo;
    if (datos.descripcion !== undefined) tarea.descripcion = datos.descripcion;
    if (datos.estado !== undefined) tarea.estado = datos.estado;
    if (datos.dificultad !== undefined) tarea.dificultad = datos.dificultad;
    if (datos.fechaVencimiento !== undefined) tarea.fechaVencimiento = datos.fechaVencimiento;

    tarea.fechaEdicion = new Date();
    return true;
};