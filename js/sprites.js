function Sprite2D(padre, posx, posy, posz, name, id, visible) {
  var map = new THREE.TextureLoader().load( 'textures/black.png' );
  if(visible == true){
    map = new THREE.TextureLoader().load( 'textures/white.png' );
  }
  this.spriteMaterial = new THREE.SpriteMaterial({ color: 0xffffff, alphaMap: map });
  this.spriteMaterial2 = new THREE.SpriteMaterial({ color: 0xffffff });
  
  this.sprite = new THREE.Sprite(this.spriteMaterial);
  this.sprite.position.set(posx, posy, posz);
  this.id = id;
  this.sprite.name = name;
  this.sprite.rotation.y =-25;

  this.sprite.scale.x = 15;
  this.sprite.scale.y = 20;


  this.sprite.trigger = false;
  this.group = new THREE.Group();
  this.group.name = 'sprite';
  this.group.add(this.sprite);
  padre.add(this.group);

  this.actualizar = function () {
    // var cont = 0.1;
    // if (this.sprite.scale.x > 1) {
    //   this.sprite.scale.x -= cont;
    //   this.sprite.scale.y -= cont;
    // }
    // this.sprite.material = this.spriteMaterial;
  };
  this.t = 0;
  this.moveModel = function () {
    this.t+=0.1;
    // object.position.y += 2*Math.sin(t);
    
  }
}
