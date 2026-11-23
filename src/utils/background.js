export function createBackground(scene) {

    const width = 0;
    const height =0;

    const background = scene.add.tileSprite(
        0, 0,
        width, height,
        'fondo'
    );

    background.setOrigin(0, 0);
    background.setDepth(-100);

    // Escala horizontal
    const scaleX = 1;

    // Escala vertical para cubrir toda la pantalla
    const scaleY = height / 500;

    background.setTileScale(scaleX, scaleY);

    return background;
}