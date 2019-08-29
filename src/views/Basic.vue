<template>
  <div class="box" ref="box">
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
const mColor: string = '#ffff00';
const wireframe: boolean = true;
let basicMat!: THREE.MeshBasicMaterial;
let gui!: dat.GUI;
@Component
class Basic extends Vue {
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
  init() {
    const { width, height } = this.boxComp;
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 20, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    // 立方体
    const boxGeo = new THREE.BoxGeometry(5, 5, 5);
    basicMat = new THREE.MeshBasicMaterial({
      color: mColor,
      wireframe
    });
    const box = new THREE.Mesh(boxGeo, basicMat);
    box.position.set(-20, -10, 0);
    scene.add(box);
    //  圆形
    const circleGeo = new THREE.CircleGeometry(5, 32);
    const circle = new THREE.Mesh(circleGeo, basicMat);
    circle.position.set(0, -10, 0);
    scene.add(circle);
    // 锥体
    const zGeo = new THREE.ConeGeometry(5, 5, 32);
    const cone = new THREE.Mesh(zGeo, basicMat);
    cone.position.set(20, -10, 0);
    scene.add(cone);
    // 圆柱体
    const cylinderGeo = new THREE.CylinderGeometry(4, 4, 6, 32);
    const cylinder = new THREE.Mesh(cylinderGeo, basicMat);
    cylinder.position.set(20, 10, 0);
    scene.add(cylinder);
    // 球体
    const sphereGeo = new THREE.SphereGeometry(2, 32, 32);
    const sphere = new THREE.Mesh(sphereGeo, basicMat);
    sphere.position.set(0, 10, 0);
    scene.add(sphere);
    // 圆环
    const torusGeo = new THREE.TorusGeometry(5, 2, 16, 100);
    const torus = new THREE.Mesh(torusGeo, basicMat);
    torus.position.set(-20, 10, 0);
    scene.add(torus);
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
      wireframe: true,
      color: mColor
    };
    const controller = gui.add(params, 'wireframe');
    const colorController = gui.add(params, 'color');
    controller.onChange((value: boolean) => {
      basicMat.wireframe = value;
    });
    colorController.onChange((value: string) => {
      basicMat.color = new THREE.Color(value);
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