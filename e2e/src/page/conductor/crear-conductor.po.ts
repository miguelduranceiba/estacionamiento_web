import { by, element } from 'protractor';

export class CrearConductor {
    private inputTipoIdentificacion = element(by.id('tipoIdentificacion'));
    private inputNumeroIdentificacion = element(by.id('numeroIdentificacion'));
    private inputPrimerNombre = element(by.id('primerNombre'));
    private inputSegundoNombre = element(by.id('segundoNombre'));
    private inputPrimerApellido = element(by.id('primerApellido'));
    private inputSegundoApellido = element(by.id('segundoApellido'));
    private botonAtras = element(by.id('atras'));
    private botonCrear = element(by.id('crear'));


    set inputTipoIdentificacionValue(inputTipoIdentificacion: string) {
        this.inputTipoIdentificacion.sendKeys(inputTipoIdentificacion);
    }
    set inputNumeroIdentificacionValue(inputNumeroIdentificacion: string) {
        this.inputNumeroIdentificacion.sendKeys(inputNumeroIdentificacion);
    }
    set inputPrimerNombreValue(inputPrimerNombre: string) {
        this.inputPrimerNombre.sendKeys(inputPrimerNombre);
    }
    set inputSegundoNombreValue(inputSegundoNombre: string) {
        this.inputSegundoNombre.sendKeys(inputSegundoNombre);
    }
    set inputPrimerApellidoValue(inputPrimerApellido: string) {
        this.inputPrimerApellido.sendKeys(inputPrimerApellido);
    }
    set inputSegundoApellidoValue(inputSegundoApellido: string) {
        this.inputSegundoApellido.sendKeys(inputSegundoApellido);
    }

    async clickBotonAtras() {
        await this.botonAtras.click();
    }

    async clickBotonCrear() {
        await this.botonCrear.click();
    }

}
