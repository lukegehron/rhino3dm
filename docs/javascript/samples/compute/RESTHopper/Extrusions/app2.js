let args = {
    algo : null,
    pointer : null,
    values : []
};

let definition = null;

// get slider values
let height = document.getElementById('height').value;
let width = document.getElementById('width').value;
let length = document.getElementById('length').value;

let param1 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Length');
param1.append([0], [length]);

let param2 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Width');
param2.append([0], [width]);

let param3 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Height');
param3.append([0], [height]);

rhino3dm().then(async m => {
    console.log('Loaded rhino3dm.');
    rhino = m; // global


    // authenticate
    //RhinoCompute.authToken = RhinoCompute.getAuthToken();
    RhinoCompute.authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwIjoiUEtDUyM3IiwiYyI6IkFFU18yNTZfQ0JDIiwiYjY0aXYiOiJzdnRZNGVtMTREZE5CZUF2NGoxWEJnPT0iLCJiNjRjdCI6IitoUkt6cTI2dk1wMWpCM2cydFE0SkJaRHFKaFp6UUN0NElqajl6a3JEYjBFRks5bWdzN0xCQk9rVUZuVENaVncxeis3czBBUXFCWi9IdllzYkcvUXpQNit5elk1VjgwL3hUMGFwZm1WaW5PNG1HWndXY1g3RDNwZTRYd1orblZGVzdIT0VYZ3N6UHhpNm12cGQ0VnZpdnRDcmZjZUU4VmhpbkJjcExhdmIxdkRFNHl5VzgvUDVzOVViUzJKbEhxeHRhL1lXSnJNVmxZWjh2WGQ1Mi9DTXc9PSIsImlhdCI6MTU4NTc3MDYxN30.vr3jR9B6rjSrZwkNnB6s48zZGPfpaEsz3fVj8ufjAfc"


    // if you have a different Rhino.Compute server, add the URL here:
    //RhinoCompute.url = "";

    // load a .gh (binary) file!
     let url = 'LabBench12.gh';
     let res = await fetch(url);
     let buffer = await res.arrayBuffer();
     let arr = new Uint8Array(buffer);
     definition = arr;

    // try this instead to load a .ghx (xml) file!
    //let url = 'BranchNodeRnd.ghx';
    //let res = await fetch(url);
    //let text = await res.text();
    //definition = text;

    init();
    compute();
});

function compute(){

    // clear values
    let trees = [];

    trees.push(param1);
    trees.push(param2);
    trees.push(param3);



    RhinoCompute.Grasshopper.evaluateDefinition(definition, trees).then(result => {
        // RhinoCompute.computeFetch("grasshopper", args).then(result => {
        console.log(result);

        // hide spinner
        document.getElementById('loader').style.display = 'none';

        let data = JSON.parse(result.values[0].InnerTree['{ 0; }'][1].data);
        let mesh = rhino.CommonObject.decode(data);

        var texture1 = new THREE.TextureLoader().load( "https://threejsfundamentals.org/threejs/resources/images/wall.jpg" );
        texture1.wrapS = THREE.RepeatWrapping;
        // texture1.wrapT = THREE.RepeatWrapping;
        // texture1.repeat.set( 0.001, 0.001 );

        const loader = new THREE.TextureLoader();

        let material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            // color: 0xff0000,
            transparent: false,
            map: texture1
        });

        let threeMesh = meshToThreejs(mesh, material);

        scene.add(threeMesh);


        material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
              // color: 0xff0000,
          map: loader.load('textures/wood1.jpg'),
        });



        data = JSON.parse(result.values[0].InnerTree['{ 0; }'][0].data);
        mesh = rhino.CommonObject.decode(data);

        threeMesh = meshToThreejs(mesh, material);


        scene.add(threeMesh);

    });
}

function onSliderChange(){

    // show spinner
    document.getElementById('loader').style.display = 'block';

    // get slider values
    height = document.getElementById('height').value;
    width = document.getElementById('width').value;
    length = document.getElementById('length').value;

    param1 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Length');
    param1.append([0], [length]);

    param2 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Width');
    param2.append([0], [width]);

    param3 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Height');
    param3.append([0], [height]);

    // scene.traverse(child => {
    //     if(child.type === 'Mesh'){
    //         scene.remove(child);
    //     }
    // });

    while(scene.children.length > 0){
      scene.remove(scene.children[0]);
    }

    var ambient_light = new THREE.AmbientLight(0x333333);
    scene.add(ambient_light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, -1, -1);
    scene.add(directionalLight);

    var point_light = new THREE.PointLight(0xffffff);
    point_light.position.x = 20;
    point_light.position.y = 50;
    point_light.position.z = 100;
    scene.add(point_light);

    compute();
}

// BOILERPLATE //

var scene, camera, renderer, controls;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(1,1,1);
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );

    var ambient_light = new THREE.AmbientLight(0x333333);
    scene.add(ambient_light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, -1, 0);
    scene.add(directionalLight);

    var point_light = new THREE.PointLight(0xffffff);
    point_light.position.x = 20;
    point_light.position.y = 50;
    point_light.position.z = 100;
    scene.add(point_light);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    var canvas = document.getElementById('canvas');
    canvas.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement  );

    camera.position.z = 50;

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    animate();
}

function meshToThreejs(mesh, material) {
    let loader = new THREE.BufferGeometryLoader();
    var geometry = loader.parse(mesh.toThreejsJSON());
    return new THREE.Mesh(geometry, material);
}
