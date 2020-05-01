let args = {
    algo : null,
    pointer : null,
    values : []
};

let definition = null;

let hexColors = [0xDBDBDB,0xFFFFFF,0xE0C067,0x8C6969,0xB5B5B5,0x575757,0xE0C067,0x91FFE9,0xFFFFFF,0x8C6969,0x4A4A4A,0x8C6969,0xE0C067,0x9E9C98,0x694444,0xC9C9C9,0x999999,0x3B3B3B,0xE0C067];

// get slider values
// let height = document.getElementById('height').value;
// let width = document.getElementById('width').value;
// let length = document.getElementById('length').value;

// Lab_Bench_Width: 30
// Lab_Bench_Length: 72
// Lab_Bench_Height: 37
// Lab_Bench_Start_Position
// Lab_Bench_Count

let LBL = document.getElementById('LBLength').value;
let LBW = document.getElementById('LBWidth').value;
let LBH = document.getElementById('LBHeight').value;
let LBSP = document.getElementById('LBPosition').value;
let LBC = document.getElementById('LBCount').value;

let Lab_Bench_Width = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Width');
Lab_Bench_Width.append([0], [LBW]);
let Lab_Bench_Length = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Length');
Lab_Bench_Length.append([0], [LBL]);
let Lab_Bench_Height = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Height');
Lab_Bench_Height.append([0], [LBH]);
let Lab_Bench_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Start_Position');
Lab_Bench_Start_Position.append([0], [LBSP]);
let Lab_Bench_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Count');
Lab_Bench_Count.append([0], [LBC]);

// Pegboard_Length: 52
// Pegboard_Start_Position
// Pegboard_Count

let PBL = document.getElementById('PBLength').value;
let PBSP = document.getElementById('PBPosition').value;
let PBC = document.getElementById('PBCount').value;

let Pegboard_Length = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Length');
Pegboard_Length.append([0], [PBL]);
let Pegboard_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Start_Position');
Pegboard_Start_Position.append([0], [PBSP]);
let Pegboard_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Count');
Pegboard_Count.append([0], [PBC]);

// Wall_Cabinet_Type: 1:1:2
// Wall_Cabinet_Start_Position
// Wall_Cabinet_Count

let WCT = document.getElementById('WCType').value;
let WCSP = document.getElementById('WCPosition').value;
let WCC = document.getElementById('WCCount').value;

let Wall_Cabinet_Type = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Type');
Wall_Cabinet_Type.append([0], [WCT]);
let Wall_Cabinet_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Start_Position');
Wall_Cabinet_Start_Position.append([0], [WCSP]);
let Wall_Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Count');
Wall_Cabinet_Count.append([0], [WCC]);

// Cabinet_Type: 1:2:3
// Cabinet_Type_Base: 1:3:3
// Cabinet_Start_Position
// Cabinet_Count

let CT = document.getElementById('CType').value;
let CTB = document.getElementById('CBType').value;
let CSP = document.getElementById('CPosition').value;
let CC = document.getElementById('CCount').value;

let Cabinet_Type = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Type');
Cabinet_Type.append([0], [CT]);
let Cabinet_Type_Base = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Type_Base');
Cabinet_Type_Base.append([0], [CTB]);
let Cabinet_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Start_Position');
Cabinet_Start_Position.append([0], [CSP]);
let Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Count');
Cabinet_Count.append([0], [CC]);



