import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { CrearConductor } from '../page/conductor/crear-conductor.po';
import { CrearEspacio } from '../page/espacio/crear-espacio.po';
import { ListarEspacio } from '../page/espacio/listar-espacio.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { CrearOcupacion } from '../page/ocupacion/crear-ocupacion.po';
import { ListarOcupacion } from '../page/ocupacion/listar-ocupacion.po';
import { CrearVehiculo } from '../page/vehiculo/crear-vehiculo.po';

describe('workspace-project Ocupación', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let crearEspacio: CrearEspacio;
    let listarEspacio: ListarEspacio;
    let listarOcupacion: ListarOcupacion;
    let crearOcupacion: CrearOcupacion;
    let crearConductor: CrearConductor;
    let crearVehiculo: CrearVehiculo;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        crearEspacio = new CrearEspacio();
        listarEspacio = new ListarEspacio();
        listarOcupacion = new ListarOcupacion();
        crearOcupacion = new CrearOcupacion();
        crearConductor = new CrearConductor();
        crearVehiculo = new CrearVehiculo();
    });

    it('Mirar disponibilidad', async () => {
        const NOMBRE = 'ESPACIO 1';

        page.navigateTo();
        navBar.clickBotonEspacio();
        listarEspacio.clickCrear();

        crearEspacio.ingresarNombre(NOMBRE);
        crearEspacio.seleccionarEstadoDisponible();

        await crearEspacio.clickCrear();

        page.navigateTo();
        navBar.clickBotonParqueadero();

        expect('col-2 disponible espacio align-middle').toContain(await listarOcupacion.cosultarClase(0));
    });

    it('Crear conductor', async () => {
        const TIPO = 'CC';
        const IDENTIFICACION = '1234';
        const PRIMERNOMBRE = 'CEIBA';
        const PRIMERAPELLIDO = 'DOS';

        page.navigateTo();
        navBar.clickBotonParqueadero();

        listarOcupacion.clickEspacio(0);
        crearOcupacion.setValueConductor(IDENTIFICACION);
        crearOcupacion.clickBotonConductor();

        crearConductor.inputTipoIdentificacionValue = TIPO;
        crearConductor.inputNumeroIdentificacionValue = IDENTIFICACION;
        crearConductor.inputPrimerNombreValue = PRIMERNOMBRE;
        crearConductor.inputPrimerApellidoValue = PRIMERAPELLIDO;

        crearConductor.clickBotonCrear();

        listarOcupacion.clickEspacio(0);

        crearOcupacion.setValueConductor(IDENTIFICACION);

        crearOcupacion.clickBotonConductor();

        expect(crearOcupacion.getValueConductor()).toBe(`${PRIMERNOMBRE} ${PRIMERAPELLIDO}`);

    });

    it('Crear vehículo', () => {
        const PLACA = 'PLACA1';

        page.navigateTo();
        navBar.clickBotonParqueadero();
        listarOcupacion.clickEspacio(0);

        crearOcupacion.setValueVehiculo(PLACA);
        crearOcupacion.clickBotonVehiculo();

        crearVehiculo.inputPlacaValue = PLACA;
        crearVehiculo.seleccionarTipoVehiculoAutomovil();
        crearVehiculo.clickBotonCrear();

        listarOcupacion.clickEspacio(0);

        crearOcupacion.setValueVehiculo(PLACA);
        crearOcupacion.clickBotonVehiculo();

        expect(crearOcupacion.getValueVehiculo()).toBe(PLACA);
    });

    it('Crear ocupación', async () => {
        const PLACA = 'PLACA1';
        const IDENTIFICACION = '1234';

        page.navigateTo();
        navBar.clickBotonParqueadero();
        listarOcupacion.clickEspacio(0);

        crearOcupacion.setValueConductor(IDENTIFICACION);
        crearOcupacion.clickBotonConductor();

        crearOcupacion.setValueVehiculo(PLACA);
        crearOcupacion.clickBotonVehiculo();

        crearOcupacion.clickCrear();
        browser.sleep(500);
        page.navigateTo();
        navBar.clickBotonParqueadero();
        expect('col-2 espacio ocupado align-middle').toContain(await listarOcupacion.cosultarClase(0));
    });

    it('Pagar ocupación', async () => {

        page.navigateTo();
        navBar.clickBotonParqueadero();

        listarOcupacion.clickEspacio(0);

        expect('col-2 disponible espacio align-middle').toContain(await listarOcupacion.cosultarClase(0));
    });
});
