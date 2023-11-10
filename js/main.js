const canvas = document.getElementById("myCanvas");
canvas.style.width = window.innerWidth * 0.85;
canvas.style.height = window.innerHeight;

document.body.style.backgroundColor = "rgb(0, 0, 0);";

var camW = 1.10;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  29, //29
  (window.innerWidth * camW) / window.innerHeight,
  0.1,
  100
);
scene.background = new THREE.Color(0x000000);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth * 0.99, window.innerHeight * 0.99);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
resizeCamera();

window.addEventListener("resize", resizeCamera);

function resizeCamera() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = (window.innerWidth * camW) / window.innerHeight;
  camera.updateProjectionMatrix();
}

var minCameraScale = 10;
var maxCameraScale = 45; //45

camera.position.z = maxCameraScale;
// camera.position.x = 10;
camera.position.y = 2;
camera.lookAt(-3, 10, 0);

const light2 = new THREE.PointLight(0xffffff, 0.5, 1000, 10);
light2.position.set(0, 20,30);
light2.castShadow = true;
// scene.add(light2);


const pointLightHelper = new THREE.PointLightHelper(light2, 1);
// scene.add( pointLightHelper );

////////////////////////////////////

const clock = new THREE.Clock();
let mixer;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickpoint = { x: 0, y: 0 };
var ready = false;
let INTERSECTED;

/////////////////////////////////////////////////

const highlightColumnColor = 0x4a1604;
var categorias = [
  "Videojuegos",
  "Integracion",
  "MediaShorts",
  "Backing",
  "Pitch",
  "Modelado",
  "Hubs",
  "Iglesia"
];

/// MODALS / TARJETAS

var modeladoModal = new bootstrap.Modal(
  document.getElementById("myCardModelado"),
  {}
);
var modeladoId = document.getElementById("myCardModelado");
var videojuegosModal = new bootstrap.Modal(
  document.getElementById("myCardGame"),
  {}
);
var videojuegosId = document.getElementById("myCardGame");
var mediaShortsModal = new bootstrap.Modal(
  document.getElementById("myCardMediashorts"),
  {}
);
var mediaShortsId = document.getElementById("myCardMediashorts");
var backingModal = new bootstrap.Modal(
  document.getElementById("myCardBacking"),
  {}
);
var backingId = document.getElementById("myCardBacking");
var pitchModal = new bootstrap.Modal(
  document.getElementById("myCardPitch"),
  {}
);
var pitchId = document.getElementById("myCardPitch");
var desarrolloModal = new bootstrap.Modal(
  document.getElementById("myCardDesarrollo"),
  {}
);
var desarrolloId = document.getElementById("myCardDesarrollo");
var hubsModal = new bootstrap.Modal(
  document.getElementById("myCardHubs"),
  {}
);
var hubsId = document.getElementById("myCardHubs");
var twitchModal = new bootstrap.Modal(
  document.getElementById("myCardTwitch"),
  {}
);
var  twitchId = document.getElementById("myCardTwitch");
// mouse test

let drag;

document.addEventListener("mousemove", Mousemove);
document.addEventListener("mousedown", Mousedown);

var mouse = { x: 0, y: 0 };
var cameraoff = { x: camera.position.x, y: camera.position.y };
var mouseLookAt = "none";

function Mousemove(e) {
  //sprite1.position.set( event.clientX, event.clientY - 20, 0 );

  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  //console.log(window.innerWidth+ " "+ window.innerHeight);
}

