
import Phaser from 'phaser';
import { Player } from '../entities/Player.js';
import { GameMap } from '../map/Map.js';
import { Yuliya } from '../entities/Yuliya.js';
import { HappyMeal } from '../entities/HappyMeal.js';
import { createBackground } from '../utils/Background.js';
export class RunScene extends Phaser.Scene {

    constructor() {
        super('RunScene');
    }
    preload() {
    this.load.image('fondo', '/img/Fondo.png');
        //cargar audio
         this.load.audio('RaceStart', '/assets/audio/Fairy_Lab_Run__Race.wav');
    this.load.audio('Race', '/assets/audio/Fairy_Lab_Run__Race_loop.wav');
    this.load.audio('jump', '/assets/audio/Fairy_Lab_Run__Jump.wav');
    this.load.audio('onda', '/assets/audio/Fairy_Lab_Run__Onda.wav');
    this.load.audio('box', '/assets/audio/Fairy_Lab_Run__Item.wav');
    this.load.audio('Win', '/assets/audio/Fairy_Lab_Run__Victoria.wav');
    this.load.audio('Damage', '/assets/audio/Fairy_Lab_Run__Impacto.wav');
    this.load.audio('Yuli', '/assets/audio/Fairy_Lab_Run__Alas.wav');
    this.load.audio('Start', '/assets/audio/Fairy_Lab_Run__Countdown.wav');
    this.load.audio('Disparo', '/assets/audio/Fairy_Lab_Run__Disparo.wav');
    // Animación de correr: 6 fotogramas
    for (let i = 1; i <= 6; i++) {
        this.load.image(
            `walkrun${i}`,
            `img/walkrun/fotograma000${i}.png`
        );
    }

    // Animación de salto: 2 fotogramas
    for (let i = 1; i <= 2; i++) {
        this.load.image(
            `jump${i}`,
            `img/jump/fotograma000${i}.png`
        );
    }

    // Animación de muerte: 5 fotogramas
    for (let i = 0; i <= 4; i++) {
        this.load.image(
            `death${i}`,
            `img/Muerte/fotograma000${i}.png`
        );
    }
        // Animación de yuliya: 4 fotogramas
    for (let i = 0; i <= 3; i++) {
        this.load.image(
            `yuli${i}`,
            `img/hada sprites/fotograma000${i}.png`
        );
    }
}
    create() {
      
// Reiniciar estado de la partida
    this.gameFinished = false;
this.width = 10000
    // Reactivar físicas
    this.physics.resume();
     // Dimensiones del nivel
this.worldWidth = 3000;
this.worldHeight = 600;
      
this.createPlayerAnimations();
console.log('¿Walkrun 1?', this.textures.exists('walkrun1'));
console.log('¿Walkrun 6?', this.textures.exists('walkrun6'));
console.log('¿Jump 1?', this.textures.exists('jump1'));
console.log('¿Jump 2?', this.textures.exists('jump2'));
this.player1 = new Player(
    this,
    200,
    500,
    {
        up: 'UP',
        left: 'LEFT',
        right: 'RIGHT',
        down: 'DOWN',
        object: 'L'
    }
);

// Jugador 2: WASD
this.player2 = new Player(
    this,
    400,
    500,
    {
        up: 'W',
        left: 'A',
        right: 'D',
        down: 'S',
        object: 'T'
    }
);
this.players = [this.player1, this.player2];
// Crear mapa
this.map = new GameMap(
    this,
    [this.player1, this.player2]
);

this.map.create();
// Límites físicos del mundo
this.physics.world.setBounds(
    0, 0,
    this.map.width,
    this.map.height
);

this.cameras.main.setBounds(
    0, 0,
    this.map.width,
    this.map.height
);

// Suelo


this.enemy1 = new Yuliya(
    this,
    1000,
    300,
    { x: -1, y: 0 },
    {
        fireRate: 2000,
        projectileSpeed: 350,
        slowDuration: 2000,
        slowMultiplier: 0.5
    }
);

// META
this.finish = this.add.rectangle(
    this.map.width - 100,
    500,
    20,
    160,
    0xffff00,
    0.3
);

// Cajas de objetos
this.HappyMeals = [

    new HappyMeal(this, 700, 400),
    new HappyMeal(this, 1400, 400),
    new HappyMeal(this, 2200, 400)

];

// Comprobar llegada de los jugadores
this.players.forEach(player => {

    this.physics.add.overlap(
        player.sprite,
        this.finish,
        () => this.playerWins(player)
    );

});

this.physics.add.existing(this.finish, true);

// Colisión con el suelo


    // Colisiones entre todos los jugadores
    for (let i = 0; i < this.players.length; i++) {

        for (let j = i + 1; j < this.players.length; j++) {

            this.physics.add.collider(
                this.players[i].sprite,
                this.players[j].sprite
            );

        }

    }
    // Teclas para pausar
this.pauseKeys = this.input.keyboard.addKeys({
    escape: Phaser.Input.Keyboard.KeyCodes.ESC,
    p: Phaser.Input.Keyboard.KeyCodes.P
});

//música
 this.mainLoopS = this.sound.add('RaceStart', {
    loop: false,
    volume: 0.1
});
 this.mainLoop = this.sound.add('Race', {
    loop: true,
    volume: 1.0
});
this.Win = this.sound.add('Win', {
    loop: false,
    volume: 0.7
});
this.start = this.sound.add('Start', {
    loop: false,
    volume: 0.3
});
this.start.play();
this.start.once('complete', () => {
this.mainLoopS.play();
this.mainLoopS.once('complete', () => {
this.mainLoop.play();
})});
this.Win.once('complete', () => {
this.mainLoop.stop();
this.mainLoopS.stop();
});
this.start.play();
createBackground(this);
    }

update() {

    if (this.gameFinished) return;

    // Comprobar si se quiere pausar
    if (
        Phaser.Input.Keyboard.JustDown(this.pauseKeys.escape) ||
        Phaser.Input.Keyboard.JustDown(this.pauseKeys.p)
    ) {
        this.scene.launch('PauseScene');
        this.scene.bringToTop('PauseScene');
        this.scene.pause();
        return;
    }
    
// Posiciones de los jugadores
const p1 = this.player1.sprite;
const p2 = this.player2.sprite;

// Centro entre ambos jugadores
const centerX = (p1.x + p2.x) / 2;

// Distancia horizontal
const distance = Math.abs(p1.x - p2.x);

// Zoom según la distancia
const minZoom = 0.35;
const maxZoom = 1;

const zoom = Phaser.Math.Clamp(
    1000 / (distance + 400),
    minZoom,
    maxZoom
);


// Aplicar zoom
this.cameras.main.setZoom(zoom);

// Centrar cámara con desplazamiento

// Desplazar el encuadre vertical según el zoom
const verticalOffset = (1 - zoom) * 600;

this.cameras.main.centerOn(
    centerX + 0,
    0-1000 + verticalOffset
);
// Actualizar jugadores
this.players.forEach(player => {
    player.update();
});

    }

