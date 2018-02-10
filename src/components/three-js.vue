<template>
    <canvas id="scene"></canvas>
</template>

<script>
export default {
    name: 'three-js',
    props: {
        name: {
            type: String,
            required: false,
        },
        session: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            ww: null,
            wh: null,
            start: Date.now(),
            renderer: null,
            scene: null,
            camera: null,
        }
    },
    mounted() {
        this.init()
        this.setupScene()
        this.setupCamera()
        this.setupObjects()
        this.setupLights()
        this.animate()
    },
    methods: {
        init() {
            this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene') })
            this.renderer.setClearColor(0x3F3F3F)
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.ww = window.innerWidth
            this.wh = window.innerHeight
            this.renderer.setSize(this.ww, this.wh)
        },
        setupScene() {
            this.scene = new THREE.Scene()
            this.scene.fog = new THREE.Fog(0x3f3f3f, 500, 1000)
        },
        setupCamera() {
            this.camera = new THREE.PerspectiveCamera(50, this.ww / this.wh, 1, 10000)
            this.camera.position.set(0, 0, 80)
            this.camera.lookAt(new THREE.Vector3(0, 0, 0))
            this.scene.add(this.camera)
            window.addEventListener('resize', this.resize)
        },
        resize() {
            this.ww = window.innerWidth
            this.wh = window.innerHeight
            this.renderer.setSize(this.ww, this.wh)
            this.camera.aspect = this.ww / this.wh
            this.camera.updateProjectionMatrix()
        },
        setupObjects() {
            let geometry = new THREE.BoxGeometry(50, 50, 50)
            let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
            const cube = new THREE.Mesh(geometry, material)
            // this.scene.add(cube)

            geometry = new THREE.IcosahedronGeometry(20, 4)
            // material = new THREE.MeshBasicMaterial({ color: 0xb7ff00, wireframe: true })
            material = new THREE.ShaderMaterial({
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
            })
            const metaball = new THREE.Mesh(geometry, material)
            this.scene.add(metaball)
        },
        setupLights() {
            const light = new THREE.DirectionalLight(0xffffff, 1)
            light.position.set(0, 500, 100)
            this.scene.add(light)
        },
        animate() {
            requestAnimationFrame(this.animate)
            this.renderer.render(this.scene, this.camera)
        },
    },
}
</script>
<style scoped>
    
</style>