var texture;
var renderer;
var scene;
var camera;
var container;
var plane1;
var plane2;
var plane3;
var plane4;

function init(){
    
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);
    scene.add(camera);
    
    texture = THREE.ImageUtils.loadTexture("../../assets/images/fruits.png", THREE.UVMapping, onLoadTexture);
    
    container = document.getElementById("WebGL-output");
    container.appendChild(renderer.domElement);
    renderer.clear();
    
}

function clearImage(){
    
    scene.remove(plane1);
    scene.remove(plane2);
    scene.remove(plane3);
    scene.remove(plane4);
    
}

function onLoadTexture(){
    
    renderer.setSize(texture.image.width, texture.image.height);
    
    var material = new THREE.MeshBasicMaterial({map : texture, wireframe : false, side : THREE.DoubleSide});
    var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);
    plane = new THREE.Mesh(planeGeometry, material);
    scene.add(plane);
    
    renderer.render(scene, camera);
    
}

function negativeTransform(){
    
    clearImage();
    
    uniforms = {
        texture : {type : "t", value : texture}
    };
    
    var matShader = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader : document.getElementById("vs").textContent,
        fragmentShader : document.getElementById("negative-fs").textContent
    });
    
    var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);
    plane1 = new THREE.Mesh(planeGeometry, matShader);
    scene.add(plane1);
    
    renderer.render(scene, camera);
    
}

function brightTransform(){
    
    clearImage();
    
    var i = document.getElementById("bright-intensity").value;
    
    uniforms = {
        texture : {type : "t", value : texture},
        bright: {type : "f", value : i}
    };
    
    var matShader = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader : document.getElementById("vs").textContent,
        fragmentShader : document.getElementById("bright-fs").textContent
    });
    
    var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);
    plane1 = new THREE.Mesh(planeGeometry, matShader);
    scene.add(plane1);
    
    renderer.render(scene, camera);
    
}

function gamaTransform(){
    
    clearImage();
    
    var c2 = document.getElementById("c-gama").value;
    var y = document.getElementById("y-gama").value;
    
    uniforms = {
        texture : {type : "t", value : texture},
        c2 : {type : "f", value : c2},
        y : {type : "f", value : y}
    };
    
    var matShader = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader : document.getElementById("vs").textContent,
        fragmentShader : document.getElementById("gama-fs").textContent
    });
    
    var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);
    plane1 = new THREE.Mesh(planeGeometry, matShader);
    scene.add(plane1);
    
    renderer.render(scene, camera);    
    
}

function logTransform(){
    
    clearImage();
    
    var c2 = document.getElementById("c-log").value;
    
    uniforms = {
        texture : {type : "t", value : texture},
        c2 : {type : "f", value : c2},
    };
    
    var matShader = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader : document.getElementById("vs").textContent,
        fragmentShader : document.getElementById("log-fs").textContent
    });
    
    var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);
    plane1 = new THREE.Mesh(planeGeometry, matShader);
    scene.add(plane1);
    
    renderer.render(scene, camera);    
    
}

function generateRGBPlane(plane, vector, x, y){
    
    uniforms = {
        texture : {type : "t", value : texture},
        uChannel : {type : "v3", value : vector}
    };
    
    var matShader = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader : document.getElementById("vs").textContent,
        fragmentShader : document.getElementById("rgb-fs").textContent
    });     
    
    var planeGeometry = new THREE.PlaneBufferGeometry(0.5, 0.5, 5, 5);
    plane = new THREE.Mesh(planeGeometry, matShader);
    plane.position.set(x, y, 0);
    
    scene.add(plane);    
    
}

function rgbTransform(){

    clearImage();
    
    generateRGBPlane(plane1, new THREE.Vector3(1.0, 1.0, 1.0), -0.25, 0.25);
    generateRGBPlane(plane2, new THREE.Vector3(1.0, 0, 0), 0.25, 0.25);
    generateRGBPlane(plane3, new THREE.Vector3(0, 1.0, 0), -0.25, -0.25);
    generateRGBPlane(plane4, new THREE.Vector3(0, 0, 1.0), 0.25, -0.25)
    
    renderer.render(scene, camera);   
    
}