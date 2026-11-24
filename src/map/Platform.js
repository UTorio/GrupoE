
export class Platform {

    constructor(scene, x, y, width, height, color = 0xBABA66) {

        this.sprite = scene.add.rectangle(
            x + width / 2,
            y + height / 2,
            width,
            height,
            color
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setImmovable(true);
        this.sprite.body.allowGravity = false;
    }

}