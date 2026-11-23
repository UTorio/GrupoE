import Phaser from 'phaser';
import { createBackground } from '../utils/Background';
export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
preload()
{
    this.load.audio('Main', '/assets/audio/Fairy_Lab_Run__Main.wav');
    this.load.image('FLR', 'img/FairyLabRunLogo.png');
    this.load.image('fondo', '/img/Fondo.png');
}
    create() {
            createBackground(this);
        this.add.image(600, 150, 'FLR')
        .setOrigin(0.5)
        .setScale(0.5);

      const width = this.scale.width;
const height = this.scale.height;

// Local Play
const localBtn = this.add.text(width / 2, height * 0.35, 'Local Play', {
    fontSize: '32px',
    color: '#00ff00'
}).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
    .on('pointerout', () => localBtn.setStyle({ color: '#00ff00' }))
    .on('pointerdown', () => this.startGame());

// Tutorial
const tutorialBtn = this.add.text(width / 2, height * 0.50, 'Tutorial', {
    fontSize: '32px',
    color: '#00ff00'
}).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => tutorialBtn.setStyle({ color: '#ffff00' }))
    .on('pointerout', () => tutorialBtn.setStyle({ color: '#00ff00' }))
    .on('pointerdown', () => this.scene.start('TutorialScene'));

// Ajustes
const AjusBtn = this.add.text(width * 0.85, height * 0.90, 'Ajustes', {
    fontSize: '32px',
    color: '#494949'
}).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => AjusBtn.setStyle({ color: '#bbbbbb' }))
    .on('pointerout', () => AjusBtn.setStyle({ color: '#494949' }))
    .on('pointerdown', () => this.scene.start('AjustesScene'));

// Música
this.backgroundMusic = this.sound.add('Main', {
    loop: true,
    volume: 0.5
});


if (!this.backgroundMusic.isPlaying) {
    this.backgroundMusic.play();
}
    }

    startGame()
    {
        this.scene.start('RunScene')
        this.backgroundMusic.stop();
    }
}
