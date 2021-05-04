export class Conductor {

    id: number;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaCreacion: Date;


    constructor(
        id: number, tipoIdentificacion: string, numeroIdentificacion: string, primerNombre: string,
        segundoNombre: string, primerApellido: string, segundoApellido: string, fechaCreacion: Date
    ) {

        this.id = id;
        this.tipoIdentificacion = tipoIdentificacion;
        this.numeroIdentificacion = numeroIdentificacion;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaCreacion = fechaCreacion;
    }

    public get nombreCompleto(): string {
        let nombre = this.primerNombre;
        if (this.segundoNombre) {
            nombre += ' ' + this.segundoNombre;
        }
        nombre += ' ' + this.primerApellido;
        if (this.segundoApellido) {
            nombre += ' ' + this.segundoApellido;
        }
        return nombre;
    }

}
