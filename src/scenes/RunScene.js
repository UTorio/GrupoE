
import Phaser from 'phaser';
import { Player } from '../entities/Player.js';
import { GameMap } from '../map/Map.js';
import { Yuliya } from '../entities/Yuliya.js';


export class RunScene extends Phaser.Scene {

    constructor() {
        super('RunScene');
    }

    create() {

     // Dimensiones del nivel
this.worldWidth = 3000;
this.worldHeight = 600;
this.player1 = new Player(
    this,
    200,
    500,
    {
        up: 'UP',
        left: 'LEFT',
        right: 'RIGHT',
        down: 'DOWN'
    }
);

// Jugador 2: WASD
this.player2 = new Player(
    this,
    400,
    500,
    {
        up: 'W',
        left: 'A',
        right: 'D',
        down: 'S'
    }
);
this.players = [this.player1, this.player2];
// Crear mapa
this.map = new GameMap(
    this,
    [this.player1, this.player2]
);

this.map.create();
// Límites físicos del mundo
this.physics.world.setBounds(
    0, 0,
    this.map.width,
    this.map.height
);

this.cameras.main.setBounds(
    0, 0,
    this.map.width,
    this.map.height
);

// Suelo
this.ground = this.add.rectangle(
    this.worldWidth / 2,
    580,
    this.worldWidth,
    40,
    0x228B22
);

this.enemy1 = new Yuliya(
    this,
    1000,
    300,
    { x: -1, y: 0 },
    {
        fireRate: 2000,
        projectileSpeed: 350,
        slowDuration: 2000,
        slowMultiplier: 0.5
    }
);

// META
this.finish = this.add.rectangle(
    this.map.width - 100,
    500,
    20,
    160,
    0xffff00,
    0.3
);

// Comprobar llegada de los jugadores
this.players.forEach(player => {

    this.physics.add.overlap(
        player.sprite,
        this.finish,
        () => this.playerWins(player)
    );

});

this.physics.add.existing(this.finish, true);

// Colisión con el suelo
this.physics.add.existing(this.ground);

this.ground.body.setImmovable(true);
this.ground.body.allowGravity = false;

    // Colisiones entre todos los jugadores
    for (let i = 0; i < this.players.length; i++) {

        for (let j = i + 1; j < this.players.length; j++) {

            this.physics.add.collider(
                this.players[i].sprite,
                this.players[j].sprite
            );

        }

    }
    // Teclas para pausar
this.pauseKeys = this.input.keyboard.addKeys({
    escape: Phaser.Input.Keyboard.KeyCodes.ESC,
    p: Phaser.Input.Keyboard.KeyCodes.P
});


    }

update() {

    if (this.gameFinished) return;

    // Comprobar si se quiere pausar
    if (
        Phaser.Input.Keyboard.JustDown(this.pauseKeys.escape) ||
        Phaser.Input.Keyboard.JustDown(this.pauseKeys.p)
    ) {
        this.scene.launch('PauseScene');
        this.scene.pause();
        return;
    }
    // Centro entre los dos jugadores
    // Posiciones de los jugadores
    const p1 = this.player1.sprite;
    const p2 = this.player2.sprite;

    // Centro entre ambos jugadores
    const centerX = (p1.x + p2.x) / 2;

    // Distancia horizontal
    const distance = Math.abs(p1.x - p2.x);

    // Zoom según la distancia
    const minZoom = 0.2;
    const maxZoom = 1;

    const zoom = Phaser.Math.Clamp(
        800 / (distance + 400),
        minZoom,
        maxZoom
    );

        this.players.forEach(player => {
        player.update();
    });

    // Aplicar zoom
    this.cameras.main.setZoom(zoom);

    // Centrar cámara
    this.cameras.main.centerOn(
        centerX,
        300
    );
    


    }

    playerWins(player) {

    // Evitar que se active varias veces
    if (this.gameFinished) return;

    this.gameFinished = true;

    // Identificar ganador
    const winner = player === this.player1
        ? 'JUGADOR 1'
        : 'JUGADOR 2';

    // Mostrar mensaje
    const text = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        winner + ' HA GANADO!',
        {
            fontSize: '48px',
            color: '#ffff00',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: {
                x: 20,
                y: 15
            }
        }
    );

    text.setOrigin(0.5);
    text.setScrollFactor(0);
    text.setDepth(1000);

    // Detener físicas
    this.physics.pause();

    // Volver al menú después de 3 segundos
    this.time.delayedCall(3000, () => {

        this.scene.start('MenuScene');

    });

}


}
