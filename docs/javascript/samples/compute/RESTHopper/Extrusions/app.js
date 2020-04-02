let args1 = {
    algo : null,
    pointer : null,
    values : []
};

let definition1 = null;

// get slider values
let count1 = document.getElementById('count').value;
let radius1 = document.getElementById('radius').value;
let length1 = document.getElementById('length').value;

let param11 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Length');
param11.append([0], [length]);

let param21 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Radius');
param21.append([0], [radius]);

let param31 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Count');
param31.append([0], [count]);

rhino3dm().then(async m => {
    console.log('Loaded rhino3dm.');
    rhino = m; // global


    // authenticate
    //RhinoCompute.authToken = RhinoCompute.getAuthToken();
    RhinoCompute.authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwIjoiUEtDUyM3IiwiYyI6IkFFU18yNTZfQ0JDIiwiYjY0aXYiOiJzdnRZNGVtMTREZE5CZUF2NGoxWEJnPT0iLCJiNjRjdCI6IitoUkt6cTI2dk1wMWpCM2cydFE0SkJaRHFKaFp6UUN0NElqajl6a3JEYjBFRks5bWdzN0xCQk9rVUZuVENaVncxeis3czBBUXFCWi9IdllzYkcvUXpQNit5elk1VjgwL3hUMGFwZm1WaW5PNG1HWndXY1g3RDNwZTRYd1orblZGVzdIT0VYZ3N6UHhpNm12cGQ0VnZpdnRDcmZjZUU4VmhpbkJjcExhdmIxdkRFNHl5VzgvUDVzOVViUzJKbEhxeHRhL1lXSnJNVmxZWjh2WGQ1Mi9DTXc9PSIsImlhdCI6MTU4NTc3MDYxN30.vr3jR9B6rjSrZwkNnB6s48zZGPfpaEsz3fVj8ufjAfc"


    // if you have a different Rhino.Compute server, add the URL here:
    //RhinoCompute.url = "";

    // load a .gh (binary) file!
     let url1 = 'BranchNodeRnd.gh';
     let res1 = await fetch(url1);
     let buffer1 = await res1.arrayBuffer();
     let arr1 = new Uint8Array(buffer1);
     definition1 = arr1;

    // try this instead to load a .ghx (xml) file!
    //let url = 'BranchNodeRnd.ghx';
    //let res = await fetch(url);
    //let text = await res.text();
    //definition = text;

    compute1();
});

function compute1(){

    // clear values
    let trees = [];

    trees.push(param1);
    trees.push(param2);
    trees.push(param3);

    RhinoCompute.Grasshopper.evaluateDefinition(definition1, trees).then(result => {
        // RhinoCompute.computeFetch("grasshopper", args).then(result => {
        console.log(result);

        // hide spinner
        document.getElementById('loader').style.display = 'none';

        let data = JSON.parse(result.values[0].InnerTree['{ 0; }'][0].data);
        let mesh = rhino.CommonObject.decode(data);

        let material = new THREE.MeshNormalMaterial();
        let threeMesh = meshToThreejs1(mesh, material);

        // clear meshes from scene
        scene.traverse(child => {
            if(child.type === 'Mesh'){
                scene.remove(child);
            }
        });

        scene.add(threeMesh);
    });
}

function onSliderChange1(){

    // show spinner
    document.getElementById('loader').style.display = 'block';

    // get slider values
    count = document.getElementById('count').value;
    radius = document.getElementById('radius').value;
    length = document.getElementById('length').value;

    param1 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Length');
    param1.append([0], [length]);

    param2 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Radius');
    param2.append([0], [radius]);

    param3 = new RhinoCompute.Grasshopper.DataTree('RH_IN:201:Count');
    param3.append([0], [count]);

    compute();
}

// BOILERPLATE //


function meshToThreejs1(mesh1, material) {
    let loader = new THREE.BufferGeometryLoader();
    var geometry1 = loader.parse(mesh1.toThreejsJSON());
    return new THREE.Mesh(geometry1, material);
}
