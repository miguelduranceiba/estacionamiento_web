import { by, element } from "protractor";

export class ActualizarEspacio {

    private inputNombre = element(by.id('nombre'));
    private buttonActualizar = element(by.id('actualizar'));

    async ingresarNombre(nombre: string) {
        await this.inputNombre.clear();
        await this.inputNombre.sendKeys(nombre);
    }

    async seleccionarEstadoDisponible() {
        await element(by.cssContainingText('option', 'Disponible')).click();
    }

    async clickActualizar() {
        await this.buttonActualizar.click();
    }

}
