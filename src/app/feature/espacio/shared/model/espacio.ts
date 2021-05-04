export class Espacio {
    id: number;
    nombre: string;
    estado: number;
    idOcupacion: number;
    fechaCreacion: Date;

    constructor(id: number, nombre: string, estado: number, idOcupacion: number, fechaCreacion: Date) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.idOcupacion = idOcupacion;
        this.fechaCreacion = fechaCreacion;
    }

    public get disponible(): boolean {
        return this.estado === 1;
    }

    public get ocupado(): boolean {
        return this.estado === 0;
    }
}