rhino3dm().then(async m => {
    console.log('Loaded rhino3dm.');
    rhino = m; // global


    // authenticate
    //RhinoCompute.authToken = RhinoCompute.getAuthToken();
    RhinoCompute.authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwIjoiUEtDUyM3IiwiYyI6IkFFU18yNTZfQ0JDIiwiYjY0aXYiOiJPM1hQbG8wVjlsNHBTcXdKOWM4V1pnPT0iLCJiNjRjdCI6ImFxSm9FU21IYTYxK3pyZUpYRGZmSlFESGtNNHBMN3BWUkI1dmJFdHlUVTFpaWxickRldDBXc1dKL09EQ2gyWU0xWXlOR2ZBUnlyTUxXejY4cVJBYm96Z0Vxb2puNnZVb3dKMXlIRDBwSFBPU25mZ1N2V0VhMlBmdWxUK0pZRzM5dllFeDh3eVcxR2YwOEphaTFxUVZtNkFOQ010WXE3YTVSRm9NbWhhQ3BTbTh1eW9hTkx0SjN2aWRtZEdlcmVDREk3L04xdHhZT3ZqeWNlUFltbVUzYmc9PSIsImlhdCI6MTU4NTkyMTUxOX0.XwfN99fcj6nYD0O0YNS4tg_qxoEX-rUEkVO2Tlvuxso"


    // if you have a different Rhino.Compute server, add the URL here:
    //RhinoCompute.url = "";

    // load a .gh (binary) file!
     let url = 'Casework10.gh';
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

//     Lab_Bench_Width: 30
    // Lab_Bench_Length: 72
    // Lab_Bench_Height: 37
    // Lab_Bench_Start_Position
    // Lab_Bench_Count

    // Pegboard_Length: 52
    // Pegboard_Start_Position
    // Pegboard_Count

    // Wall_Cabinet_Type: 1:1:2
    // Wall_Cabinet_Start_Position
    // Wall_Cabinet_Count

    // Cabinet_Type: 1:2:3
    // Cabinet_Type_Base: 1:3:3
    // Cabinet_Start_Position
    // Cabinet_Count

    trees.push(Lab_Bench_Width);
    trees.push(Lab_Bench_Length);
    trees.push(Lab_Bench_Height);
    trees.push(Lab_Bench_Start_Position);
    trees.push(Lab_Bench_Count);

    trees.push(Pegboard_Count);
    trees.push(Pegboard_Length);
    trees.push(Pegboard_Start_Position);

    trees.push(Wall_Cabinet_Count);
    trees.push(Wall_Cabinet_Start_Position);
    trees.push(Wall_Cabinet_Type);

    trees.push(Cabinet_Count);
    trees.push(Cabinet_Start_Position);
    trees.push(Cabinet_Type_Base);
    trees.push(Cabinet_Type);



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

        for(let i = 0; i <19; i++){
            data = JSON.parse(result.values[0].InnerTree['{ 0; }'][i].data);
            mesh = rhino.CommonObject.decode(data);
            material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                 color: hexColors[i],
                transparent: false,
            });
            threeMesh = meshToThreejs(mesh, material);
            scene.add(threeMesh);
        }

        


        // data = JSON.parse(result.values[0].InnerTree['{ 0; }'][2].data);
        // mesh = rhino.CommonObject.decode(data);

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

    var LabBenchCheck = true;
    LabBenchCheck = document.getElementById('LBChecked').checked;

    var CabinetCheck = true;
    CabinetCheck = document.getElementById('CChecked').checked;

    var WallCheck = true;
    WallCheck = document.getElementById('WSChecked').checked;

    console.log(LabBenchCheck);

    // show spinner
    // document.getElementById('loader').style.display = 'block';

    // get slider values
    LBL = document.getElementById('LBLength').value;
    LBW = document.getElementById('LBWidth').value;
    LBH = document.getElementById('LBHeight').value;
    LBSP = document.getElementById('LBPosition').value;
    LBC = document.getElementById('LBCount').value;
    
    Lab_Bench_Width = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Width');
    Lab_Bench_Width.append([0], [LBW]);
    Lab_Bench_Length = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Length');
    Lab_Bench_Length.append([0], [LBL]);
    Lab_Bench_Height = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Height');
    Lab_Bench_Height.append([0], [LBH]);
    Lab_Bench_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Start_Position');
    Lab_Bench_Start_Position.append([0], [LBSP]);
    if(LabBenchCheck){
        Lab_Bench_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Count');
    Lab_Bench_Count.append([0], [LBC]);
    }else{
        Lab_Bench_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Lab_Bench_Count');
        Lab_Bench_Count.append([0], [0]);
    }
    
    
    // Pegboard_Length: 52
    // Pegboard_Start_Position
    // Pegboard_Count
    
    PBL = document.getElementById('PBLength').value;
    PBSP = document.getElementById('PBPosition').value;
    PBC = document.getElementById('PBCount').value;
    
    Pegboard_Length = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Length');
    Pegboard_Length.append([0], [PBL]);
    Pegboard_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Start_Position');
    Pegboard_Start_Position.append([0], [PBSP]);
    // Pegboard_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Count');
    // Pegboard_Count.append([0], [PBC]);

    if(WallCheck){
        Pegboard_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Count');
        Pegboard_Count.append([0], [PBC]);
    }else{
        Pegboard_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Pegboard_Count');
        Pegboard_Count.append([0], [0]);
    }
    
    // Wall_Cabinet_Type: 1:1:2
    // Wall_Cabinet_Start_Position
    // Wall_Cabinet_Count
    
    WCT = document.getElementById('WCType').value;
    WCSP = document.getElementById('WCPosition').value;
    WCC = document.getElementById('WCCount').value;
    
    Wall_Cabinet_Type = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Type');
    Wall_Cabinet_Type.append([0], [WCT]);
    Wall_Cabinet_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Start_Position');
    Wall_Cabinet_Start_Position.append([0], [WCSP]);
    // Wall_Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Count');
    // Wall_Cabinet_Count.append([0], [WCC]);

    if(WallCheck){
        Wall_Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Count');
        Wall_Cabinet_Count.append([0], [WCC]);
    }else{
        Wall_Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Wall_Cabinet_Count');
        Wall_Cabinet_Count.append([0], [0]);
    }
    
    // Cabinet_Type: 1:2:3
    // Cabinet_Type_Base: 1:3:3
    // Cabinet_Start_Position
    // Cabinet_Count
    
    CT = document.getElementById('CType').value;
    CTB = document.getElementById('CBType').value;
    CSP = document.getElementById('CPosition').value;
    CC = document.getElementById('CCount').value;
    
    Cabinet_Type = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Type');
    Cabinet_Type.append([0], [CT]);
    Cabinet_Type_Base = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Type_Base');
    Cabinet_Type_Base.append([0], [CTB]);
    Cabinet_Start_Position = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Start_Position');
    Cabinet_Start_Position.append([0], [CSP]);
    // Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Count');
    // Cabinet_Count.append([0], [CC]);

    if(CabinetCheck){
        Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Count');
    Cabinet_Count.append([0], [CC]);
    }else{
        Cabinet_Count = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Cabinet_Count');
        Cabinet_Count.append([0], [0]);
    }

    // scene.traverse(child => {
    //     if(child.type === 'Mesh'){
    //         scene.remove(child);
    //     }
    // });

    numElements = scene.children.length;

    for(let i = 0; i< numElements; i++){
        if(scene.children[i].type === 'Mesh'){
            scene.remove(scene.children[i]);
            numElements--;
            i--;
        }
    }

    // while(scene.children.length > 0){
    //   scene.remove(scene.children[0]);
    // }

    // var ambient_light = new THREE.AmbientLight(0x333333);
    // scene.add(ambient_light);

    // var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // directionalLight.position.set(0, -1, -1);
    // scene.add(directionalLight);

    // var point_light = new THREE.PointLight(0xffffff);
    // point_light.position.x = 20;
    // point_light.position.y = 50;
    // point_light.position.z = 100;
    // scene.add(point_light);

    compute();
}

