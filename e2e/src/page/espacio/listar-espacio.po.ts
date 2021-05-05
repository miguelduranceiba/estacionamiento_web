import { by, element } from "protractor";

export class ListarEspacio {

    private buttonCrear = element(by.id('crear'));
    private bodyTable = element.all(by.css('#lista_espacios tr'));

    async clickCrear() {
        await this.buttonCrear.click();
    }

    async cantidadEspacio() {
        return this.bodyTable.count();
    }

    async clickEditar(posicion: number) {
        await this.clickButton(posicion, 'editar');
    }

    async clickEliminar(posicion: number) {
        await this.clickButton(posicion, 'eliminar');
    }

    private async clickButton(posicion: number, tagName: string) {
        await this.bodyTable.get(posicion).all(by.tagName(`a.${tagName}`)).click();
    }

    async getNombre(posicion: number) {
        const value = await this.bodyTable.get(posicion).all(by.tagName('td')).get(2).getText();
        return value;
    }

}
