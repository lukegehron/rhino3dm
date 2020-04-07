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
    RhinoCompute.authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwIjoiUEtDUyM3IiwiYyI6IkFFU18yNTZfQ0JDIiwiYjY0aXYiOiJPM1hQbG8wVjlsNHBTcXdKOWM4V1pnPT0iLCJiNjRjdCI6ImFxSm9FU21IYTYxK3pyZUpYRGZmSlFESGtNNHBMN3BWUkI1dmJFdHlUVTFpaWxickRldDBXc1dKL09EQ2gyWU0xWXlOR2ZBUnlyTUxXejY4cVJBYm96Z0Vxb2puNnZVb3dKMXlIRDBwSFBPU25mZ1N2V0VhMlBmdWxUK0pZRzM5dllFeDh3eVcxR2YwOEphaTFxUVZtNkFOQ010WXE3YTVSRm9NbWhhQ3BTbTh1eW9hTkx0SjN2aWRtZEdlcmVDREk3L04xdHhZT3ZqeWNlUFltbVUzYmc9PSIsImlhdCI6MTU4NTkyMTUxOX0.XwfN99fcj6nYD0O0YNS4tg_qxoEX-rUEkVO2Tlvuxso"


    // if you have a different Rhino.Compute server, add the URL here:
    //RhinoCompute.url = "";

    // load a .gh (binary) file!
     let url = 'LabBench13.gh';
     let res = await fetch(url, {mode: 'no-cors'});
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

document.getElementById('loader').style.display = 'none';

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

        //var texture1 = new THREE.TextureLoader().load( "https://threejsfundamentals.org/threejs/resources/images/wall.jpg" );
        //texture1.wrapS = THREE.RepeatWrapping;
        // texture1.wrapT = THREE.RepeatWrapping;
        // texture1.repeat.set( 0.001, 0.001 );

        const loader = new THREE.TextureLoader();

        let material = new THREE.MeshPhongMaterial({
            //side: THREE.DoubleSide,
             color: 0xcccccc,
            transparent: false,
            //map: texture1
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


        data = JSON.parse(result.values[0].InnerTree['{ 0; }'][2].data);
        mesh = rhino.CommonObject.decode(data);

        material = new THREE.MeshPhongMaterial({
            //side: THREE.DoubleSide,
             color: 0x333333,
            transparent: false,
            //map: texture1
        });

        threeMesh = meshToThreejs(mesh, material);


        scene.add(threeMesh);

    });
}

function onSliderChange(){

    // show spinner
    // document.getElementById('loader').style.display = 'block';

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
    camera = new THREE.PerspectiveCamera( 45, 2, 1, 1000 );

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

    renderer = new THREE.WebGLRenderer({canvas: document.querySelector("canvas"), antialias: true});




    var canvas = document.getElementById('canvas');
    renderer.setSize((canvas.clientWidth), (canvas.clientHeight));

    // canvas.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement  );

    camera.position.z = 70;

    // window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'resize', resizeCanvasToDisplaySize, false );

    animate();
}

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight*2;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight/2 );
    animate();
}

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
  }
}


function meshToThreejs(mesh, material) {
    let loader = new THREE.BufferGeometryLoader();
    var geometry = loader.parse(mesh.toThreejsJSON());
    return new THREE.Mesh(geometry, material);
}
