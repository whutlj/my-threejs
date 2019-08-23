<template>
  <div class="crash" ref="box">
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
class Crash extends Vue {
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
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 5);
    scene = new THREE.Scene();
    const geometry = new THREE.BufferGeometry();
    const vertices = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
    const color1 = new THREE.Color();
    color1.setRGB(Math.random() / 1, Math.random() / 1, Math.random() / 1);
    const colors = [
      color1.r,
      color1.g,
      color1.b,
      color1.r,
      color1.g,
      color1.b,
      color1.r,
      color1.g,
      color1.b,
      color1.r,
      color1.g,
      color1.b
    ];
    geometry.addAttribute('position', new THREE.Float32Attribute(vertices, 3));
    geometry.addAttribute('color', new THREE.Float32Attribute(colors, 3));
    const material = new THREE.MeshPhongMaterial({
      color: 0xffff00
    });
    const light = new THREE.AmbientLight(0x123456);
    const line = new THREE.Mesh(geometry, material);
    scene.add(line);
    scene.add(light);
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
export default Crash;
</script>
<style>
.crash {
  width: 1200px;
  height: 900px;
}
</style>