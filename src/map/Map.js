

import { Platform } from './Platform.js';
import { Spike } from './Spike.js';

export class GameMap {

    constructor(scene, players) {

        this.scene = scene;
        this.players = players;

        this.width = 3000;
        this.height = 600;

        this.platforms = [];
        this.spikes = [];

    }

    create() {

        // Suelo principal
        this.addPlatform(0, 560, 6000, 4000, 0x555555);

        // Plataformas de prueba
        this.addPlatform(500, 470, 180, 20);
        this.addPlatform(900, 400, 200, 20);
        this.addPlatform(1400, 470, 250, 20);
        this.addPlatform(2000, 420, 180, 20);

        // Pinchos de prueba
        this.addSpike(750, 550, 40, 40);
        this.addSpike(1200, 550, 80, 40);
        this.addSpike(1800, 550, 40, 40);

        // Crear colisiones
        for (const player of this.players) {

            for (const platform of this.platforms) {

                this.scene.physics.add.collider(
                    player.sprite,
                    platform.sprite
                );

            }

            for (const spike of this.spikes) {

                this.scene.physics.add.overlap(
                    player.sprite,
                    spike.hitbox,
                    () => {
                        player.applySlow(
                            spike.slowDuration,
                            spike.slowMultiplier
                        );
                    }
                );

            }

        }

    }

    addPlatform(x, y, width, height, color = 0xBABA66) {

        const platform = new Platform(
            this.scene, x, y, width, height, color
        );

        this.platforms.push(platform);

    }

    addSpike(x, y, width, height, duration = 1500, multiplier = 0.5) {

        const spike = new Spike(
            this.scene, x, y, width, height, duration, multiplier
        );

        this.spikes.push(spike);

    }

}