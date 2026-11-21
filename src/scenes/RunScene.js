
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
this.player1 = new Player(this, 400, 500);

// Colisión con el suelo
this.physics.add.collider(
    this.player1.sprite,
    this.ground
);

        // Colisión con el suelo
        this.physics.add.collider(
            this.player1.sprite,
            this.ground
        );
        // Controles del jugador 1
this.cursors = this.input.keyboard.createCursorKeys();

    }

update() {

   

    this.player1.update();



}
    }
