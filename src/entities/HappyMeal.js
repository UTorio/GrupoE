
import Phaser from 'phaser';
import { itemPool } from './Item.js';

export class HappyMeal {

    constructor(scene, x, y, options = {}) {

        this.scene = scene;

        // Tiempo que tarda en reaparecer
        this.respawnTime = options.respawnTime ?? 5000;

        this.available = true;

        // Crear caja
        this.sprite = scene.add.rectangle(
            x, y, 35, 35, 0xffcc00
        );

        this.sprite.setStrokeStyle(3, 0xffffff);

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setImmovable(true);

        // Detectar jugadores
        scene.players.forEach(player => {

            scene.physics.add.overlap(
                player.sprite,
                this.sprite,
                () => this.collect(player)
            );

        });
        this.Grab = scene.sound.add('box', {
    loop: false,
    volume: 1
});
    }

    collect(player) {

        // La caja ya está desactivada
        if (!this.available) return;

        // Si ya tiene objeto, no recoge otro
        if (player.item !== null) return;

        //reproducir sonido
        this.Grab.play();
        // Elegir objeto aleatorio
        const randomIndex = Phaser.Math.Between(
            0,
            itemPool.length - 1
        );

        const item = itemPool[randomIndex]();

        // Entregar objeto
        player.giveItem(item);

        // Desactivar caja
        this.available = false;

        this.sprite.setVisible(false);
        this.sprite.body.enable = false;

        // Reaparecer después del tiempo establecido
        this.scene.time.delayedCall(this.respawnTime, () => {

            this.available = true;

            this.sprite.setVisible(true);
            this.sprite.body.enable = true;

        });

    }

    destroy() {

        this.sprite.destroy();

    }

}
