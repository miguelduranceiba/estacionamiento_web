import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkProducto = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkEspacio = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));
    linkParqueadero = element(by.xpath('/html/body/app-root/app-navbar/nav/a[4]'));

    async clickBotonProductos() {
        await this.linkProducto.click();
    }

    async clickBotonEspacio() {
        await this.linkEspacio.click();
    }

    async clickBotonParqueadero() {
        await this.linkParqueadero.click();
    }
}
