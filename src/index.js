import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { RunScene } from './scenes/RunScene.js';

const config = {
    type: Phaser.AUTO,      // WebGL if available; otherwise, Canvas
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 }
        }
    },
    scene: [MenuScene, GameScene, PauseScene, RunScene]      // The first scene starts automatically
};

const game = new Phaser.Game(config);
