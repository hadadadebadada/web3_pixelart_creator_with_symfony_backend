import React, { Component } from 'react';
import * as THREE from 'three';
import star from "./sp2.png"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import "../../styles/loginAnimationStyles.css"

//import tableGLB from './donkey.glb'>

import Login from "./Login"


class TorusTunnel2 extends Component {


  constructor(props) {
    super(props);
    this.state = {compo: null};
  }

    componentDidMount(){
      //document.querySelector("#navbar").remove();
      document.querySelector("#torusCanvas").scrollIntoView();
        // Resize your browser & tunnel keeps form
var container = document.querySelector('#torusDiv2');
var renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#torusCanvas'), antialias: true});
var camera = new THREE.PerspectiveCamera(80,window.innerWidth/window.innerHeight,0.1,10000);
var scene = new THREE.Scene();
var mouseX = 0, mouseY = 0;
// Uncomment code below for tunnel steering!
// You will fly through the walls like in Mario Kart, haha.
 var windowHalfX = window.innerWidth / 2;
 var windowHalfY = window.innerHeight / 2;
 
 document.addEventListener( 'mousemove', onDocumentMouseMove, false );

 renderer.setClearColor(new THREE.Color("#1c1624"));
 var light1 = new THREE.AmbientLight(0xffffff, 3);
 light1.position.set(100, 50, 100);
 scene.add(light1);



const geometry = new THREE.BufferGeometry();

const noOfPoints = 3000; //1500;
const getRandomParticelPos = (particleCount) => {
  const arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = (Math.random() - 0.5) * 10;
  }
  return arr;
};
geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(getRandomParticelPos(noOfPoints), 3)
);



const loader = new THREE.TextureLoader();
// create a basic material and set its color
// const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const material = new THREE.PointsMaterial({
  size: 0.1,
  map: loader.load(
    star
  ),
  transparent: true,
  //color: 0x44aa88
});

// create a Mesh
const cube = new THREE.Points(geometry, material);

scene.add(cube);
scene.add(camera);
//scene.background = new THREE.Color( 0xff0000 );

renderer.setSize(window.innerWidth, window.innerHeight);
container.append(renderer.domElement);

// 
window.addEventListener( 'resize', onWindowResize, false );



// Normalmaterial
var normalMaterial = new THREE.MeshNormalMaterial({});


// Torus
function Torus(f){
  this.b = new THREE.Mesh(new THREE.TorusGeometry( 160, 75, 2, 13),normalMaterial);
  this.b.position.x = 57*Math.cos(f);
  this.b.position.y = 57*Math.sin(f);
  this.b.position.z = f*1.25;
  this.b.rotation.z = f*0.03;
}
		
var numTorus = 80;
var tabTorus = [];
for(var i=0; i<numTorus; i++){
  tabTorus.push(new Torus(-i*13));
  scene.add(tabTorus[i].b);
}	


// Update
function update(){
  for(var i=0; i<numTorus; i++){
    tabTorus[i].b.position.z+=2;
    tabTorus[i].b.rotation.z+=i*2/10000;
    if(tabTorus[i].b.position.z>0)
    {
      tabTorus[i].b.position.z=-1000;
    }
  }
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {



  mouseX = ( event.clientX*0.01 - windowHalfX*0.01 );
  mouseY = ( event.clientY*0.01 - windowHalfY*0.01 );
  // console.log(mouseY)
  // console.log(mouseX)


}



   




// Render
function render() {
  requestAnimationFrame( render);
  //tableIcon.rotation.x += 0.01;

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.z += -0.006;
  camera.position.z += -0.004;
  //console.log( camera.position.z)
  renderer.render(scene, camera);
  update();
}

render();
this.removeAnimation();
    }

    removeAnimation() {
      setTimeout(() => {
        console.log('Animation do your thing');
        // setTimeout(window.location.replace("http://127.0.0.1:3000/login2"),5000      )
        setTimeout(document.getElementById("torusCanvas").remove(), 10000);
        window.scrollTo({ top: 0 })

        // var reactCompo = <Login/>
        // document.getElementById("torusDiv2").append(reactCompo);
       

        this.setState({
          compo: <Login/>     
        });
      }, 15000)
    }

    render() {
        return (
    
          <div id='torusDiv2'>
        
            
            
            <canvas id='torusCanvas' ></canvas>
             {this.state.compo}
          </div>
    
        );
      }

}

export default TorusTunnel2;