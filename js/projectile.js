export class Projectile {
    constructor(projectile, container) {
        this.projectile = projectile;
        this.container = container;
        this.#render();
    }

    #render() {
        this.element = document.createElement('img');
        this.element.src = this.projectile.image;
        this.element.style.position = 'absolute';
        this.element.style.left = `${this.projectile.getX}px`;
        this.element.style.top = `${this.projectile.getY}px`;
        this.container.appendChild(this.element);
    }

    update() {
        //  TODO: Projectile movement met translate etc.
        this.element.style.left = `${this.projectile.getX}px`;
        this.element.style.top = `${this.projectile.getY}px`;
    }

    destroy() {
        this.element.remove();
    }
}