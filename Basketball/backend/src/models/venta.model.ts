
import {
  ventasDB,
  obtenerSiguienteId
} from '../config/venta.database';

export interface Venta {
  id?: number;
  producto: string;
  cantidad: number;
  precio: number;
  total: number;
  fecha_creacion?: Date;
}

export class VentaModel {

  private static calcularTotal(
    cantidad: number,
    precio: number
  ): number {
    return cantidad * precio;
  }

  static async obtenerTodos(): Promise<Venta[]> {

    return ventasDB;
  }

  static async obtenerPorId(
    id: number
  ): Promise<Venta | null> {

    return ventasDB.find((venta) => venta.id === id) || null;
  }

  static async crear(
    venta: Venta
  ): Promise<Venta> {

    const nuevaVenta: Venta = {
      ...venta,
      id: obtenerSiguienteId(),
      total: this.calcularTotal(venta.cantidad, venta.precio),
      fecha_creacion: new Date()
    };

    ventasDB.push(nuevaVenta);

    return nuevaVenta;
  }

  static async actualizar(
    id: number,
    venta: Venta
  ): Promise<Venta | null> {

    const index = ventasDB.findIndex((ventaActual) => {
      return ventaActual.id === id;
    });

    if (index === -1) {
      return null;
    }

    const ventaActualizada: Venta = {
      ...ventasDB[index],
      ...venta,
      id,
      total: this.calcularTotal(venta.cantidad, venta.precio)
    };

    ventasDB[index] = ventaActualizada;

    return ventaActualizada;
  }

  static async eliminar(
    id: number
  ): Promise<boolean> {

    const index = ventasDB.findIndex((venta) => venta.id === id);

    if (index === -1) {
      return false;
    }

    ventasDB.splice(index, 1);

    return true;
  }
}
