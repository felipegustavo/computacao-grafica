const size = 30;

var renderer;
var scene;
var camera;
var triangle;
var controls;

function init(){
    
    scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(1.5, 1.5, 1.5);
    
    controls = new THREE.TrackballControls(camera, renderer.domElement);

    var axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);        

    calculate();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}                                    

function render() {
    controls.update();
    renderer.render(scene, camera);
}

function calculate(){
    
    var triangleGeometry = new THREE.Geometry(); 
    
    var n1 = $('#n1').val();
    var n2 = $('#n2').val();
    var a = $('#a').val()/10;
    var b = $('#b').val()/10;
    var c = $('#c').val()/10;
    
    scene.remove(triangle);
    
    var lines = 0;
    var cols;
    for(var i = -Math.PI/2; i <= Math.PI/2; i+= Math.PI/size){
        var x1 = a * Math.pow(Math.cos(i), (2/n2));
        var y1 = b * Math.pow(Math.cos(i), (2/n2));
        var z = c * Math.pow(Math.abs(Math.sin(i)), (2/n2)) * Math.sign(Math.sin(i));
        
        lines++;
        cols = 0;
        for(var j = 0; j <= 2*Math.PI; j+= 2*Math.PI/size){
            var x = x1 * Math.pow(Math.abs(Math.cos(j)), (2/n1)) * Math.sign(Math.cos(j));
            var y = y1 * Math.pow(Math.abs(Math.sin(j)), (2/n1)) * Math.sign(Math.sin(j));
            triangleGeometry.vertices.push(new THREE.Vector3(x, y, z));
            cols++;
        }
    }
    
    for (i = 0; i < lines - 1; i++) {
        for (j = 0; j < cols - 1; j++) {
            triangleGeometry.faces.push(new THREE.Face3(i * cols + j, i * cols + (j+1), (i+1) * cols + j)); 
            triangleGeometry.faces.push(new THREE.Face3((i+1) * cols + j, (i+1) * cols + (j+1), i * cols + (j+1))); 
        }
    }
    
    for(i = 0; i < lines - 1; i++){
        triangleGeometry.faces.push(new THREE.Face3( i*cols, (i+1)*cols, i*cols+(cols-1)) );
        triangleGeometry.faces.push(new THREE.Face3( i*cols+(cols-1), (i+1)*cols+(cols-1), (i+1)*cols) );
    }
    
    var numVertices = 2 * (lines-1) * (cols-1) + 2 * (lines-1);
    for(i = 0; i < numVertices; i++){
        triangleGeometry.faces[i].vertexColors[0] = new THREE.Color(1, 1, 1);
        triangleGeometry.faces[i].vertexColors[1] = new THREE.Color(0, i/size, 1.0 - i/size);
        triangleGeometry.faces[i].vertexColors[2] = new THREE.Color(0, (i+1)/size, 1.0 - (i+1)/size);
    }
    
    var triangleMaterial = new THREE.MeshBasicMaterial({ 
        color:0xffffff, 
        vertexColors:THREE.VertexColors,
		side:THREE.DoubleSide,
		wireframe:true
    }); 
	
	triangle = new THREE.Mesh(triangleGeometry, triangleMaterial); 
	scene.add(triangle);
    
    renderer.clear();
	animate();
    
}
