
import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {

    constructor() {
        super('PauseScene');
    }
    preload()
    {
        this.load.audio('Click', '/assets/audio/Fairy_Lab_Run__Click.wav');
        this.load.audio('PasarR', '/assets/audio/Fairy_Lab_Run__PasarRaton.wav');
    }
    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        // Fondo oscuro semitransparente
        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x000000,
            0.75
        );

        // Título
        this.add.text(
            width / 2,
            height / 2 - 120,
            'PAUSA',
            {
                fontSize: '64px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Botón continuar
        this.createButton(
            width / 2,
            height / 2,
            'CONTINUAR',
            () => {
                this.sound.play('Click', { volume: 0.1 });
                this.scene.stop();
                this.scene.resume('RunScene');
            }
        );

        // Botón menú principal
        this.createButton(
            width / 2,
            height / 2 + 80,
            'MENÚ PRINCIPAL',
            () => {
                this.sound.play('Click', { volume: 0.1 });
                this.scene.stop('RunScene');
                this.scene.start('MenuScene');
            }
        );

        // Teclas para reanudar
        this.pauseKeys = this.input.keyboard.addKeys({
            escape: Phaser.Input.Keyboard.KeyCodes.ESC,
            p: Phaser.Input.Keyboard.KeyCodes.P
        });
    }

    createButton(x, y, text, callback) {

        const button = this.add.text(x, y, text, {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: '#333333',
            padding: {
                x: 20,
                y: 12
            }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            this.sound.play('PasarR', { volume: 0.5 });
            button.setStyle({ color: '#ffff00' });
        });

        button.on('pointerout', () => {
            button.setStyle({ color: '#ffffff' });
        });

        button.on('pointerdown', callback);
    }

    update() {

        // ESC o P reanudan la partida
        if (
            Phaser.Input.Keyboard.JustDown(this.pauseKeys.escape) ||
            Phaser.Input.Keyboard.JustDown(this.pauseKeys.p)
        ) {
            this.scene.stop();
            this.scene.resume('RunScene');
            this.sound.stopAll();
        }
    }
}
