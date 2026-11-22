
export class Item {

    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }

    use(player) {
        // Cada objeto implementará su propio efecto
    }

}


// OBJETO DE PRUEBA: TURBO
export class TurboItem extends Item {

    constructor() {
        super('Turbo', '⚡');
    }

    use(player) {

        const body = player.sprite.body;

        // Dirección hacia la que mira el jugador
        const direction = player.facing || 1;

        // Impulso horizontal
        body.setVelocityX(direction * 550);

        // Pequeño impulso vertical
        body.setVelocityY(-180);

    }

}


// POOL DE OBJETOS
export const itemPool = [

    () => new TurboItem()

];
