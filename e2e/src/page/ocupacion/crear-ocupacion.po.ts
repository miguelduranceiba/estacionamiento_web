import { by, element } from "protractor";

export class CrearOcupacion {
    private inputConductor = element(by.id('inputIdentificacion'));
    private botonConductor = element(by.id('btnIdentificacion'));
    private textoConductor = element(by.id('textoConductor'));
    private inputVehiculo = element(by.id('inputVehiculo'));
    private botonVehiculo = element(by.id('btnVehiculo'));
    private textoVehiculo = element(by.id('textoVehiculo'));
    private botonCrear = element(by.id('crear'));

    async clickBotonConductor() {
        await this.botonConductor.click();
    }

    async setValueConductor(value: string) {
        await this.inputConductor.sendKeys(value);
    }

    async getValueConductor() {
        return await this.textoConductor.getText();
    }

    async clickBotonVehiculo() {
        await this.botonVehiculo.click();
    }

    async setValueVehiculo(value: string) {
        await this.inputVehiculo.sendKeys(value);
    }

    async getValueVehiculo() {
        return await this.textoVehiculo.getText();
    }

    async clickCrear() {
        await this.botonCrear.click();
    }
}