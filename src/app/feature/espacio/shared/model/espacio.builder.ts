import { Espacio } from './espacio';

export class EspacioBuilder {
    id: number;
    nombre: string;
    estado: number;
    idOcupacion: number;
    fechaCreacion: Date;

    constructor() {
        this.nombre = 'Espacio-1';
        this.estado = 1;
        this.fechaCreacion = new Date();
    }

    public conId(id: number): EspacioBuilder {
        this.id = id;
        return this;
    }

    public build(): Espacio {
        return new Espacio(this.id, this.nombre, this.estado, this.idOcupacion, this.fechaCreacion);
    }
}
