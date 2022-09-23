import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/* import table from '../../assets/models/android.glb' 
import react from '../../assets/models/react.glb' */
import pixel3Dobj1 from '../../assets/models/scene (1).glb'
/* import pixel3Dobj2 from '../../assets/models/scene (2).glb'
 */import pixel3Dobj3 from '../../assets/models/scene (3).glb'
/* import pixel3Dobj4 from '../../assets/models/scene (4).glb'
 */import pixel3Dobj5 from '../../assets/models/scene (5).glb'
/* import pixel3Dobj6 from '../../assets/models/scene (6).glb'
import pixel3Dobj7 from '../../assets/models/scene (7).glb'
import pixel3Dobj8 from '../../assets/models/scene (8).glb'
import pixel3Dobj9 from '../../assets/models/scene (9).glb'
import pixel3Dobj10 from '../../assets/models/scene (10).glb'
import pixel3Dobj11 from '../../assets/models/scene (11).glb' */

/* import computer from '../../assets/models/computer.glb'
 */
import map1 from "../../assets/pictures/landingpage/pixelartmap.jpg"
/* import map2 from "../../assets/pictures/landingpage/pixelartmap2.jpg"
 */
/* import earthTexture from '../../assets/pictures/landingpage/01-3.jpg'
import earthBump from '../../assets/pictures/landingpage/earthbump1k.jpg' */
import earthSpec from '../../assets/pictures/landingpage/earthspec1k.jpg'
import cloudMapTrans from '../../assets/pictures/landingpage/earthcloudmaptrans.jpg'




class Home extends Component {

    state = { width: window.innerWidth, height: window.innerHeight };


