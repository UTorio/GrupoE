import Phaser from 'phaser';

export class TutorialScene extends Phaser.Scene {

    constructor() {
        super({ key: 'TutorialScene' });
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        // Título
        this.add.text(width / 2, 60, 'CONTROLES', {
            fontSize: '40px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Texto jugador 1
        this.add.text(width * 0.25, height / 2, 
            'JUGADOR 1\n\n← →  Moverse\n\n↑  Saltar\n\n↓  Empujar\n\nL  Usar objeto',
            {
                fontSize: '24px',
                color: '#ffffff',
                align: 'center',
                lineSpacing: 8
            }
        ).setOrigin(0.5);

        // Texto jugador 2
        this.add.text(width * 0.75, height / 2,
            'JUGADOR 2\n\nA / D  Moverse\n\nW  Saltar\n\nS  Empujar\n\nT  Usar objeto',
            {
                fontSize: '24px',
                color: '#ffffff',
                align: 'center',
                lineSpacing: 8
            }
        ).setOrigin(0.5);

        // Línea divisoria
        this.add.line(
            width / 2, 200+(height / 2),
            0, 150 +(-height / 2),
            0, (height / 2) -200,
            0xffffff
        ).setLineWidth(3);
  const Exit = this.add.text(width / 2, height * 0.9, 'Volver', {
    fontSize: '32px',
    color: '#00ff00'
}).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => Exit.setStyle({ color: '#ffff00' }))
    .on('pointerout', () => Exit.setStyle({ color: '#00ff00' }))
    .on('pointerdown', () => {
        this.sound.stopAll();
        this.scene.start('MenuScene');
    });
    }
}