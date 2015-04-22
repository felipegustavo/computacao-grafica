var texture;
var renderer;
var scene;
var camera;
var container;
var composer = null;

$(document).ready(function(){
    
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);
    scene.add(camera);

    texture = THREE.ImageUtils.loadTexture("../../assets/images/lena.png", THREE.UVMapping, onLoadTexture);

    container = $("#WebGL-output")
    container.append(renderer.domElement);
    
    container.click(onClickImage);
    
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

function onClickImage(event){
    
    var posX = (event.clientX / texture.image.width * 2 - 1) / 2;
    var posY = (-event.clientY / texture.image.height * 2 + 1) / 2;
    var pixelSizeX = 1 / texture.image.width;
    var pixelSizeY = 1 / texture.image.height;
    
    var material = new THREE.MeshBasicMaterial({color: "blue"});
    var planeGeometry = new THREE.PlaneBufferGeometry(0.2, 0.2, 20, 20);
    var plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(posX, posY, 0);
    
    scene.add(plane);
    renderer.render(scene, camera);
    
    setInterval(function(){
        
        scene.remove(plane);
        camera.left = (posX - (40 * pixelSizeX)) < -0.5 ? -0.5 : posX - (40 * pixelSizeX);
        camera.right = (posX + (40 * pixelSizeX)) > 0.5 ? 0.5 : posX + (40 * pixelSizeX);
        camera.top = (posY + (40 * pixelSizeY)) > 0.5 ? 0.5 : posY + (40 * pixelSizeY);
        camera.bottom = (posY - (40 * pixelSizeY)) < -0.5 ? -0.5 : posY - (40 * pixelSizeY);

        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        
    }, 100);
    
   
    
    

    console.log(camera);
}