
import {
  proveedoresDB,
  obtenerSiguienteId
} from '../config/proveedor.database';

export interface Proveedor {
  id?: number;
  nombre: string;
  telefono: string;
  direccion: string;
  email: string;
  fecha_creacion?: Date;
}

export class ProveedorModel {

  static async obtenerTodos(): Promise<Proveedor[]> {

    return proveedoresDB;
  }

  static async obtenerPorId(
    id: number
  ): Promise<Proveedor | null> {

    return proveedoresDB.find((proveedor) => proveedor.id === id) || null;
  }

  static async crear(
    proveedor: Proveedor
  ): Promise<Proveedor> {

    const nuevoProveedor: Proveedor = {
      ...proveedor,
      id: obtenerSiguienteId(),
      fecha_creacion: new Date()
    };

    proveedoresDB.push(nuevoProveedor);

    return nuevoProveedor;
  }

  static async actualizar(
    id: number,
    proveedor: Proveedor
  ): Promise<Proveedor | null> {

    const index = proveedoresDB.findIndex((proveedorActual) => {
      return proveedorActual.id === id;
    });

    if (index === -1) {
      return null;
    }

    const proveedorActualizado: Proveedor = {
      ...proveedoresDB[index],
      ...proveedor,
      id
    };

    proveedoresDB[index] = proveedorActualizado;

    return proveedorActualizado;
  }

  static async eliminar(
    id: number
  ): Promise<boolean> {

    const index = proveedoresDB.findIndex((proveedor) => proveedor.id === id);

    if (index === -1) {
      return false;
    }

    proveedoresDB.splice(index, 1);

    return true;
  }
}
