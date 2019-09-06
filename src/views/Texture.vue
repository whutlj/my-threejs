<template>
  <div class="crash" ref="box">
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import { Vector3 } from 'three';

interface BoxSize {
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
}
let camera!: THREE.Camera;
let scene!: THREE.Scene;
let renderer!: THREE.WebGLRenderer;
let stats!: Stats;
let gui!: dat.GUI;
let animationX: boolean = false;
let animationY: boolean = false;
let box!: THREE.Mesh;
let material!: THREE.MeshBasicMaterial;
const materials: THREE.MeshBasicMaterial[] = [];
const mouse: THREE.Vector2 = new THREE.Vector2();
@Component
class Texture extends Vue {
  mounted() {
    this.init();
    this.animate();
    document.documentElement.addEventListener('keydown', this.keydown);
  }
  beforeDestroy() {
    document.documentElement.removeEventListener('keydown', this.keydown);
    document.body.removeChild(stats.dom);
    gui.destroy();
  }
  get boxRef(): HTMLElement {
    return this.$refs.box as HTMLElement;
  }
  get boxComp(): BoxSize {
    const width = (this.$refs.box as HTMLElement).offsetWidth;
    const height = (this.$refs.box as HTMLElement).offsetHeight;
    const offsetLeft = (this.$refs.box as HTMLElement).offsetLeft;
    const offsetTop = (this.$refs.box as HTMLElement).offsetTop;
    return {
      width,
      height,
      offsetTop,
      offsetLeft
    };
  }
  keydown(event: KeyboardEvent) {
    const { keyCode } = event;
    if (keyCode === 38) {
      // 上移动
      camera.position.y++;
    } else if (keyCode === 40) {
      camera.position.y--;
    } else if (keyCode === 37) {
      camera.position.x--;
    } else if (keyCode === 39) {
      camera.position.x++;
    }
  }
  public init(): void {
    const { width, height } = this.boxComp;
    const textureLoader = new THREE.TextureLoader();
    const bg = textureLoader.load('./bgt.jpeg');
    const boxBg = textureLoader.load('./crate.gif');
    boxBg.mapping = THREE.UVMapping;
    const one = textureLoader.load('./1.jpeg');
    const two = textureLoader.load('./2.jpg');
    const three = textureLoader.load('./3.jpeg');
    const four = textureLoader.load('./4.jpeg');
    const five = textureLoader.load('./5.jpg');
    const six = textureLoader.load('./6.jpeg');

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    // 添加网格帮助器
    scene.add(new THREE.GridHelper(20, 10));
    // 添加主标轴帮助器
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    // 添加相机帮助器
    // const helper = new THREE.CameraHelper(camera);
    // scene.add(helper);

    const geometry = new THREE.BoxBufferGeometry(4, 4, 4);
    material = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    const oneMat = new THREE.MeshBasicMaterial({ map: one });
    const twoMat = new THREE.MeshBasicMaterial({ map: two });
    const threeMat = new THREE.MeshBasicMaterial({ map: three });
    const fourMat = new THREE.MeshBasicMaterial({ map: four });
    const fiveMat = new THREE.MeshBasicMaterial({ map: five });
    const sixMat = new THREE.MeshBasicMaterial({ map: six });
    materials.push(oneMat, twoMat, oneMat, fourMat, fiveMat, sixMat);
    box = new THREE.Mesh(geometry, material);
    // 初始化帧数检测
    stats = new Stats();
    document.body.appendChild(stats.dom);
    // 初始化gui
    gui = new dat.GUI();
    const params = {
      object: false,
      bg: false,
      boxBg: false,
      animationX: false,
      animationY: false,
      materials: false
    };
    const objectController = gui.add(params, 'object');
    const bgController = gui.add(params, 'bg');
    const boxBgController = gui.add(params, 'boxBg');
    const aniController = gui.add(params, 'animationX');
    const aniyController = gui.add(params, 'animationY');
    const matController = gui.add(params, 'materials');
    // 场景背景
    bgController.onChange((value: boolean) => {
      if (value) {
        return (scene.background = bg);
      }
      scene.background = null;
    });
    // 立方体背景
    boxBgController.onChange((value: boolean) => {
      value ? (material.map = boxBg) : (material.map = null);
      material.needsUpdate = true;
    });
    // 立方体动画
    aniController.onChange((value: boolean) => {
      animationX = value;
    });
    // 立方体动画
    aniyController.onChange((value: boolean) => {
      animationY = value;
    });
    // 立方体动画
    objectController.onChange((value: boolean) => {
      if (value) {
        scene.add(box);
      } else {
        scene.remove(box);
      }
    });
    // 材料
    matController.onChange((value: boolean) => {
      if (value) {
        box.material = materials;
        return;
      }
      box.material = material;
    });
    // 初始化renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.boxRef.appendChild(renderer.domElement);
  }
  public animate(): void {
    window.requestAnimationFrame(this.animate);
    this.renderFn();
    stats.update();
  }
  public renderFn(): void {
    if (animationX) {
      // 开启动画
      box.rotation.x = (box.rotation.x + 0.01) % (Math.PI * 2);
    }
    if (animationY) {
      box.rotation.y = (box.rotation.y + 0.01) % (Math.PI * 2);
    }
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // camera.position.x += (mouse.x - camera.position.x) * 0.000005;
    // // camera.position.y += (-mouse.y - camera.position.y) * 0.05;
    renderer.render(scene, camera);
  }
  mouseMove(event: MouseEvent): void {
    const { offsetLeft, offsetTop } = this.boxComp;
    mouse.x = event.clientX - offsetLeft;
    mouse.y = event.clientY - offsetTop;
  }
}
export default Texture;
</script>
<style>
.crash {
  width: 100vw;
  height: 100vh;
}
</style>