function Mousedown(e) {
  clickpoint.x = (e.clientX / window.innerWidth) * 2 - 1;
  clickpoint.y = -(e.clientY / window.innerHeight) * 2 + 1;

  if (
    rotating == false &&
    modeladoId.style.display != "block" &&
    videojuegosId.style.display != "block" &&
    mediaShortsId.style.display != "block" &&
    backingId.style.display != "block" &&
    pitchId.style.display != "block" &&
    desarrolloId.style.display != "block" &&
    hubsId.style.display != "block" &&
    twitchId.style.display != "block"
  ) {
    switch (mouseLookAt) {
      case "none":
        break;
      case "Modelado":
        modeladoModal.show();
        mouseLookAt = "none";
        break;
      case "Videojuegos":
        videojuegosModal.show();
        mouseLookAt = "none";
        break;
      case "MediaShorts":
        mediaShortsModal.show();
        mouseLookAt = "none";
        break;
      case "Backing":
        backingModal.show();
        mouseLookAt = "none";
        break;
      case "Pitch":
        pitchModal.show();
        mouseLookAt = "none";
        break;
      case "Integracion":
        desarrolloModal.show();
        mouseLookAt = "none";
        break;
      case "Hubs":
          hubsModal.show();
          mouseLookAt = "none";
          break;
      case "Iglesia":
          twitchModal.show();
          mouseLookAt = "none";
          break;
      default:
        break;
    }
  }
}

var zoomAce = 0;
var dirZ = false;
var cont2 = 0.2;

var isla = new THREE.Group();


const ambient = new THREE.AmbientLight(0xffffff, 0.1, 1000);
scene.add(ambient);

const cutululight = new THREE.SpotLight( 0x99dfff, 1, 100 );
cutululight.position.set( 20, -20, -40 );
isla.add( cutululight );

const redlight = new THREE.SpotLight( 0xcf6161, 0.3 , 70);
redlight.position.set( 20, 30, -40 );
isla.add( redlight );

const casaslight = new THREE.PointLight( 0x99dfff, 2 , 50);
casaslight.position.set( 20, 10, 40 );
casaslight.castShadow = true;
isla.add( casaslight );


// lightStatic(isla, 10, 2, 30, 0xcf6161, 5, 60)
// lightStatic(isla, 15, 20, -30, 0x99dfff, 1, 60)

var relampago = new lightLoad(isla, 0, 50, 20, 0xffffff, 2, 1000)

// const pointLightHelper2 = new THREE.PointLightHelper(casalight, 1);
// isla.add( pointLightHelper2 );

scene.add(isla);

var rotating = false;
var rotationDir = "top";
var canRotate = true;



document.addEventListener(
  "wheel",
  function (e) {
    // console.log("scrolled")
    // code to increment object.position.z
    if (rotating == false) {
      if (e.deltaY > 0) {
        dirZ = true;
      } else {
        dirZ = false;
      }
      rotating = true;
    }
  },
  true
);

var spriteHubs =  new Sprite2D(isla, -10,0,0, "hubs", 0, false)


///////////////////////////////////////
// IMPORT
var cutuluFbx = new loadFBX(
  isla,
  "fbx/cutulu.fbx",
  1,
  0,
  0,
  0,
  "textures/cutulu/completotext_DefaultMaterial_BaseColor.1001.png",
  "textures/cutulu/completotext_DefaultMaterial_Metalness.1001.png",
  "textures/cutulu/completotext_DefaultMaterial_Normal.1001.png",
  "textures/cutulu/completotext_DefaultMaterial_Height.1001.png",
  "textures/cutulu/completotext_DefaultMaterial_Roughness.1001.png",
  "textures/cutulu/completotext_DefaultMaterial_Emissive.1001.png",
);

var IglesiaFbx = new loadFBX(
  isla,
  "fbx/iglesia.fbx",
  1,
  0,
  0,
  0,
  "textures/iglesia/iglesia_Base color_1001.png",
  "textures/iglesia/iglesia_Metallic_1001.png",
  "textures/iglesia/iglesia_Normal_1001.png",
  "textures/iglesia/iglesia_Height_1001.png",
  "textures/iglesia/iglesia_Roughness_1001.png",
  // "textures/cutulu/completotext_DefaultMaterial_Height.1001.png",
  // "textures/cutulu/completotext_DefaultMaterial_Roughness.1001.png",
  // "textures/cutulu/completotext_DefaultMaterial_Emissive.1001.png",
  // "textures/IGLESIA_UDIMS_9_lambert1_BaseColor_1001.png",
  // "textures/IGLESIA_UDIMS_9_lambert1_Metallic_1001-IGLESIA_UDIMS_9_lambert1_Roughness_1001.png",
  // "textures/IGLESIA_UDIMS_9_lambert1_Normal_1001.png"
);

