import promptSync from 'prompt-sync';
import { menuVerTareas, menuBuscarTarea, menuAgregarTarea } from './interfaz';

const prompt = promptSync({ sigint: true });

function iniciarApp(): void {
  let salir = false;

  while (!salir) {
    console.log('\n=============================');
    console.log('      LISTA DE TAREAS        ');
    console.log('=============================');
    console.log('1. Ver mis tareas');
    console.log('2. Buscar una tarea');
    console.log('3. Agregar una tarea');
    console.log('0. Salir');

    const opcion = prompt('¿Qué deseas hacer?: ');

    switch (opcion) {
      case '1':
        menuVerTareas();
        break;
      case '2':
        menuBuscarTarea();
        break;
      case '3':
        menuAgregarTarea();
        break;
      case '0':
        console.log('¡Hasta luego!');
        salir = true;
        break;
      default:
        console.log('Opción inválida. Ingresa 1, 2, 3 o 0.');
        break;
    }
  }
}

iniciarApp();