    componentDidMount() {




        var test;
        var rotateObj2;
        var rotateObj3;
        var rotateObj4;
        var rotateObj5;

        var rotateObj6;

        var camera, scene, renderer;
        var mesh;
        var cloudy;
        var controls;

        //main planet sizes
        let r = 1.5;
        let d = 15;
        let e = 15;

        init();
        animate();

        function init() {

            //erzeugen eines 3js objektes
            renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#earth"), antialias: true, alpha: true });
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFShadowMap;
            renderer.setPixelRatio(window.devicePixelRatio);
            const canvasContainer = document.querySelector('#divEarth');
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);


            let aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight
            camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
            camera.position.z = -105;

            scene = new THREE.Scene();


            controls = new OrbitControls(camera, document.querySelector("#earth"));
            controls.target.set(0, 0, 0);
            controls.enableDamping = false;
            controls.enableRotate = true;
            controls.enableZoom = false;
            controls.update();


            const loader = new THREE.TextureLoader();

            loader.setCrossOrigin("true");

            //-----------------PLAIN EARTH-------------------------

            /*  const texture = loader.load( 'https://drive.google.com/uc?export=download&id=16a758OvTovkIz_bilprEDxqj3EAPKoDL' );
             const earthBumpMap = loader.load( 'https://drive.google.com/uc?export=download&id=/14MqoHVKDhKpKkS1porPq8vxdk9853ZXz');
             const earthSpecMap = loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg'); */


            let image = document.createElement('img');
            //image über api call laden 
            image.src = 'data:image/png;base64,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'



            const texture = loader.load(map1); //wird geladen von privatem google drive account
            // const earthBumpMap = loader.load(earthBump);
            const earthSpecMap = loader.load(earthSpec)


            var geometry = new THREE.SphereGeometry(r, d, e);
            var material = new THREE.MeshPhongMaterial({

                map: texture,
                // bumpMap: earthBumpMap,
                specularMap: earthSpecMap,
                bumpScale: 1,
                shininess: 1
            })


            mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x += 0.5;
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.layers.set(0);



            //------------------------ATMOSPHERE------------------------------------

            //custom shader material 
            const atmosphericGlow = new THREE.Mesh(
                new THREE.SphereGeometry(r, d, e),
                new THREE.ShaderMaterial(
                    {
                        vertexShader: `
              varying vec3 vertexNormal;
              void main()
              {
                  vertexNormal = normalize(normalMatrix * normal);
                  gl_Position = projectionMatrix*modelViewMatrix * vec4(position, 1.0);
    
              }`,
                        fragmentShader: `
              varying vec3 vertexNormal;
              void main()
              {
                  float intensity = pow(0.7 - dot(vertexNormal, vec3(0,0,1.0)), 2.0);
    
                  gl_FragColor = vec4(0.0, 0.58, 0.86, 1.0) * intensity;
              }`,
                        blending: THREE.AdditiveBlending,
                        side: THREE.BackSide
                    }
                )



                //custom shader material

            )

            atmosphericGlow.scale.set(1.1, 1.1, 1.1)


            //----------------------CLOUDS----------------------------------------
            var cloudGeometry = new THREE.SphereGeometry(1.45, d, e);
            const texture2 = new THREE.TextureLoader().load(cloudMapTrans);

            //Cloud Geomtry and Material
            var cloudMaterial = new THREE.MeshBasicMaterial({
                map: texture2,
                transparent: true,
                opacity: 0.3

            });

            cloudy = new THREE.Mesh(cloudGeometry, cloudMaterial);
            cloudy.rotation.x -= 0.003;
            cloudGeometry.scale(1.1, 1.1, 1.1);



            //-------------------------------Orbiting test2 -----------------------------------------------

            const GLTFloader = new GLTFLoader();
            let obj = null;

            GLTFloader.setCrossOrigin("true");



            // --------------------------orbiting table--------------------------------------------------------------

            // modelle koennen alternativ von einem google drive account geladen werden

            // GLTFloader.load('https://drive.google.com/uc?export=download&id=1_DDFce6V9xlJ8kJo_eRAZdURPYKGf8wC', function(glb) {


            test = new THREE.Mesh(cloudGeometry, cloudMaterial);

            GLTFloader.load(pixel3Dobj1, function (glb) {  //smiley

                test = glb.scene;

                glb.scene.scale.set(0.1, 0.1, 0.1)
                glb.scene.position.x = -3;
                glb.scene.rotation.x -= 0.5;
                scene.add(glb.scene);
                var orbitingObjPivot2 = new THREE.Object3D();
                mesh.add(orbitingObjPivot2);
                orbitingObjPivot2.add(glb.scene);
            });

            //-------------------------------orbiting pc -----------------------------------------------------

            rotateObj2 = new THREE.Mesh();
            GLTFloader.load(pixel3Dobj3, function (glb) {   //pikachu

                rotateObj2 = glb.scene;
                glb.scene.scale.set(0.0001, 0.0001, 0.0001)

                glb.scene.position.x = 3;
                glb.scene.rotation.x -= 0.5;
                scene.add(glb.scene);
                var orbitingObjPivot3 = new THREE.Object3D();
                mesh.add(orbitingObjPivot3);
                orbitingObjPivot3.add(glb.scene);
            });


            //python
            rotateObj3 = new THREE.Mesh();

            GLTFloader.load(pixel3Dobj5, function (glb) {  //violet man

                rotateObj3 = glb.scene;
                glb.scene.scale.set(0.04, 0.04, 0.04)
                glb.scene.position.z = -2
                glb.scene.position.x = 0;
                glb.scene.position.y = 2;
                glb.scene.rotation.x -= 0.5;
                scene.add(glb.scene);
                var orbitingObjPivot4 = new THREE.Object3D();
                mesh.add(orbitingObjPivot4);
                orbitingObjPivot4.add(glb.scene);
            });

            /*            
            
                        // react
                        rotateObj4 = new THREE.Mesh();
            
                        GLTFloader.load(pixel3Dobj6, function (glb) { //pirat
            
                            rotateObj4 = glb.scene;
                            glb.scene.scale.set(0.03, 0.03, 0.03)
                            glb.scene.position.z = -2
                            glb.scene.position.x = 0;
                            glb.scene.position.y = -2;
                           // glb.scene.rotation.x -= 0.5;
                            scene.add(glb.scene);
                            var orbitingObjPivot5 = new THREE.Object3D();
                            mesh.add(orbitingObjPivot5);
                            orbitingObjPivot5.add(glb.scene);
                        });
            
                        rotateObj5 = new THREE.Mesh();
            
                        GLTFloader.load(pixel3Dobj9, function (glb) { //owl
            
                            rotateObj5 = glb.scene;
                            glb.scene.scale.set(0.005, 0.005, 0.005)
                            glb.scene.position.z = 2;
                            glb.scene.position.x = 2;
                            glb.scene.position.y = 0;
                            glb.scene.rotation.x -= 0.5;
                            scene.add(glb.scene);
                            var orbitingObjPivot6 = new THREE.Object3D();
                            mesh.add(orbitingObjPivot6);
                            orbitingObjPivot6.add(glb.scene);
                        });
                        rotateObj6 = new THREE.Mesh();
            
                        GLTFloader.load(pixel3Dobj10, function (glb) { //rainbow
            
                            rotateObj6 = glb.scene;
                            //glb.scene.scale.set(0.005, 0.005, 0.005)
                            glb.scene.position.z = -2;
                            glb.scene.position.x = 2;
                            glb.scene.position.y = 0;
                            glb.scene.rotation.x -= 0.5;
                            scene.add(glb.scene);
                            var orbitingObjPivot7 = new THREE.Object3D();
                            mesh.add(orbitingObjPivot7);
                            orbitingObjPivot7.add(glb.scene);
                        }); */

            //-----------------------------PLANET------------------------------

            let planet = new THREE.Object3D();

            planet.add(mesh);
            planet.add(atmosphericGlow);
            planet.add(cloudy);



            // planet.position.z = -20;
            planet.position.z = -94;
            scene.add(planet);

            // camera.lookAt(planet);

            controls.target = planet.position;
            /* 
                        const tween1 = new TWEEN.Tween({ x: 0, y: 0, z: 200 }).to({
                            x: -
                                0, y: 0, z: -94
                        }, 2000).onUpdate(function (object) {
                            planet.position.set(object.x, object.y, object.z);
                        })
            
            
                        tween1.start();
             */



            var light = new THREE.DirectionalLight(0xffffff, 2);
            light.position.set(0, 1, -250).normalize();
            light.castShadow = true;

            scene.add(light);




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
            controls.update();

            /* TWEEN.update(); */
            // obj.rotation.x += 0.005;
            test.rotation.y += 0.01;
            test.rotation.x += 0.01;

            rotateObj2.rotation.y += 0.01;
            rotateObj2.rotation.x += 0.01;

            rotateObj3.rotation.y += 0.01;
            rotateObj3.rotation.x += 0.01;
            /* 
                       rotateObj4.rotation.y += 0.01;
                       rotateObj4.rotation.x += 0.01;
            
                       rotateObj5.rotation.y += 0.01;
                       rotateObj5.rotation.x += 0.01;
            
                       rotateObj6.rotation.y += 0.01;
                       rotateObj6.rotation.x += 0.01; */

            mesh.rotation.y += 0.005;
            cloudy.rotation.y -= 0.003;
            renderer.render(scene, camera);
            renderer.clearDepth();
            camera.layers.set(0);
            requestAnimationFrame(animate);
        }



        window.addEventListener('resize', this.updateDimensions);


    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };


    render() {
        return (
            <div id='mainDiv'

                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#101522'
/*                     height: '800hv'
 */                }}>







                <div>




                    {/*                 <p style={{ color: 'green' }}>Window size: {this.state.width} x {this.state.height} </p>
                    <p style={{ color: 'red' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,

                    </p>
                    <p style={{ color: 'red' }}>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p style={{ color: 'red' }}> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <p style={{ color: 'red' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                    <p style={{ color: 'red' }}> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

 */}





                </div>








                {this.state.width > 1200 ? (<div id='divEarth'

                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right',

                        height: '100vh',
                        width: '100vh'

                    }}
                >


                    <canvas id='earth'></canvas>
                </div>) : (

                    <div id='divEarth'>
                        <canvas
                            style={{
                                display: 'flex',
                                justifyContent: 'right',
                                alignItems: 'right',

                                height: '350px',
                                width: '320px'

                            }} id='earth'></canvas>
                    </div>
                )}
                <div>
             </div>
            </div>


        );
    }
}

export default Home;