var casaFbx = new loadFBX(
  isla,
  "fbx/casadelado.fbx",
  1,
  0,
  0,
  0,
  "textures/casadelado/Casa2_Base color_1001.png",
  "textures/casadelado/Casa2_Metallic_1001.png",
  "textures/casadelado/Casa2_Normal_1001.png",
  "textures/casadelado/Casa2_Height_1001.png",
  "textures/casadelado/Casa2_Roughness_1001.png"
);

var arbolesFbx = new loadFBX(
  isla,
  "fbx/arboles.fbx",
  1,
  0,
  0,
  0,
  "textures/arboles/arboles_Base color_1001.png",
  "textures/arboles/arboles_Metallic_1001.png",
  "textures/arboles/arboles_Normal_1001.png",
  "textures/arboles/arboles_Height_1001.png",
  "textures/arboles/arboles_Roughness_1001.png"
);

var centro_columnas = new loadFBX(
  isla,
  "fbx/centro_columnas.fbx",
  1,
  0,
  0,
  0,
  "textures/centro_columnas/demas_Base color_1001.png",
  "textures/centro_columnas/demas_Metallic_1001.png",
  "textures/centro_columnas/demas_Normal_1001.png",
  "textures/centro_columnas/demas_Height_1001.png",
  "textures/centro_columnas/demas_Roughness_1001.png",
);
var soporteFbx = new loadFBX(
  isla,
  "fbx/soporte.fbx",
  1,
  0,
  0,
  0,
  "textures/soporte/centro_Base color_1002.png",
  "textures/soporte/centro_Metallic_1002.png",
  "textures/soporte/centro_Normal_1002.png",
  // "textures/soporte/centro_Height_1002.png",
  // "textures/soporte/centro_Roughness_1002.png",
);

var pastoFbx = new loadFBX(
  isla,
  "fbx/pasto.fbx",
  1,
  0,
  0,
  0,
  "textures/pasto/pasto.png",
  null,
  null,
  null,
  null,
  null,
  "textures/pasto/op_pasto.jpg"
  // "textures/soporte/centro_Height_1002.png",
  // "textures/soporte/centro_Roughness_1002.png",
);

var hostpitalFbx = new loadFBX(
  isla,
  "fbx/hospital.fbx",
  1,
  0,
  0,
  0,
  "textures/hospital/hospital_Base color_1001.png",
  "textures/hospital/hospital_Metallic_1001.png",
  "textures/hospital/hospital_Normal_1001.png",
  "textures/hospital/hospital_Height_1001.png",
  "textures/hospital/hospital_Roughness_1001.png",
  null,
  "textures/pasto/op_pasto.jpg"
  // "textures/soporte/centro_Height_1002.png",
  // "textures/soporte/centro_Roughness_1002.png",
);

var paredes_hostpitalFbx = new loadFBX(
  isla,
  "fbx/paredes_hospital.fbx",
  1,
  0,
  0,
  0,
  "textures/pasto/pasto.png",
  null,
  null,
  null,
  null,
  null,
  "textures/pasto/op_pasto.jpg"
  // "textures/soporte/centro_Height_1002.png",
  // "textures/soporte/centro_Roughness_1002.png",
);
var fondo_templo = new loadFBX(
  isla,
  "fbx/fondo_templo.fbx",
  1,
  0,
  0,
  0,
  "textures/fondos/fondo_templo.png",
);
var fondo_pueblo = new loadFBX(
  isla,
  "fbx/fondo_pueblo.fbx",
  1,
  0,
  0,
  0,
  "textures/fondos/fondo_pueblo.png",
);
var transiciones = new loadFBX(
  isla,
  "fbx/transiciones.fbx",
  1,
  0,
  0,
  0,
  "textures/black.png",
);
var suelo = new loadFBX(
  isla,
  "fbx/suelo.fbx",
  1,
  0,
  0,
  0,
  "textures/suelo/suelo_Base color_1001.png",
  "textures/suelo/suelo_Metallic_1001.png",
  "textures/suelo/suelo_Normal_1001.png",
  "textures/suelo/suelo_Height_1001.png",
  "textures/suelo/suelo_Roughness_1001.png"
);


