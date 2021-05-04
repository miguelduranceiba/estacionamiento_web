export class Reserva {

    id: number;
    idVehiculo: number;
    idConductor: number;
    idEspacio: number;
    estado: number;
    fechaInicio: Date;
    fechaFin: Date;
    fechaCreacion: Date;

    constructor(
        id: number, idEspacio: number, idConductor: number, idVehiculo: number, estado: number,
        fechaInicio: Date, fechaFin: Date, fechaCreacion: Date
    ) {
        this.id = id;
        this.idVehiculo = idVehiculo;
        this.idConductor = idConductor;
        this.idEspacio = idEspacio;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaCreacion = fechaCreacion;
    }

}
