import { by, element } from "protractor";

export class ListarOcupacion {
    private listaEspacios = element.all(by.css('#parqueadero div'));

    async clickEspacio(posicion: number) {
        await this.listaEspacios.get(posicion).click();
    }

    async colorDisponible(posicion: number) {
        let value = await this.listaEspacios.getAttribute('class');
        return value[posicion].indexOf('disponible') !== -1;
    }

    async cosultarClase(posicion: number) {
        return this.listaEspacios.get(posicion).getAttribute('class');
    }
}