import { Request, Response } from 'express';
import { ClienteModel } from '../models/cliente.model';
import {
  esNumeroValido,
  esTextoValido
} from '../utils/validacion';

export const obtenerClientes = async (req: Request, res: Response) => {
  const clientes = await ClienteModel.obtenerTodos();

  res.json(clientes);
};

export const obtenerClientePorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const cliente = await ClienteModel.obtenerPorId(id);

  if (!cliente) {
    return res.status(404).json({
      message: 'Cliente no encontrado'
    });
  }

  res.json(cliente);
};

export const crearCliente = async (req: Request, res: Response) => {
  const { nombre, apellido, email } = req.body ?? {};

  if (!esTextoValido(nombre) || !esTextoValido(apellido) || !esTextoValido(email)) {
    return res.status(400).json({
      message: 'Los campos nombre, apellido y email son obligatorios'
    });
  }

  if (req.body.edad !== undefined && !esNumeroValido(req.body.edad)) {
    return res.status(400).json({
      message: 'El campo edad debe ser un numero'
    });
  }

  const cliente = await ClienteModel.crear(req.body);

  res.status(201).json(cliente);
};

export const actualizarCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const { nombre, apellido, email } = req.body ?? {};

  if (!esTextoValido(nombre) || !esTextoValido(apellido) || !esTextoValido(email)) {
    return res.status(400).json({
      message: 'Los campos nombre, apellido y email son obligatorios'
    });
  }

  const cliente = await ClienteModel.actualizar(id, req.body);

  if (!cliente) {
    return res.status(404).json({
      message: 'Cliente no encontrado'
    });
  }

  res.json(cliente);
};

export const eliminarCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const eliminado = await ClienteModel.eliminar(id);

  if (!eliminado) {
    return res.status(404).json({
      message: 'Cliente no encontrado'
    });
  }

  res.status(204).send();
};
