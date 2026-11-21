

import Phaser from 'phaser';

export class Player {

    constructor(scene, x, y, controls) {

        this.scene = scene;

        // Crear personaje
        this.sprite = scene.add.rectangle(
            x, y, 40, 40, 0x9932CC
        );

        // Añadir físicas
        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCollideWorldBounds(true);

        // Controles
        this.controls = scene.input.keyboard.addKeys(controls);

    }

    update() {

        const body = this.sprite.body;

        // Movimiento horizontal
        if (this.controls.left.isDown) {
            body.setVelocityX(-200);
        }
        else if (this.controls.right.isDown) {
            body.setVelocityX(200);
        }
        else {
            body.setVelocityX(0);
        }

        // Saltar
        if (Phaser.Input.Keyboard.JustDown(this.controls.up) && body.blocked.down) {
            body.setVelocityY(-400);
        }

    }

}
