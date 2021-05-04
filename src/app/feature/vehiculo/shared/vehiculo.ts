
export class Vehiculo {

    id: number;
    placa: string;
    tipoVehiculo: string;
    fechaCreacion: Date;

    constructor(id: number, placa: string, tipoVehiculo: string, fechaCreacion: Date) {

        this.id = id;
        this.placa = placa;
        this.tipoVehiculo = tipoVehiculo;
        this.fechaCreacion = fechaCreacion;
    }

}
