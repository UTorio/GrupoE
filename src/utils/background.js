export function createBackground(scene) {

    const width = scene.scale.width;
    const height = scene.scale.height;

    const background = scene.add.tileSprite(
        0,
        0,
        300000,
        height,
        'fondo'
    );

    background.setOrigin(0, 0);
    background.setDepth(-100);

    // Forzar una repetición horizontal visible
    background.setTileScale(1.21, 1.21);

    return background;
    console.log('Pantalla:', width, height);
console.log('Textura:', image.width, image.height);
console.log('Fondo:', background.width, background.height);
}