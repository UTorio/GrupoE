import Phaser from 'phaser';
import { Projectile } from './Projectile.js';

export class Yuliya {

    constructor(scene, x, y, direction, options = {}) {

        this.scene = scene;

        this.sprite = scene.physics.add.sprite(
            x,
            y,
            'yuli1'
        );

        // Dirección fija de disparo
        this.direction = direction;

        // Configuración del enemigo
        this.fireRate = options.fireRate ?? 2000;
        this.projectileSpeed = options.projectileSpeed ?? 350;
        this.slowDuration = options.slowDuration ?? 2000;
        this.slowMultiplier = options.slowMultiplier ?? 0.5;

        

        scene.physics.add.existing(this.sprite);

        // Mantenerlo suspendido
        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setImmovable(true);

        // Disparo automático
        this.fireEvent = scene.time.addEvent({
            delay: this.fireRate,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        });
 this.sprite.anims.play('yuli', true)
        const body = this.sprite.body;
        body.setAllowGravity(false);
    }

    update(){
       
    }

    shoot() {

        // Calcular posición de salida del proyectil
        const offset = 30;

        const projectileX =
            this.sprite.x + this.direction.x * offset;

        const projectileY =
            this.sprite.y + this.direction.y * offset;

        // Crear proyectil
        new Projectile(
            this.scene,
            projectileX,
            projectileY,
            this.direction,
            {
                speed: this.projectileSpeed,
                slowDuration: this.slowDuration,
                slowMultiplier: this.slowMultiplier
            }
        );

    }

    destroy() {

        // Detener disparos
        this.fireEvent.remove();

        // Eliminar enemigo
        this.sprite.destroy();

    }

}