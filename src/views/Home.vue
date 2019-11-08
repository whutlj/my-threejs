<template>
  <div class="home">
    <div id="nav">
      <div class="nav-item">
        <router-link to="/basic">基本几何形状</router-link>
      </div>
      <div class="btn" @click="changeType">改变type</div>
      <div class="nav-item">
        <router-link to="/light">材质</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/pointLight">点光源</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/spotLight">聚光灯</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/texture">纹理效果</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/sprite">雪花效果</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/interCube">矩形交互</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/gj">骨架屏实践</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/updateTest/init">beforeRouteUpdate测试</router-link>
      </div>
    </div>
    <div>{{testObj.name}}</div>
    <div>{{testObj.age}}</div>
    <div>{{testObj.nest.name}}</div>
    <div @click="changeTestObj">点击改变</div>
    <video id="videoElement"></video>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Counter from '@/components/Counter.vue'; // @ is an alias to /src
import * as THREE from 'three';
import { Light, SpotLight, Camera, Vector3 } from 'three';
import Stats from 'stats.js';
import Player from 'xgplayer';
import Chimee from 'chimee';
let stats!: Stats;
@Component({
  components: {
    HelloWorld,
    Counter
  }
})
export default class Home extends Vue {
  public requestId!: number;
  public testObj = {
    name: 'testObj',
    nest: {
      name: 'nest'
    }
  }
  public propClick(str: string): void {
    console.log(str);
  }
  beforeDestroy() {
    window.cancelAnimationFrame(this.requestId);
  }
  mounted() {
    this.testObj.age = 100;
  }
  public fontThree(): void {
    const loader = new THREE.FontLoader();
    loader.load('./helvetiker_bold.typeface.json', font => {
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('myCanvas') as HTMLCanvasElement
      });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(90, 4 / 3, 1, 30);
      camera.position.set(0, 0, 5);
      const mesh = new THREE.Mesh(
        new THREE.TextGeometry('lj', {
          font,
          size: 1,
          height: 1
        }),
        new THREE.MeshBasicMaterial({
          color: 0xff00000
        })
      );
      scene.add(mesh);
      renderer.render(scene, camera);
    });
  }
  public changeType(): void {
    this.$lj.name = Math.random();
  }
  public changeTestObj(): void{
    console.log('改变');
    this.$set(this.testObj.nest, 'age', 20);
  }
  public cylinderThree(): void {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('myCanvas') as HTMLCanvasElement,
      antialias: true
    });
    const texture = new THREE.TextureLoader().load('./bg1.jpeg');
    const scene = new THREE.Scene();
    scene.background = texture;
    const camera = new THREE.PerspectiveCamera(60, 5 / 3, 1, 30);
    // const camera = new THREE.OrthographicCamera(-4, 4, 2, -2, 1, 50);
    // const x = 0;
    camera.position.set(5, 3, 6);
    // const geometry = new THREE.CylinderGeometry(2, 2, 4);
    // const geometry = new THREE.TetrahedronGeometry(3);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // let light;
    // 添加环境光源
    // light = new THREE.AmbientLight(0xffffff);
    // 添加点光源
    // light = new THREE.PointLight(0xffffff, 1, 100);
    // light.position.set(0, 0, 2);
    // 添加平行光源
    // light = new THREE.DirectionalLight(0xffffff, 1);
    // light.position.set(6, 3, 5);
    // 添加聚光灯
    new THREE.TextureLoader().load('./hy.jpeg', map => {
      const materials = new Array(6).fill(
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map
        })
      );
      const geometry = new THREE.BoxGeometry(4, 4, 4);
      const cylinder = new THREE.Mesh(geometry, materials);
      let y = 0;
      cylinder.rotation.set(0, 0, 0);
      scene.add(cylinder);
      renderer.render(scene, camera);
      stats = new Stats();
      stats.showPanel(0);
      document.body.appendChild(stats.dom);
      const draw = () => {
        stats.begin();
        y = (cylinder.rotation.y + 0.01) % (Math.PI * 2);
        // console.log(y);
        cylinder.rotation.set(0, y, 0);
        renderer.render(scene, camera);
        stats.end();
        this.requestId = window.requestAnimationFrame(draw);
      };
      window.requestAnimationFrame(draw);
    });
  }
  public stopRotation() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
    }
  }

  public shadowShow() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('myCanvas') as HTMLCanvasElement,
      antialias: true
    });
    renderer.shadowMap.enabled = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 1, 30);
    camera.position.set(5, 5, 5);
    camera.lookAt(new Vector3(0, 0, 0));
    const mat = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16), mat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    new THREE.TextureLoader().load('./logo.png', texture => {
      const materials = new Array(6).fill(
        new THREE.MeshLambertMaterial({
          color: 0xffffff,
          // emissive: 0xff0000,
          map: texture
        })
      );
      const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);

      cube.position.x = 0;
      cube.position.y = 0.5;
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
      renderer.render(scene, camera);
    });
  }

  // public particleThree(): void {
  //   // 粒子动画的使用，加载字体
  //   const load = new THREE.FontLoader();
  //   load.load('./examples/fonts/gentilis_regular.typeface.json', font => {
  //     const geometry = new THREE.TextGeometry('english', {
  //       font,
  //       size: 5,
  //       height: 1
  //     });
  //     const canvas: HTMLCanvasElement = document.getElementById(
  //       'myCanvas'
  //     ) as HTMLCanvasElement;
  //     const renderer = new THREE.WebGLRenderer({
  //       canvas,
  //       antialias: true // 平滑
  //     });
  //     const { x, y }: THREE.Vector2 = renderer.getSize();
  //     const scene = new THREE.Scene();
  //     // const camera = new THREE.OrthographicCamera(
  //     //   -10,
  //     //   10,
  //     //   10,
  //     //   -10,
  //     //   1,
  //     //   20
  //     // );
  //     const camera = new THREE.PerspectiveCamera(40, 4 / 3, 1, 50);
  //     camera.position.set(10, 0, 50);
  //     // camera.lookAt(new Vector3(0, 0, 0));
  //     // const geometry = new THREE.SphereGeometry(50, 48, 32);
  //     const materials = new THREE.PointsMaterial({
  //       color: 0xff0000
  //     });
  //     // const materials = new THREE.MeshBasicMaterial({
  //     //   color: 0xff0000
  //     // });
  //     const point = new THREE.Points(geometry, materials);
  //     scene.add(point);
  //     renderer.render(scene, camera);
  //   });
  // }
}
</script>
