<template>
  <div class="box" ref="box">
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import { Mesh } from 'three';

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
const mColor: string = '#ffff00';
const wireframe: boolean = false;
let basicMat!: THREE.MeshBasicMaterial;
let lambertMat!: THREE.MeshLambertMaterial;
let phongMat!: THREE.MeshPhongMaterial;
let gui!: dat.GUI;
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);
@Component
class Basic extends Vue {
  mounted() {
    this.init();
    this.animate();
    console.log(this.$route.matched);
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
  init() {
    const { width, height } = this.boxComp;
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    // 立方体
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    basicMat = new THREE.MeshBasicMaterial({
      color: mColor,
      wireframe
    });
    const box = new THREE.Mesh(boxGeo, basicMat);
    box.position.set(-5, 0, 0);
    scene.add(box);
    // Lambert材料
    lambertMat = new THREE.MeshLambertMaterial({
      color: mColor
    });
    const lambertBox = new THREE.Mesh(boxGeo, lambertMat);
    scene.add(lambertBox);
    // phong材料
    phongMat = new THREE.MeshPhongMaterial({
      color: mColor
    });
    const phongBox = new THREE.Mesh(boxGeo, phongMat);
    scene.add(phongBox);
    phongBox.position.set(5, 0, 0);
    // 初始化帧数检测
    stats = new Stats();
    document.body.appendChild(stats.dom);
    // 初始化renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.boxRef.appendChild(renderer.domElement);
    // 初始化gui
    gui = new dat.GUI();
    const params = {
      light: false
    };
    const controller = gui.add(params, 'light');
    controller.onChange((value: boolean) => {
      if (value) {
        scene.add(ambientLight);
      } else {
        scene.remove(ambientLight);
      }
    });
  }
  public animate(): void {
    window.requestAnimationFrame(this.animate);
    this.renderFn();
    stats.update();
  }
  public renderFn(): void {
    renderer.render(scene, camera);
  }
}
export default Basic;
</script>
<style>
.box {
  width: 100vw;
  height: 100vh;
}
</style>