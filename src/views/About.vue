<template>
  <div class="about" ref="box">
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three';
import Stats from 'stats.js';
interface BoxSize {
  width: number;
  height: number;
}
let timer!: number;
let stats!: Stats;
@Component
export default class About extends Vue {
  public camera!: THREE.Camera;
  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public light1!: THREE.Light;
  public light2!: THREE.Light;
  public mounted() {
    this.init();
  }
  public beforeDestroy() {
    document.body.removeChild(stats.dom);
    window.cancelAnimationFrame(timer);
  }
  get boxComp(): BoxSize {
    const width = (this.$refs.box as HTMLElement).offsetWidth;
    const height = (this.$refs.box as HTMLElement).offsetHeight;
    return {
      width,
      height
    };
  }
  public init(): void {
    const { width, height } = this.boxComp;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(0, 0, 40);
    this.scene = new THREE.Scene();
    // 给场景加一个环境光
    this.scene.add(new THREE.AmbientLight(0x111122));
    this.light1 = this.createLight(0x0088ff);
    this.light2 = this.createLight(0xff8888);
    this.light2.position.set(5, 5, 5);
    this.scene.add(this.light1);
    this.scene.add(this.light2);
    // 加入最外面盒子
    const geometry = new THREE.BoxBufferGeometry(30, 30, 30);
    const materials = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      side: THREE.BackSide,
      shininess: 10,
      specular: 0x111111
    });
    const box = new THREE.Mesh(geometry, materials);
    // box.position.y = -10;
    stats = new Stats();
    document.body.appendChild(stats.dom);
    box.receiveShadow = true;
    this.scene.add(box);
    this.renderFn();
  }

  public createLight(color: number): THREE.Light {
    const intensity = 1.5; // 光强
    const pointLight = new THREE.PointLight(color, intensity, 20);
    pointLight.castShadow = true; // 对于光源以及要产生阴影的物体设置castShadow
    pointLight.shadow.camera.far = 60;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.bias = -0.005;
    // 创建球体包围点光源,感觉是小球体发的光，小球在某种强度的光照下，应该体现出来
    const materials = new THREE.MeshBasicMaterial({ color });
    materials.color.multiplyScalar(intensity);
    const sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.3, 12, 8),
      materials
    );
    pointLight.add(sphere);
    // 包围光源,创建透明纹理
    const texture = new THREE.CanvasTexture(this.generateTexture());
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 3.5);
    const outerMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      alphaMap: texture,
      alphaTest: 0.5
    });
    const outerSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(2, 32, 8),
      outerMaterial
    );
    outerSphere.castShadow = true;
    outerSphere.receiveShadow = true;

    const customDistanceMaterial = new THREE.MeshDistanceMaterial({
      alphaTest: outerMaterial.alphaTest,
      alphaMap: outerMaterial.alphaMap
    } as THREE.MeshDistanceMaterialParameters);
    outerSphere.customDistanceMaterial = customDistanceMaterial;
    pointLight.add(outerSphere);

    return pointLight;
  }

  public renderFn(): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this.boxComp.width, this.boxComp.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    (this.$refs.box as HTMLElement).appendChild(this.renderer.domElement);
    // const controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.reRender();
  }
  public reRender() {
    timer = window.requestAnimationFrame(this.reRender);
    let time = performance.now() * 0.001;

    this.light1.position.x = Math.sin(time * 0.6) * 9;
    this.light1.position.y = Math.sin(time * 0.7) * 9 + 5;
    this.light1.position.z = Math.sin(time * 0.8) * 9;

    this.light1.rotation.x = time;
    this.light1.rotation.z = time;

    time += 10000;

    this.light2.position.x = Math.sin(time * 0.6) * 9;
    this.light2.position.y = Math.sin(time * 0.7) * 9 + 5;
    this.light2.position.z = Math.sin(time * 0.8) * 9;

    this.light2.rotation.x = time;
    this.light2.rotation.z = time;
    this.renderer.render(this.scene, this.camera);
    stats.update();
  }
  public generateTexture(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 1, 2, 1);
    return canvas;
  }
}
</script>
<style scoped>
.about {
  width: 1200px;
  height: 900px;
}
</style>
