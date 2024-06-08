
class Projectile {

    projVisual
    margLeft;

    constructor(){
        this.projVisual = document.createElement('img')
        this.margLeft = 0;
        this.projVisual.src = "../Assets/PROJECTILE.png"
        this.projVisual.style.zIndex = "99"
        this.projVisual.style.position = 'absolute'
        this.projVisual.style.top = '50%'
        this.projVisual.style.left = '50%'
        this.projVisual.style.width = "10%"
        this.projVisual.style.height = '10%'
        this.projVisual.style.marginLeft = '0px'
        this.projVisual.className = 'Proj'
    }
    
    move(){
        this.margLeft += 17
        this.projVisual.style.marginLeft = this.margLeft + 'px'
    }


}

export {Projectile}