

import Phaser from 'phaser';

export class Player {

    constructor(scene, x, y, controls) {

        this.scene = scene;

       // Crear personaje animado
this.sprite = scene.physics.add.sprite(
    x,
    y,
    'walkrun1'
);

// Tamaño visual del personaje
this.sprite.setDisplaySize(64, 64);

// Configurar físicas
this.sprite.body.setCollideWorldBounds(true);
this.sprite.body.setMaxVelocity(600, 1000);
this.sprite.body.setDragX(1000);
this.sprite.body.setGravityY(1200);

// Tamaño de la hitbox
this.sprite.body.setSize(40, 40, true);

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

        // Dirección hacia la que mira
        this.facing = 1;

        // Objeto que lleva el jugador
        this.item = null;

        // Icono del objeto
        this.itemIcon = null;

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
            this.facing = -1;

        }
        else if (this.controls.right.isDown) {

            body.setAccelerationX(this.acceleration);
            this.facing = 1;

        }
        else {

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

        // Utilizar objeto
        if (
            this.controls.object &&
            Phaser.Input.Keyboard.JustDown(this.controls.object)
        ) {
            this.useItem();
        }

        // Actualizar posición del círculo
        this.pushCircle.setPosition(
            this.sprite.x,
            this.sprite.y
        );

        // Actualizar posición del icono
        if (this.itemIcon) {

            this.itemIcon.setPosition(
            this.sprite.x,
            this.sprite.y - 40
            );
// Actualizar orientación
this.sprite.setFlipX(this.facing === -1);

// Comprobar si está en el suelo
const onGround = body.blocked.down || body.touching.down;

// Comprobar si se mueve
const moving = Math.abs(body.velocity.x) > 10;

// Elegir animación
if (!onGround) {

    // Está saltando
    this.sprite.anims.play('player-jump', true);

}
else if (moving) {

    // Está caminando o corriendo
    this.sprite.anims.play('player-walk', true);

}
else {

    // Está quieto
    this.sprite.anims.stop();
    this.sprite.setTexture('walkrun1');

}
}

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

    giveItem(item) {

    // No recoger si ya tenemos uno
    if (this.item !== null) return;

    this.item = item;

    // Crear icono encima del jugador
    this.itemIcon = this.scene.add.text(
        this.sprite.x,
        this.sprite.y - 40,
        item.icon,
        {
            fontSize: '28px',
            color: '#ffffff'
        }
    );

    this.itemIcon.setOrigin(0.5);
    this.itemIcon.setDepth(100);

}


useItem() {

    // Comprobar si tenemos objeto
    if (this.item === null) return;

    // Activar efecto
    this.item.use(this);

    // Eliminar icono
    if (this.itemIcon) {
        this.itemIcon.destroy();
        this.itemIcon = null;
    }

    // Vaciar inventario
    this.item = null;

}
}
