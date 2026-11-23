import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
preload()
{
    this.load.audio('Main', '/assets/audio/Fairy_Lab_Run__Main.wav');
    this.load.image('FLR', 'img/FairyLabRunLogo.png');
}
    create() {
        this.add.image(400, 150, 'FLR')
        .setOrigin(0.5)
        .setScale(0.5);

        const localBtn = this.add.text(400, 320, 'Local Play', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => localBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => this.startGame());
            //música
            this.backgroundMusic = this.sound.add('Main', {
    loop: false,
    volume: 0.7
});


this.backgroundMusic.play();
    }

    startGame()
    {
        this.scene.start('RunScene')
        this.backgroundMusic.stop();
    }
}
