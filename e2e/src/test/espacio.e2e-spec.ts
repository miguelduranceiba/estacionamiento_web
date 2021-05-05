import { AppPage } from '../app.po';
import { ActualizarEspacio } from '../page/espacio/actualizar-espacio.po';
import { CrearEspacio } from '../page/espacio/crear-espacio.po';
import { ListarEspacio } from '../page/espacio/listar-espacio.po';
import { NavbarPage } from '../page/navbar/navbar.po';

describe('workspace-project Espacio', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let crearEspacio: CrearEspacio;
    let listarEspacio: ListarEspacio;
    let actualizarEspacio: ActualizarEspacio;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        crearEspacio = new CrearEspacio();
        listarEspacio = new ListarEspacio();
        actualizarEspacio = new ActualizarEspacio();
    });

    it('Crear un espacio', async () => {
        const cantidad = await listarEspacio.cantidadEspacio() + 1;
        const NOMBRE = 'ESPACIO 1';

        page.navigateTo();
        navBar.clickBotonEspacio();
        listarEspacio.clickCrear();

        crearEspacio.ingresarNombre(NOMBRE);
        crearEspacio.seleccionarEstadoDisponible();

        await crearEspacio.clickCrear();

        expect(cantidad).toBe(listarEspacio.cantidadEspacio());
    });

    it('Actualizar un espacio', async () => {
        const NOMBRE = 'ESPACIO EDITADO';
        const POSICION = 0;

        page.navigateTo();
        navBar.clickBotonEspacio();

        listarEspacio.clickEditar(POSICION);

        actualizarEspacio.ingresarNombre(NOMBRE);
        await actualizarEspacio.clickActualizar();

        expect(1).toBe(listarEspacio.cantidadEspacio());
        expect(NOMBRE).toEqual(await listarEspacio.getNombre(POSICION));
    });

    it('Eliminar un espacio', () => {
        const POSICION = 0;

        listarEspacio.clickEliminar(POSICION);

        expect(0).toBe(listarEspacio.cantidadEspacio());
    });

});