isla.rotation.y = -Math.PI/7;
isla.rotation.y += -2*Math.PI/3;
///////////////////////
/// ANIMATE
var cont = 0.1;
var timer = 0;
var deltaRotation = Math.PI / 120;

var t = 0;
var asd = false;
var golpe2 = false;

/////////////7
function animate() {
  requestAnimationFrame(animate);

  t++;
  if(golpe2 == false){
    if(t>200 && asd==false){
      t=0;
      relampago.parapadeo();
      asd = !asd;
    }else if(t>5 && asd ==true){
      t=0;
      relampago.parapadeo();
      asd = !asd;
      golpe2=true;
    }
  }else{
    if(t>10 && asd==false){
      t=0;
      relampago.parapadeo();
      asd = !asd;
    }else if(t>2 && asd ==true){
      t=0;
      relampago.parapadeo();
      asd = !asd;
      golpe2=false;
    }
  }
  

  cameramov();
  render();

  if (rotating == true) {
    timer += deltaRotation;
    if (timer < (deltaRotation * 120 * 2) / 3) {
      if (dirZ == true) {
        isla.rotation.y += deltaRotation;
      } else {
        isla.rotation.y -= deltaRotation;
      }
    } else {
      timer = 0;
      rotating = false;
      console.log(isla.rotation.y);
    }
  }else{
    
  }

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
animate();

function closeModal(){
    modeladoId.style.display = "none";
    videojuegosId.style.display = "none";
    mediaShortsId.style.display = "none"; 
    backingId.style.display = "none";
    pitchId.style.display = "none";
    desarrolloId.style.display = "none";
    hubsId.style.display = "none";
    twitchId.style.display = "none";
}

function render() {
  /*
  if (ready == false) {
    return;
  }*/

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0 && modeladoId.style.display != "block" &&
  videojuegosId.style.display != "block" &&
  mediaShortsId.style.display != "block" &&
  backingId.style.display != "block" &&
  pitchId.style.display != "block" &&
  desarrolloId.style.display != "block" &&
  hubsId.style.display != "block") {
    if (intersects[0].object.name == "hubs") {
      setHighlight(categorias[6], intersects);
    } else
    if (intersects[0].object.name == "Columna_4") {
      setHighlight(categorias[0], intersects);
    } else if (intersects[0].object.name == "Columna_1") {
      setHighlight(categorias[2], intersects);
    } else if (intersects[0].object.name == "Columna_2") {
      setHighlight(categorias[3], intersects);
    } else if (intersects[0].object.name == "iglesia") {
      setHighlight(categorias[7], intersects);
    }
     else if (intersects[0].object.name == "Columna_3") {
      setHighlight(categorias[5], intersects);
    } else if (intersects[0].object.name == "Columna_5") {
      setHighlight(categorias[4], intersects);
    } else if (intersects[0].object.name == "Columna_6") {
      setHighlight(categorias[1], intersects);
    } else {
      document.body.style.cursor = "default";
      mouseLookAt = "none";
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
    }
  } else {
    mouseLookAt = "none";
    document.body.style.cursor = "default";
    if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
    }
}

function setHighlight(cursorlookAt, intersects) {
  document.body.style.cursor = "pointer";
  mouseLookAt = cursorlookAt;
  if(intersects[0].object.name=="hubs"){
    mouseLookAt = cursorlookAt;
  }else{
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(highlightColumnColor);
    }
  }
  
}

function cameramov() {
  camera.position.x = cameraoff.x + pointer.x;
  camera.position.y = cameraoff.y + pointer.y;

  camera.position.z += zoomAce;

  if (camera.position.z > maxCameraScale) {
    camera.position.z = maxCameraScale;
  }
  if (camera.position.z < minCameraScale) {
    camera.position.z = minCameraScale;
  }

  if (dirZ == true) {
    if (zoomAce > 0) {
      zoomAce -= 0.03;
    } else zoomAce = 0;
  }
  if (dirZ == false) {
    if (zoomAce < 0) {
      zoomAce += 0.03;
    } else zoomAce = 0;
  }
}