    playerWins(player) {
        
    // Evitar que se active varias veces
    if (this.gameFinished) return;

    this.gameFinished = true;

    // Identificar ganador
    const winner = player === this.player1
        ? 'JUGADOR 1'
        : 'JUGADOR 2';
this.Win.play();
    // Mostrar mensaje
    const text = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        winner + ' HA GANADO!',
        {
            fontSize: '48px',
            color: '#ffff00',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: {
                x: 20,
                y: 15
            }
        }
    );

    text.setOrigin(0.5);
    text.setScrollFactor(0);
    text.setDepth(1000);

    // Detener físicas
    this.physics.pause();

    // Volver al menú después de 3 segundos
    this.time.delayedCall(3000, () => {

        this.scene.start('MenuScene');

    });

}


createPlayerAnimations() {

    // Correr
    this.anims.create({
        key: 'player-walk',
        frames: [
            { key: 'walkrun1' },
            { key: 'walkrun2' },
            { key: 'walkrun3' },
            { key: 'walkrun4' },
            { key: 'walkrun5' },
            { key: 'walkrun6' }
        ],
        frameRate: 10,
        repeat: -1
    });

    // Saltar
    this.anims.create({
        key: 'player-jump',
        frames: [
            { key: 'jump1' },
            { key: 'jump2' }
        ],
        frameRate: 8,
        repeat: -1
    });

    // Morir
    this.anims.create({
        key: 'player-death',
        frames: [
            { key: 'death0' },
            { key: 'death1' },
            { key: 'death2' },
            { key: 'death3' },
            { key: 'death4' }
        ],
        frameRate: 8,
        repeat: 0
    });
//enemigo
    this.anims.create({
        key: 'yuli',
        frames: [
            { key: 'yuli0' },
            { key: 'yuli1' },
            { key: 'yuli2' },
            { key: 'yuli3' }
        ],
        frameRate: 16,
        repeat: 1000000
    });


}

}
