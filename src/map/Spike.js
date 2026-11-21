
export class Spike {

    constructor(scene, x, y, width, height, slowDuration = 1500, slowMultiplier = 0.8) {

        this.slowDuration = slowDuration;
        this.slowMultiplier = slowMultiplier;

        // Representación visual
        this.sprite = scene.add.triangle(
            x + width / 2,
            y + height / 2,
            -width / 2, height / 2,
            0, -height / 2,
            width / 2, height / 2,
            0xCC2222
        );

        // Zona de detección
        this.hitbox = scene.add.rectangle(
            x + width / 2,
            y + height / 2,
            width,
            height,
            0xFF0000,
            0
        );

        scene.physics.add.existing(this.hitbox);

        this.hitbox.body.setImmovable(true);
        this.hitbox.body.allowGravity = false;
    }

}