<template>
  <div class="crash" ref="box">
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import Stats from 'stats.js';
import * as dat from 'dat.gui';

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
let animation: boolean = false;
let box!: THREE.Mesh;
let material!: THREE.MeshBasicMaterial;
const materials: THREE.MeshBasicMaterial[] = [];
@Component
class Texture extends Vue {
  mounted() {
    this.init();
    this.animate();
  }
  beforeDestroy() {
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
  public init(): void {
    const { width, height } = this.boxComp;
    const textureLoader = new THREE.TextureLoader();
    const bg = textureLoader.load('./textureBg.jpeg');
    const boxBg = textureLoader.load('./crate.gif');
    boxBg.mapping = THREE.UVMapping;
    const one = textureLoader.load('./1.jpeg');
    const two = textureLoader.load('./2.jpeg');
    const three = textureLoader.load('./3.jpeg');

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    // 添加网格帮助器
    scene.add(new THREE.GridHelper(20, 10));
    // 添加主标轴帮助器
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // const light = new THREE.DirectionalLight(0xffffff, 2);
    // light.position.set(1, 1, 1);
    // scene.add(light);

    const geometry = new THREE.BoxBufferGeometry(4, 4, 4);
    material = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    const oneMat = new THREE.MeshBasicMaterial({ map: one });
    const twoMat = new THREE.MeshBasicMaterial({ map: two });
    const threeMat = new THREE.MeshBasicMaterial({ map: three });
    materials.push(oneMat, threeMat, oneMat, twoMat, twoMat, threeMat);
    box = new THREE.Mesh(geometry, material);
    scene.add(box);
    // 初始化帧数检测
    stats = new Stats();
    document.body.appendChild(stats.dom);
    // 初始化gui
    gui = new dat.GUI();
    const params = {
      bg: false,
      boxBg: false,
      animation: false,
      materials: false
    };
    const bgController = gui.add(params, 'bg');
    const boxBgController = gui.add(params, 'boxBg');
    const aniController = gui.add(params, 'animation');
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
      animation = value;
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
    if (animation) {
      // 开启动画
      box.rotation.x = (box.rotation.x + 0.01) % (Math.PI * 2);
      box.rotation.y = (box.rotation.x + 0.04) % (Math.PI * 2);
    }
    renderer.render(scene, camera);
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