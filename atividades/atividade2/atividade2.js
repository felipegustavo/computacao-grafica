var texture;
var renderer;
var scene;
var camera;
var container;
var composer = null;
var circle;

$(document).ready(function(){
    
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);
    scene.add(camera);

    texture = THREE.ImageUtils.loadTexture("../../assets/images/fruits.png", THREE.UVMapping, onLoadTexture);

    container = $("#WebGL-output");
    container.append(renderer.domElement);
    
    container.mousemove(update);
    
    renderer.clear();
});

function onLoadTexture(){

    renderer.setSize(texture.image.width, texture.image.height);

    var material = new THREE.MeshBasicMaterial({map : texture, wireframe : false, side : THREE.DoubleSide});
    var planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 20, 20);
    var plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(0.0, 0.0, -0.5);
    
    scene.add(plane);
    renderer.render(scene, camera);
}


function update(event){
    
    scene.remove(circle);
    
    var posX = (event.clientX / texture.image.width * 2 - 1) / 2;
    var posY = (-event.clientY / texture.image.height * 2 + 1) / 2;
    
    var shader = THREE.smoothShader;
    shader.uniforms['uPixelSize'].value = new THREE.Vector2(1.0/texture.image.width, 1.0/texture.image.height);
    shader.uniforms['tDiffuse'].value = texture;
    
    var material = new THREE.ShaderMaterial(shader);
    var geometry = new THREE.CircleGeometry(0.25, 50);
    circle = new THREE.Mesh(geometry, material);
    circle.position.set(posX, posY, 0);
    scene.add(circle);
    
    console.log(circle);
    
    renderer.render(scene, camera);
    
    
}