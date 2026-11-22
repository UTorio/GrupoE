export class Projectile{

constructor(scene, x, y, direction, options = {}) {

        this.scene = scene;

        // Configuración
        this.speed = options.speed ?? 350;
        this.radius = options.radius ?? 8;
        this.slowDuration = options.slowDuration ?? 2000;
        this.slowMultiplier = options.slowMultiplier ?? 0.5;
        this.lifetime = options.lifetime ?? 5000;

        // Normalizar dirección
        const length = Math.sqrt(
            direction.x * direction.x +
            direction.y * direction.y
        );

        if (length === 0) {
            throw new Error('La dirección del proyectil no puede ser cero');
        }

        this.direction = {
            x: direction.x / length,
            y: direction.y / length
        };

        // Crear proyectil
        this.sprite = scene.add.circle(
            x, y, this.radius, 0xff4444
        );

        scene.physics.add.existing(this.sprite);

        const body = this.sprite.body;

        // Desactivar gravedad
        body.setAllowGravity(false);

        // Aplicar velocidad
        body.setVelocity(
            this.direction.x * this.speed,
            this.direction.y * this.speed
        );

        // Detectar colisiones con jugadores
        this.scene.players.forEach(player => {

            scene.physics.add.overlap(
                this.sprite,
                player.sprite,
                () => this.hitPlayer(player)
            );

        });

        // Destruir si tarda demasiado en impactar
        scene.time.delayedCall(this.lifetime, () => {
            this.destroy();
        });

    }

    hitPlayer(player) {

        // Evitar múltiples impactos
        if (!this.sprite.active) return;

        // Aplicar ralentización
        player.applySlow(
            this.slowDuration,
            this.slowMultiplier
        );

        this.destroy();

    }

    destroy() {

        if (this.sprite && this.sprite.active) {
            this.sprite.destroy();
        }

    }

}