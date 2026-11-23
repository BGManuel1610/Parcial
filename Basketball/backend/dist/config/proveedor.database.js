"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerSiguienteId = exports.proveedoresDB = void 0;
exports.proveedoresDB = [
    {
        id: 1,
        nombre: 'Frigonel SAS',
        telefono: '3001234589',
        direccion: 'Bogota',
        email: 'gerencia@frigonel.com',
        fecha_creacion: new Date('2026-10-05T18:00:00.000Z')
    },
    {
        id: 2,
        nombre: 'surtiaves JM',
        telefono: '3109876698',
        direccion: 'Medellin',
        email: 'gerencia@surtiaves.com',
        fecha_creacion: new Date('2026-10-05T18:05:00.000Z')
    }
];
let siguienteId = exports.proveedoresDB.length + 1;
const obtenerSiguienteId = () => {
    const id = siguienteId;
    siguienteId += 1;
    return id;
};
exports.obtenerSiguienteId = obtenerSiguienteId;
//# sourceMappingURL=proveedor.database.js.map