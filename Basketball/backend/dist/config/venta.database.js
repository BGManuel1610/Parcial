"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerSiguienteId = exports.ventasDB = void 0;
exports.ventasDB = [
    {
        id: 1,
        producto: 'Carne',
        cantidad: 2,
        precio: 16000,
        total: 32000,
        fecha_creacion: new Date('2026-10-05T18:00:00.000Z')
    },
    {
        id: 2,
        producto: 'Pollo',
        cantidad: 3,
        precio: 8000,
        total: 32000,
        fecha_creacion: new Date('2026-10-05T18:05:00.000Z')
    }
];
let siguienteId = exports.ventasDB.length + 1;
const obtenerSiguienteId = () => {
    const id = siguienteId;
    siguienteId += 1;
    return id;
};
exports.obtenerSiguienteId = obtenerSiguienteId;
//# sourceMappingURL=venta.database.js.map