
import Phaser from 'phaser';

export class AjustesScene extends Phaser.Scene {

    constructor() {
        super({ key: 'AjustesScene' });
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        // Título
        this.add.text(width / 2, 80, 'AJUSTES', {
            fontSize: '42px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Texto del volumen
        this.add.text(width / 2, height / 2 - 80, 'VOLUMEN', {
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Barra de volumen
        const barX = width / 2 - 150;
        const barY = height / 2;
        const barWidth = 300;

        this.add.rectangle(
            width / 2, barY,
            barWidth, 10,
            0x777777
        );

        // Indicador del volumen actual
        this.volumeFill = this.add.rectangle(
            barX, barY,
            barWidth * this.sound.volume, 10,
            0x00ff88
        ).setOrigin(0, 0.5);

        // Texto del porcentaje
        this.volumeText = this.add.text(
            width / 2, barY + 45,
            `${Math.round(this.sound.volume * 100)}%`,
            {
                fontSize: '24px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Zona interactiva para cambiar el volumen
        const hitArea = this.add.rectangle(
            width / 2, barY,
            barWidth, 40,
            0xffffff, 0
        ).setInteractive();

        hitArea.on('pointerdown', (pointer) => {
            const volume = Phaser.Math.Clamp(
                (pointer.x - barX) / barWidth,
                0, 1
            );
            this.sound.stopAll();
            this.sound.volume = volume;

            this.volumeFill.width = barWidth * volume;

            this.volumeText.setText(
                `${Math.round(volume * 100)}%`
            );
        });

        // Botón para volver
        const back = this.add.text(
            width / 2, height - 80,
            'VOLVER',
            {
                fontSize: '28px',
                color: '#ffffff',
                backgroundColor: '#444444',
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        back.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
