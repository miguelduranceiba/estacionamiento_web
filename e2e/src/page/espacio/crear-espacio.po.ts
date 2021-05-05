import { by, element } from "protractor";

export class CrearEspacio {

    private inputNombre = element(by.id('nombre'));
    private buttonCrear = element(by.id('crear'));

    async ingresarNombre(nombre: string) {
        await this.inputNombre.sendKeys(nombre);
    }

    async seleccionarEstadoDisponible() {
        await element(by.cssContainingText('option', 'Disponible')).click();
    }

    async clickCrear() {
        await this.buttonCrear.click();
    }

}
