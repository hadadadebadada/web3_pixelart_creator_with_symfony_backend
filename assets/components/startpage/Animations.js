import React, { Component } from 'react';
import * as THREE from "three"
import "./pixelartcreator/Pixelart.css"
import AOS from 'aos';
import "aos/dist/aos.css"
import Typed from 'react-typed'
class Animations extends Component {

    state = { width: window.innerWidth, height: window.innerHeight, halfWidth: window.innerWidth / 2 };


    componentDidMount() {
        AOS.init({
            duration: 1200,
        });

        const scene = new THREE.Scene();

        const canvas = document.querySelector('#c');
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        const canvasContainer = document.querySelector('#divR');

        renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);


        let aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight
        const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.z = 2

        /*         document.body.appendChild(renderer.domElement);
         */
     /*    const controls = new OrbitControls(camera, canvas)

        controls.target.set(0, 0, 0);
        controls.enableDamping = false;
        controls.enableRotate = false;
        controls.enableZoom = false;
        controls.update(); */

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        })

        const cube = new THREE.Mesh(geometry, material)


        scene.add(cube)

        window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            console.log("resize fired")

            // window.location.refresh();
            // window.location.reload();

            render()

        }

        function resize() {
            var width = renderer.domElement.clientWidth;
            var height = renderer.domElement.clientHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        function animate() {
            resize();

            requestAnimationFrame(animate)

            cube.rotation.x += 0.01
            cube.rotation.y += 0.01

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
        /*         window.addEventListener('resize',canvasContainer.location.reload()); */
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
                    backgroundColor: '#101522'
                    /*  height: '800hv' */
                }}
            >

                <div style={{
                    justifyContent: 'right',
                    alignItems: 'right',

                    height: this.state.height / 2,
                    width: this.state.width / 2

                }}>



                    <div class="md:container md:mx-auto bg-red-666 rounded shadow border p-8 m-10 ..."
                        data-aos="fade-down"
                        style={{
                            borderRadius: '5px'
                            ,
                            display: 'flex',
                            backgroundColor:'#101522',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: this.state.height / 3,
                            width: this.state.width / 1.5
                        }}
                    >
                        <h1 style={{
                            color:"white",
                            fontWeight:"bold",
                            fontSize:"130%"
                        }}>
                            
                                    <Typed 
        className="typed-text"
        strings={["Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", 
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
      ]}
        typeSpeed={30}
        backSpeed={8}
        ></Typed>
                        </h1>
                   
                    </div>




                    {/* <p style={{ color: 'red' }}>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p style={{ color: 'red' }}> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <p style={{ color: 'red' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                    <p style={{ color: 'red' }}> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> */}

                </div>



                {this.state.width > this.state.halfWidth ? (<div id='divR'

                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right',

                        height: this.state.height / 2,
                        width: this.state.width / 2

                    }}
                >


                    <canvas id='c'></canvas>

                </div>) : (<div id='divR'

                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right',

                        height: this.state.height / 5,
                        width: this.state.width / 5

                    }}
                >
                    <canvas style={{ overflow : 'hidden'}} id='c'></canvas>
                </div>)}

                <div>

                </div>

            </div>


        );
    }
}

export default Animations;