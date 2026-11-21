
import Phaser from 'phaser';

export class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        // Crear personaje
        this.sprite = scene.add.rectangle(
            x, y, 40, 40, 0x9932CC
        );

        // Añadir físicas
        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCollideWorldBounds(true);

        // Controles
        this.cursors = scene.input.keyboard.createCursorKeys();

    }

    update() {

        const body = this.sprite.body;

        // Movimiento horizontal
        if (this.cursors.left.isDown) {
            body.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            body.setVelocityX(200);
        }
        else {
            body.setVelocityX(0);
        }

        // Saltar
        if (this.cursors.up.isDown && body.blocked.down) {
            body.setVelocityY(-400);
        }

    }

}
