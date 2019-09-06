<template>
  <div class="box" ref="box">
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import Stats from 'stats.js';

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

@Component
class SpotLight extends Vue {
  mounted() {
    this.init();
    this.animate();
  }
  beforeDestroy() {
    document.body.removeChild(stats.dom);
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
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
     new THREE.MeshLambertMaterial({ color: 0xffffff }));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({
        color: 0x00ff00
      })
    );
    cube.position.x = 0;
    cube.position.y = 1;
    // cube.translateY(0.5);
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);

    const light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.position.set(2, 5, 3);
    light.target = cube;
    light.castShadow = true;

    light.shadow.camera.near = 2;
    light.shadow.camera.far = 10;
    light.shadow.camera.fov = 30;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    scene.add(light);
    // 初始化帧数检测
    stats = new Stats();
    document.body.appendChild(stats.dom);
    // 初始化renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.shadowMap.enabled = true;
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
    renderer.render(scene, camera);
  }
}
export default SpotLight;
</script>
<style>
.box {
  width: 100vw;
  height: 100vh;
}
</style>