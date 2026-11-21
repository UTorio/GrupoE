
import Phaser from 'phaser';
import { Player } from '../entities/Player.js';
export class RunScene extends Phaser.Scene {

    constructor() {
        super('RunScene');
    }

    create() {

        // Fondo
        this.cameras.main.setBackgroundColor('#87CEEB');

        // Suelo
        this.ground = this.add.rectangle(
            400, 580, 800, 40, 0x228B22
        );

        this.physics.add.existing(this.ground);

        this.ground.body.setImmovable(true);
        this.ground.body.allowGravity = false;

        // Personaje (cubo)
      // Crear jugador 1
// Jugador 1: flechas
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

// Colisión con el suelo
this.physics.add.collider(
    this.player1.sprite,
    this.ground
);

        // Colisión con el suelo
        this.physics.add.collider(
            this.player2.sprite,
            this.ground
        );
           this.physics.add.collider(
            this.player2.sprite,
                this.player1.sprite,
        );
        // Controles del jugador 1
this.cursors = this.input.keyboard.createCursorKeys();

    }

update() {

   

    this.player1.update();
    this.player2.update();


}
    }
