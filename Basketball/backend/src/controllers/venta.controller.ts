import { Request, Response } from 'express';
import { VentaModel } from '../models/venta.model';
import {
  esNumeroValido,
  esTextoValido
} from '../utils/validacion';

export const obtenerVentas = async (req: Request, res: Response) => {
  const ventas = await VentaModel.obtenerTodos();

  res.json(ventas);
};

export const obtenerVentaPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const venta = await VentaModel.obtenerPorId(id);

  if (!venta) {
    return res.status(404).json({
      message: 'Venta no encontrada'
    });
  }

  res.json(venta);
};

export const crearVenta = async (req: Request, res: Response) => {
  const { producto, cantidad, precio } = req.body ?? {};

  if (!esTextoValido(producto)) {
    return res.status(400).json({
      message: 'El campo producto es obligatorio'
    });
  }

  if (!esNumeroValido(cantidad) || cantidad <= 0) {
    return res.status(400).json({
      message: 'El campo cantidad debe ser un numero mayor que cero'
    });
  }

  if (!esNumeroValido(precio) || precio < 0) {
    return res.status(400).json({
      message: 'El campo precio debe ser un numero mayor o igual a cero'
    });
  }

  const venta = await VentaModel.crear(req.body);

  res.status(201).json(venta);
};

export const actualizarVenta = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const { producto, cantidad, precio } = req.body ?? {};

  if (!esTextoValido(producto)) {
    return res.status(400).json({
      message: 'El campo producto es obligatorio'
    });
  }

  if (!esNumeroValido(cantidad) || cantidad <= 0) {
    return res.status(400).json({
      message: 'El campo cantidad debe ser un numero mayor que cero'
    });
  }

  if (!esNumeroValido(precio) || precio < 0) {
    return res.status(400).json({
      message: 'El campo precio debe ser un numero mayor o igual a cero'
    });
  }

  const venta = await VentaModel.actualizar(id, req.body);

  if (!venta) {
    return res.status(404).json({
      message: 'Venta no encontrada'
    });
  }

  res.json(venta);
};

export const eliminarVenta = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const eliminado = await VentaModel.eliminar(id);

  if (!eliminado) {
    return res.status(404).json({
      message: 'Venta no encontrada'
    });
  }

  res.status(204).send();
};
