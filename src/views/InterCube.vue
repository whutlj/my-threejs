<template>
  <div class="inter-cube" ref="box">
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
let directionalLight!: THREE.DirectionalLight;
let stats!: Stats;
let rayCaster!: THREE.Raycaster;
const radius: number = 100;
let theta: number = 0;
let INTERSECTED: any = null;
const mouse: THREE.Vector2 = new THREE.Vector2();
let timer!: number;
@Component
export default class InterCube extends Vue {
  mounted() {
    this.init();
    this.animate();
    this.boxRef.addEventListener('mousemove', this.onMouseMove);
  }
  beforeDestroy() {
    document.body.removeChild(stats.dom);
    this.boxRef.removeEventListener('mousemove', this.onMouseMove);
    window.cancelAnimationFrame(timer);
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
  public onMouseMove(event: MouseEvent) {
    event.preventDefault();
    const { width, height, offsetLeft, offsetTop } = this.boxComp;
    const startX = event.clientX - offsetLeft;
    const startY = event.clientY - offsetTop;
    mouse.x = (startX / width) * 2 - 1;
    mouse.y = -(startY / height) * 2 + 1;
  }
  public init(): void {
    // 初始化相机
    const { width, height } = this.boxComp;
    camera = new THREE.PerspectiveCamera(80, width / height, 1, 10000);
    // 初始化场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    // 添加光源
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    // 添加物体对象
    const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    for (let i = 0; i < 2000; i++) {
      const object = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff
        })
      );
      // 随机位置
      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;
      // 随机旋转
      object.rotation.x = Math.random() * Math.PI * 2;
      object.rotation.y = Math.random() * Math.PI * 2;
      object.rotation.z = Math.random() * Math.PI * 2;
      // 随机缩放大小
      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;
      scene.add(object);
    }
    // 初始化射线捕获
    rayCaster = new THREE.Raycaster();
    // 初始化render
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    (this.boxRef as HTMLElement).appendChild(renderer.domElement);
    // 初始化帧数计算
    stats = new Stats();
    document.body.appendChild(stats.dom);
  }

  public animate(): void {
    timer = window.requestAnimationFrame(this.animate);
    this.renderFn();
    stats.update();
  }

  public renderFn(): void {
    theta += 0.1;
    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      if (INTERSECTED !== intersects[0]) {
        if (INTERSECTED) {
          ((INTERSECTED as THREE.Mesh)
            .material as THREE.MeshLambertMaterial).emissive.setHex(
            INTERSECTED.currentHex
          );
          INTERSECTED.scale.x = INTERSECTED.currentScale;
        }
        INTERSECTED = intersects[0].object;
        INTERSECTED.currentScale = INTERSECTED.scale.x;
        INTERSECTED.currentHex = ((INTERSECTED as THREE.Mesh)
          .material as THREE.MeshLambertMaterial).emissive.getHex();
        ((INTERSECTED as THREE.Mesh)
          .material as THREE.MeshLambertMaterial).emissive.setHex(0xff0000);
        INTERSECTED.scale.x = 1.4 * INTERSECTED.scale.x;
      }
    } else {
      if (INTERSECTED) {
        ((INTERSECTED as THREE.Mesh)
          .material as THREE.MeshLambertMaterial).emissive.setHex(
          INTERSECTED.currentHex
        );
        INTERSECTED.scale.x = INTERSECTED.currentScale;
      }
      INTERSECTED = null;
    }
    renderer.render(scene, camera);
  }
}
</script>

<style scoped>
.inter-cube {
  width: 1200px;
  height: 900px;
}
</style>