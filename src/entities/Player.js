

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

        // Configurar físicas
        this.sprite.body.setMaxVelocity(600, 1000);
        this.sprite.body.setDragX(1000);
        this.sprite.body.setGravityY(1200);

        // Controles
        this.controls = scene.input.keyboard.addKeys(controls);
        
        // Velocidad del jugador
        this.baseSpeed = 200;
        this.acceleration = 1200;

        // Penalización por pinchos
        this.slowUntil = 0;
        this.slowMultiplier = 2;

        // Configuración del empuje
        this.pushRadius = 90;
        this.pushForce = 3000;
        this.pushUpForce = 180;
        this.pushCooldown = 700;
        this.lastPush = 0;

        // Visual del empuje
        this.pushCircle = scene.add.circle(
            x, y, this.pushRadius,
            0xffffff, 0.15
        );

        this.pushCircle.setStrokeStyle(2, 0xffffff, 0.5);
        this.pushCircle.setVisible(false);

    }

  update() {

        const body = this.sprite.body;

        // Calcular velocidad máxima
        let currentSpeed = this.baseSpeed;

        if (this.scene.time.now < this.slowUntil) {
            currentSpeed *= this.slowMultiplier;
        }

        // Movimiento horizontal basado en aceleración
        if (this.controls.left.isDown) {

            body.setAccelerationX(-this.acceleration);

        }
        else if (this.controls.right.isDown) {

            body.setAccelerationX(this.acceleration);

        }
        else {

            // Sin input: la fricción reduce la velocidad
            body.setAccelerationX(0);

        }

        // Limitar velocidad horizontal
        body.setMaxVelocity(currentSpeed * 2, 1000);

        // Saltar
        if (Phaser.Input.Keyboard.JustDown(this.controls.up) && body.blocked.down) {
            body.setVelocityY(-600);
        }

        // Empujar
        if (Phaser.Input.Keyboard.JustDown(this.controls.down)) {
            this.push();
        }

        // Actualizar posición del círculo
        this.pushCircle.setPosition(
            this.sprite.x,
            this.sprite.y
        );

    }

    push() {

        const now = this.scene.time.now;

        // Comprobar cooldown
        if (now - this.lastPush < this.pushCooldown) {
            return;
        }

        this.lastPush = now;

        // Mostrar círculo
        this.pushCircle.setPosition(
            this.sprite.x,
            this.sprite.y
        );

        this.pushCircle.setVisible(true);

        // Ocultar círculo después de un instante
        this.scene.time.delayedCall(180, () => {
            this.pushCircle.setVisible(false);
        });

        // Comprobar jugadores cercanos
        this.scene.players.forEach(player => {

            // No empujarse a uno mismo
            if (player === this) return;

            const dx = player.sprite.x - this.sprite.x;
            const dy = player.sprite.y - this.sprite.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            // Comprobar si está dentro del radio
            if (distance <= this.pushRadius) {

                // Dirección del empuje
                const angle = Math.atan2(dy, dx);

                const forceX = Math.cos(angle) * this.pushForce;
                const forceY = Math.sin(angle) * this.pushForce;

                // Aplicar impulso al rival
                player.sprite.body.setVelocity(
                    forceX,
                    forceY - this.pushUpForce
                );

            }

        });

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
