<template>
  <div class="line" ref="box"></div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
const materials: THREE.PointsMaterial[] = [];
// let directionalLight!: THREE.DirectionalLight;
let stats!: Stats;
let gui!: dat.GUI;
let parameters!: any[];
const mouse: THREE.Vector2 = new THREE.Vector2();
// let rayCaster!: THREE.Raycaster;
// const radius: number = 100;
// let theta: number = 0;
// let INTERSECTED: any = null;
// const mouse: THREE.Vector2 = new THREE.Vector2();
// let timer!: number;
@Component
export default class InterCube extends Vue {
  mounted() {
    this.init();
    this.animate();
    this.boxRef.addEventListener('mousemove', this.mouseMove);
  }
  beforeDestroy() {
    gui.destroy();
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
    camera = new THREE.PerspectiveCamera(95, width / height, 1, 2000);
    camera.position.set(0, 0, 1000);
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);
    const geometry = new THREE.BufferGeometry();
    // const vertices = [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0];
    // geometry.addAttribute(
    //   'position',
    //   new THREE.BufferAttribute(new Float32Array(vertices), 3)
    // );
    // 创建很多个点，点就是粒子，就是创建很多个粒子
    // const material = new THREE.LineBasicMaterial({
    //   color: 0xffffff
    // });
    // const line = new THREE.Line(geometry, material);
    // scene.add(line);
    const textureloader = new THREE.TextureLoader();
    const sprite1 = textureloader.load('./s11.png');
    const sprite2 = textureloader.load('./s2.png');
    const sprite3 = textureloader.load('./s3.png');
    const sprite4 = textureloader.load('./s4.png');
    const sprite5 = textureloader.load('./s5.png');
    const vertices: number[] = [];
    for (let i = 0; i < 10000; i++) {
      // 创建1000个粒子
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      vertices.push(x, y, z);
    }
    geometry.addAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    parameters = [
      [[1.0, 0.2, 0.5], sprite2, 20],
      [[0.95, 0.1, 0.5], sprite3, 15],
      [[0.9, 0.05, 0.5], sprite1, 10],
      [[0.85, 0, 0.5], sprite5, 8],
      [[0.8, 0, 0.5], sprite4, 5]
    ];
    for (let i = 0; i < parameters.length; i++) {
      const colors = parameters[i][0] as number[];
      const map = parameters[i][1] as THREE.Texture;
      const size: number = parameters[i][2] as number;
      materials[i] = new THREE.PointsMaterial({
        size,
        map,
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      materials[i].color.setHSL(colors[0], colors[1], colors[2]);
      const particles = new THREE.Points(geometry, materials[i]);
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;
      scene.add(particles);
    }
    // 初始化renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    (this.boxRef as HTMLElement).appendChild(renderer.domElement);
    // 初始化stats
    stats = new Stats();
    document.body.appendChild(stats.dom);
    // 初始化gui
    gui = new dat.GUI();
    const params = {
      texture: true
    };
    const controller = gui.add(params, 'texture');
    controller.onChange((value: boolean) => {
      for (let i = 0; i < materials.length; i++) {
        materials[i].map = value ? (parameters[i][1] as THREE.Texture) : null;
        materials[i].needsUpdate = true;
      }
    });
  }
  public animate(): void {
    window.requestAnimationFrame(this.animate);
    this.renderFn();
    stats.update();
  }
  public renderFn(): void {
    const time = +new Date() * 0.00005;
    if (mouse) {
      camera.position.x += (mouse.x - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y - camera.position.y) * 0.05;
    }
    camera.lookAt(scene.position);
    // 让雪花动起来
    const children = scene.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child instanceof THREE.Points) {
        // 是点对象
        child.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      }
    }
    // 改变雪花颜色
    for (let i = 0; i < materials.length; i++) {
      const colors = parameters[i][0] as number[];
      const color1 = ((360 * (colors[0] + time)) % 360) / 360; // 色彩模式 值在0-1之间
      materials[i].color.setHSL(color1, colors[1], colors[2]);
    }
    renderer.render(scene, camera);
  }
  mouseMove(event: MouseEvent): void {
    const { offsetLeft, offsetTop } = this.boxComp;
    mouse.x = event.clientX - offsetLeft;
    mouse.y = event.clientY - offsetTop;
  }
}
</script>
<style scoped>
.line {
  width: 1200px;
  height: 900px;
}
</style>