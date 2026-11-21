
import Phaser from 'phaser';
import { Player } from '../entities/Player.js';
import { GameMap } from '../map/Map.js';


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
        right: 'RIGHT'
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
        right: 'D'
    }
);
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

this.physics.add.existing(this.ground);

this.ground.body.setImmovable(true);
this.ground.body.allowGravity = false;
        // Personaje (cubo)
      // Crear jugador 1
// Jugador 1: flechas


// Colisión con el suelo


    }

update() {
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

// Aplicar zoom
this.cameras.main.setZoom(zoom);

// Centrar cámara
this.cameras.main.centerOn(
    centerX,
    300
);
   

    this.player1.update();
    this.player2.update();


}
    }
