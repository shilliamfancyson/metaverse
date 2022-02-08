
import 'https://cdn.jsdelivr.net/npm/socket.io-client@3.1.0/dist/socket.io.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
// class BasicCharacterControllerProxy {
//     constructor(){

//     }
// };
// class BasicCharacterController {
//     constructor(){
//         this._input = new BasicCharacterControllerInput();
//         this._stateMachine = new FiniteStateMachine(new BasicCharacterControllerProxy(this));
//         this._LoadModels();
//     }

//     _LoadModels() {
//         const loader = new FBXLoader();
//         loader.setPath('./resources/fbx/');
//         loader.load('Pug.fbx', (fbx) => {
//           fbx.scale.setScalar(0.1);
//           fbx.traverse(c => {
//             c.castShadow = true;
//           });
    
//           this._target = fbx;
//           this._params.scene.add(this._target);
    
//           this._mixer = new THREE.AnimationMixer(this._target);
    
//           this._manager = new THREE.LoadingManager();
//           this._manager.onLoad = () => {
//             this._stateMachine.SetState('walk');
//           };
    
//           const _OnLoad = (animName, anim) => {
//             const clip = anim.animations[0];
//             const action = this._mixer.clipAction(clip);
      
//             this._animations[animName] = {
//               clip: clip,
//               action: action,
//             };
//           };
//         const loader = new FBXLoader(this._manager);
//         loader.setPath('./resources/fbx/');
//         loader.load('Pug.fbx', (a) => { _OnLoad('walk', a); });
//         });
//     };
// };
// class BasicCharacterControllerInput {
//     constructor(){

//     }
// };
// class FiniteStateMachine {
//     constructor(){

//     }
// };

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    this._scene.background = texture;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    // const box = new THREE.Mesh(x
    //   new THREE.BoxGeometry(2, 2, 2),
    //   new THREE.MeshStandardMaterial({
    //       color: 0xFFFFFF,
    //   }));
    // box.position.set(0, 1, 0);
    // box.castShadow = true;
    // box.receiveShadow = true;
    // this._scene.add(box);

    // for (let x = -8; x < 8; x++) {
    //   for (let y = -8; y < 8; y++) {
    //     const box = new THREE.Mesh(
    //       new THREE.BoxGeometry(2, 2, 2),
    //       new THREE.MeshStandardMaterial({
    //           color: 0x808080,
    //       }));
    //     box.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
    //     box.castShadow = true;
    //     box.receiveShadow = true;
    //     this._scene.add(box);
    //   }
    // }

    // const box = new THREE.Mesh(
    //   new THREE.SphereGeometry(2, 32, 32),
    //   new THREE.MeshStandardMaterial({
    //       color: 0xFFFFFF,
    //       wireframe: true,
    //       wireframeLinewidth: 4,
    //   }));
    // box.position.set(0, 0, 0);
    // box.castShadow = true;
    // box.receiveShadow = true;
    // this._scene.add(box);

    document.addEventListener('keyup', (e) => {
        switch(e.keyCode){
            case 87: //w
                this.mainPlayer.position.z += 2.5;
                break;
            
            case 65: //a
                this.mainPlayer.position.x -= 2.5;
                break;
            
            case 83: //s
                this.mainPlayer.position.z -= 2.5;
                break;

            case 68: //d
                this.mainPlayer.position.x += 2.5;
                break;


        }
        this.socket_.emit('pos', this.mainPlayer.position.toArray());
    });
    this.players_ = {};
    this.mainPlayer = null;

    this.socket_ = io('localhost:3000', {transports: ['websocket']});

    this.socket_.on('pos', (d) => {
        const [id, pos] = d;
        
        if (!(id in this.players_)){
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF,
                }));
              box.position.set(...d);
              box.castShadow = true;
              box.receiveShadow = true;
              this._scene.add(box);
              this.players_[id] = box;
              if (!this.mainPlayer) {
                  this.mainPlayer = box;
              }
        }

        this.players_[id].position.set(...pos);
        
    });

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();

    this._RAF();
  }

  _LoadAnimatedModel() {
    const loader = new FBXLoader();
    loader.setPath('./resources/fbx/');
    loader.load('Pug.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
    //   fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath('./resources/fbx/');
      anim.load('Pug.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }

}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});