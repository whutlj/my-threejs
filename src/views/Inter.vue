<template>
  <div class="inter" ref="box">
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three';
import Stats from 'stats.js';
import { PointsMaterial } from 'three';
interface BoxSize {
  width: number;
  height: number;
}
const mouse: THREE.Vector2 = new THREE.Vector2();
const raycaster: THREE.Raycaster = new THREE.Raycaster();
let geometry: THREE.BufferGeometry;
const PARTICLE_SIZE = 5;
let timer!: number;
// let INTERSECTED;
@Component
export default class About extends Vue {
  public camera!: THREE.Camera;
  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public stats!: Stats;
  public pointBox!: THREE.Points;
  public texture!: THREE.Texture;
  public mounted() {
    const load = new THREE.TextureLoader();
    load.load('./disc.png', texture => {
      this.texture = texture;
      this.init();
      this.animate();
    });
    this.boxRef.addEventListener('mousemove', this.mouseMove);
  }
  beforeDestroy() {
    document.body.removeChild(this.stats.dom);
    window.cancelAnimationFrame(timer);
  }

  get boxRef(): HTMLElement {
    return this.$refs.box as HTMLElement;
  }
  get boxComp(): BoxSize {
    const width = (this.$refs.box as HTMLElement).offsetWidth;
    const height = (this.$refs.box as HTMLElement).offsetHeight;
    return {
      width,
      height
    };
  }
  public mouseMove(event: MouseEvent): void {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  public init(): void {
    this.scene = new THREE.Scene();
    const { width, height } = this.boxComp;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(0, -2, 55);
    // geometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);
    const vertices = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10).vertices;
    const positions = new Float32Array(vertices.length * 3);
    const colors = new Float32Array(vertices.length * 3);
    const sizes = new Float32Array(vertices.length);
    let vertex;
    const color = new THREE.Color();
    for (let i = 0, l = vertices.length; i < l; i++) {
      vertex = vertices[i];
      vertex.toArray(positions, i * 3);
      color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
      color.toArray(colors, i * 3);
      sizes[i] = PARTICLE_SIZE * 0.5;
    }
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    const materials = new THREE.PointsMaterial({
      color: 0xff0000,
      map: this.texture
    });
    this.pointBox = new THREE.Points(geometry, materials);
    this.scene.add(this.pointBox);
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.initRender();
  }

  public initRender(): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const { width, height } = this.boxComp;
    this.renderer.setSize(width, height);
    (this.$refs.box as HTMLElement).appendChild(this.renderer.domElement);
  }

  public renderFn(): void {
    // const geometry1 = this.pointBox.geometry as THREE.BufferGeometry;
    // const attributes = geometry1.attributes;
    // raycaster.setFromCamera(mouse, this.camera);
    // const intersects = raycaster.intersectObject(this.pointBox);
    // if (intersects.length > 0) {
    //   if (INTERSECTED != intersects[0].index) {
    //     attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
    //     INTERSECTED = intersects[0].index;
    //     attributes.size.array[INTERSECTED] = PARTICLE_SIZE * 2.25;
    //     attributes.size.needsUpdate = true;
    //     console.log('放大', attributes)
    //   }
    // } else if (INTERSECTED !== null) {
    //   attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
    //   attributes.size.needsUpdate = true;
    //   INTERSECTED = null;
    // }
    const preY = this.pointBox.rotation.y + 0.001;
    this.pointBox.rotation.y = preY % (Math.PI * 2);
    const preX = this.pointBox.rotation.x + 0.001;
    this.pointBox.rotation.x = preX % (Math.PI * 2);
    this.renderer.render(this.scene, this.camera);
  }
  public animate(): void {
    timer = window.requestAnimationFrame(this.animate);
    this.renderFn();
    this.stats.update();
  }
}
</script>
<style scoped>
.inter {
  width: 1200px;
  height: 900px;
}
</style>