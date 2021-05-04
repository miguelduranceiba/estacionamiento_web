export class Ocupacion {

    id: number;
    idEspacio: number;
    idConductor: number;
    idVehiculo: number;
    idReserva: number;
    total: number;
    fechaInicio: Date;
    fechaFin: Date;

    constructor(
        id: number, idEspacio: number, idConductor: number, idVehiculo: number, idReserva: number,
        total: number, fechaInicio: Date, fechaFin: Date
    ) {

        this.id = id;
        this.idEspacio = idEspacio;
        this.idConductor = idConductor;
        this.idVehiculo = idVehiculo;
        this.idReserva = idReserva;
        this.total = total;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

}
