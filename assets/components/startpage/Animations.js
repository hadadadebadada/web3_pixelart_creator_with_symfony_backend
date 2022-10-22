import React, { Component } from 'react';
import * as THREE from "three"
import "./pixelartcreator/Pixelart.css"
import AOS from 'aos';
import "aos/dist/aos.css"
import { createNFTData, getAllNFTs, getNFT } from "../api";
import {
    BoxBufferGeometry,
    Mesh,
    MeshLambertMaterial,
    TextureLoader
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
class Animations extends Component {

    state = { width: window.innerWidth, height: window.innerHeight, halfWidth: window.innerWidth / 2, pic: "", totalItems:0};


    componentDidMount() {
        AOS.init({
            duration: 1200,
        });



        const scene = new THREE.Scene();
        const light = new THREE.AmbientLight( 0x404040, 6 ); // soft white light
        scene.add( light );
        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        const canvasContainer = document.querySelector('#divR');
        renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);


        let aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.z = 2


            const controls = new OrbitControls(camera, renderer.domElement)

           controls.target.set(0, 0, 0);
           controls.enableDamping = true;
           controls.enableRotate = true;
           controls.enableZoom = false;
           controls.update();



        getAllNFTs().then((lastItemID)=>{
            this.setState({totalItems:lastItemID["hydra:totalItems"]}, () =>{

                getNFT(this.state.totalItems).then((data)=>{
                    const geometry = new BoxBufferGeometry(1, 1, 1);
                    let image = document.createElement('img');
                    image.src = data.name
                    var loader = new TextureLoader();
                    var mats = [
                        image.src, //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
                        image.src,
                        image.src,
                        image.src,
                        image.src,
                        image.src,
                    ].map(pic => {
                        return new MeshLambertMaterial({map: loader.load(pic)});
                    });

                    const cube = new Mesh(geometry, mats);



                    scene.add(cube);

                    function animate() {
                        //resize();
                        controls.update();
                        requestAnimationFrame(animate)

                        cube.rotation.x += 0.001
                        cube.rotation.y += 0.001

                        renderer.clearDepth();
                        renderer.render(scene, camera);
                        camera.layers.set(0);
                        render()
                    }
                    animate();
                })
            });

        })


        getNFT(this.state.totalItems).then((data)=>{
            this.setState({pic:data.name})
        })


        function animate() {
         //   resize();
            requestAnimationFrame(animate)
            renderer.clearDepth();
            renderer.render(scene, camera);
            camera.layers.set(0);
            render()
        }

        function render() {
            renderer.render(scene, camera)
        }

        animate()

        window.addEventListener('resize', this.updateDimensions);
        window.addEventListener('mousemove', this.updateDimensions);

    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight, halfWidth: window.innerWidth / 2 });
    };


    render() {
        return (


            <div id='mainDiv'

                 style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     backgroundColor: '#101522',
                     height: '100hv',

                 }}
            >

                <div id='divR'

                     style={{
                         display: 'flex',
                         justifyContent: 'right',
                         alignItems: 'right',
                         marginTo: '50px',

                         height: this.state.height/2,
                         width: this.state.width/2

                     }}
                >
                    <canvas style={{ overflow : 'hidden'}} id='c'></canvas>
                </div>

            </div>


        );
    }
}

export default Animations;