function loadGLTF( parent, path, sprite, scale, posx, posy, posz, textura, metal, normal, height, roughtness, emisive){
    this.path = path;
    this.scale = scale;
    this.mixer;

    const baseColor = new THREE.TextureLoader().load(textura);
    baseColor.encoding = THREE.sRGBEncoding;
    baseColor.flipY = false;

    const metalnessColorMap = new THREE.TextureLoader().load(metal);
    metalnessColorMap.encoding = THREE.sRGBEncoding;
    metalnessColorMap.flipY = false;

    const normalColorMap = new THREE.TextureLoader().load(normal);
    normalColorMap.encoding = THREE.sRGBEncoding;
    normalColorMap.flipY = false;

    const heightMap = new THREE.TextureLoader().load(height);
    heightMap.encoding = THREE.sRGBEncoding;
    heightMap.flipY = false;

    const roughtnessMap = new THREE.TextureLoader().load(roughtness);
    roughtnessMap.encoding = THREE.sRGBEncoding;
    roughtnessMap.flipY = false;

    const emisiveMap = new THREE.TextureLoader().load(emisive);
    emisiveMap.encoding = THREE.sRGBEncoding;
    emisiveMap.flipY = false;

    const mtrex = new THREE.MeshStandardMaterial({
        map: baseColor,
        metalnessMap: metalnessColorMap,
        metalness: 0.0,
        normalMap: normalColorMap
    });
    const loader = new THREE.GLTFLoader();
    loader.load(
      this.path,
      function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = mtrex;
            // child.material.skinning = true;
            // child.material.morphTargets = true;
            if (child.name == "Object_80") {
              
                
            }
          }
        });
        this.mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.scene.scale.x = scale;
        gltf.scene.scale.y = scale;
        gltf.scene.scale.z = scale;
        gltf.scene.position.x = posx;
        gltf.scene.position.y = posy;
        gltf.scene.position.z = posz;
        sprite.sprite.position.x = posx+3;
        sprite.sprite.position.y = posy;
        sprite.sprite.position.z = posz+1;
        
        // gltf.scene.rotation.y = -0.5;
        // mixer = new THREE.AnimationMixer(gltf.scene);
        // const idle = mixer.clipAction(gltf.animations[2]);
        // trexanimations.push(idle);
        // const run = mixer.clipAction(gltf.animations[4]);
        // trexanimations.push(run);
        // const bite = mixer.clipAction(gltf.animations[1]);
        // trexanimations.push(bite);
        // const rugido = mixer.clipAction(gltf.animations[3]);
        // trexanimations.push(rugido);
        // const tail = mixer.clipAction(gltf.animations[0]);
        // trexanimations.push(tail);
        // trexanimations[0].play();
        // activeAction = trexanimations[0];
    
        parent.add(gltf.scene);
        // ready = true;
      },
      function (error) {
        console.log("Loading");
      }
    );
}

function loadFBX( parent, path, scale, 
  posx, posy, posz, textura, metal, normal, height, roughtness, emisive, alphaT){
  this.path = path;
    this.scale = scale;
    this.mixer;


    const baseColor = new THREE.TextureLoader().load(textura);

    const metalnessColorMap = new THREE.TextureLoader().load(metal);

    const normalColorMap = new THREE.TextureLoader().load(normal);

    const heightMap = new THREE.TextureLoader().load(height);

    const roughtnessMap = new THREE.TextureLoader().load(roughtness);

    const emisiveMap = new THREE.TextureLoader().load(emisive);

    const alpaMap = new THREE.TextureLoader().load(alphaT);

    const mtrex = new THREE.MeshStandardMaterial({
        map: baseColor,
        metalnessMap: metalnessColorMap,
        // metalness: 1,
        normalMap : normalColorMap,
        normalMapType : 0,
        // roughnessMap: roughtnessMap,
        roughness: 1,
        displacementMap: heightMap,
        displacementScale: 0,
        emissiveMap: emisiveMap,
        alphaMap: alpaMap
    });
    if(path == "fbx/pasto.fbx"){
      mtrex.transparent = true;
    }

    const mtrex2 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })
    const blackcolor = new THREE.MeshLambertMaterial({
      color: 0x000000
    })

    const column1 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })

    const column2 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })
    const column3 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })
    const column4 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })
    const column5 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })
    const column6 = new THREE.MeshLambertMaterial({
      color: 0xdcc3a7
    })

    function createColumntext(){
      return texture = new THREE.MeshStandardMaterial({
        map: baseColor,
        metalnessMap: metalnessColorMap,
        // metalness: 1,
        normalMap : normalColorMap,
        normalMapType : 0,
        roughnessMap: roughtnessMap,
        roughness: 1,
        displacementMap: heightMap,
        displacementScale: 0,
    })
    }

    const loader = new THREE.FBXLoader();
    loader.load(
      this.path,
      function (gltf) {
        gltf.traverse(function (child) {
          if (child.isMesh) {
           
            child.material = mtrex;
            // child.material.skinning = true;
            // child.material.morphTargets = true;
            if (child.name == "Columna_4") {
              child.material = createColumntext();
            }
            if (child.name == "Columna_1") {
              child.material = createColumntext();
            }
            if (child.name == "Columna_2") {
              child.material = createColumntext();
            }
            if (child.name == "Columna_3") {
              child.material = createColumntext();
            }
            if (child.name == "Columna_5") {
              child.material = createColumntext();
            }
            if (child.name == "Columna_6") {
              child.material = createColumntext();
            }
            if (child.name == "cutulu") {
              child.material.roughness.setValue =0;
            }
            if(path== "fbx/paredes_hospital.fbx"){
              child.material = blackcolor;
            }
            if (child.name == "fondo_templo") {
              child.material.metalness.setValue =0;
            }
            if (child.name == "hospital") {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        });
        //this.mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.scale.x = scale;
        gltf.scale.y = scale;
        gltf.scale.z = scale;
        gltf.position.x = posx;
        gltf.position.y = posy;
        gltf.position.z = posz;
        /*
        sprite.sprite.position.x = posx;
        sprite.sprite.position.y = posy+14;
        sprite.sprite.position.z = posz+10;
        */
        // gltf.rotation.y = -Math.PI/7;
        // // gltf.rotation.y += -2*Math.PI/3;
        parent.add(gltf);
        // ready = true;
      },
      function (error) {
        console.log("Loading");
      }
    );
}
function lightLoad(parent, x, y ,z , color, f, d){

  const light = new THREE.PointLight(color, 0, d, 10);
  light.position.set(x,y,z); 
  light.castShadow = true;
  // light.rotation.y = -Math.PI/7;
  parent.add(light);
  const pointLightHelper2 = new THREE.PointLightHelper(light, 1);
  // parent.add( pointLightHelper2 );

  var onoff = false;
  this.parapadeo = function(){
    onoff=!onoff;
    if(onoff){
      light.intensity = f;
    }else{
      light.intensity = 0;
    }
  }
}

function lightStatic(parent, x, y ,z , color, f, d){

  const light = new THREE.PointLight(color, f, d, 10);
  light.position.set(x,y,z); 
  light.castShadow = true;
  // light.rotation.y = -Math.PI/7;
  parent.add(light);
  const pointLightHelper2 = new THREE.PointLightHelper(light, 1);
  // parent.add( pointLightHelper2 );
}

