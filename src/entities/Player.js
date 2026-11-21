

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
        // Velocidad del jugador
this.baseSpeed = 200;

// Penalización por pinchos
this.slowUntil = 0;
this.slowMultiplier = 1;

    }

  update() {

    const body = this.sprite.body;

    // Calcular velocidad actual
    let currentSpeed = this.baseSpeed;

    if (this.scene.time.now < this.slowUntil) {
        currentSpeed *= this.slowMultiplier;
    }

    // Movimiento horizontal
    if (this.controls.left.isDown) {
        body.setVelocityX(-currentSpeed);
    }
    else if (this.controls.right.isDown) {
        body.setVelocityX(currentSpeed);
    }
    else {
        body.setVelocityX(0);
    }

    // Saltar
    if (Phaser.Input.Keyboard.JustDown(this.controls.up) && body.blocked.down) {
        body.setVelocityY(-600);
    }

}
applySlow(duration, multiplier) {

    // Evitar reiniciar la penalización mientras está activa
    if (this.scene.time.now < this.slowUntil) {
        return;
    }

    this.slowUntil = this.scene.time.now + duration;
    this.slowMultiplier = multiplier;

}
}
