
import Phaser from 'phaser';

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
        this.player = this.add.rectangle(
            400, 500, 40, 40, 0x9932CC
        );

        this.physics.add.existing(this.player);

        // Configuración física del jugador
        this.player.body.setCollideWorldBounds(true);

        // Colisión con el suelo
        this.physics.add.collider(
            this.player,
            this.ground
        );

    }

    update() {

    }
}