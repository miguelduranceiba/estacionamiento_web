import { by, element } from 'protractor';

export class CrearVehiculo {
    private inputPlaca = element(by.id('placa'));
    private selectTipoVehiculo = element(by.id('tipoVehiculo'));
    private botonAtras = element(by.id('atras'));
    private botonCrear = element(by.id('crear'));

    set inputPlacaValue(inputPlaca: string) {
        this.inputPlaca.sendKeys(inputPlaca);
    }

    async seleccionarTipoVehiculoAutomovil() {
        await this.selectTipoVehiculo.element(by.cssContainingText('option', 'Automóvil')).click();
    }

    clickBotonAtras() {
        this.botonAtras.click();
    }

    clickBotonCrear() {
        this.botonCrear.click();
    }

}