// BOILERPLATE //




var scene, camera, renderer, controls;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(1,1,1);
    camera = new THREE.PerspectiveCamera( 40, 2, 1, 1000 );


    var ambient_light = new THREE.AmbientLight(0x999999);
    scene.add(ambient_light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.33);
    directionalLight.position.set(0, -1, -1);
    scene.add(directionalLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.33);
    directionalLight.position.set(-1, -1, 1);
    scene.add(directionalLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.33);
    directionalLight.position.set(1, -1, 0);
    scene.add(directionalLight);

    // var point_light = new THREE.PointLight(0xffffff);
    // point_light.position.x = 20;
    // point_light.position.y = 50;
    // point_light.position.z = 100;
    // scene.add(point_light);

    renderer = new THREE.WebGLRenderer({canvas: document.querySelector("canvas"), antialias: true});




    var canvas = document.getElementById('canvas');
    renderer.setSize((canvas.clientWidth), (canvas.clientHeight));

    // canvas.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement  );

    // camera.position.z = 70;
    camera.position.set(15,2,5); // Set position like this
    // camera.lookAt(new THREE.Vector3(20,20,0)); // Set look at coordinate like this

    // window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'resize', resizeCanvasToDisplaySize, false );

    animate();
}

var animate = function () {
    requestAnimationFrame( animate );
    // console.log(camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
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
