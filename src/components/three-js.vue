<template>
    <canvas id="scene"></canvas>
</template>

<script>
export default {
    name: 'three-js',
    props: {
        itemList: {
            type: Object,
            required: true,
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
            controls: null,
            shaderMaterial: null,
        }
    },
    mounted() {
        this.init()
        this.setupScene()
        this.setupCamera()
        this.setupControls()
        this.setupObjects()
        this.setupLights()
        this.animate()
    },
    /* computed: {
        itemList: function () {
            // `this` points to the vm instance
            // return this.message.split('').reverse().join('')
            console.log('yo')
        },
    }, */
    methods: {
        init() {
            // document.getElementsByTagName('ul')[0].style.backgroundImage = 'url(static/explosion.png)'
            this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene') })
            this.renderer.setClearColor(0x3F3F3F)
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.ww = window.innerWidth
            this.wh = window.innerHeight
            this.renderer.setSize(this.ww, this.wh)
        },
        setupScene() {
            this.scene = new THREE.Scene()
            this.scene.fog = new THREE.Fog(0x3f3f3f, 10, 150)
        },
        setupCamera() {
            this.camera = new THREE.PerspectiveCamera(50, this.ww / this.wh, 1, 10000)
            this.camera.position.set(0, 0, 80)
            this.camera.lookAt(new THREE.Vector3(0, 0, 0))
            this.scene.add(this.camera)
            window.addEventListener('resize', this.resize)
        },
        setupControls() {
            this.controls = new THREE.OrbitControls(this.camera)
            this.controls.enablePan = false
            this.controls.enableZoom = false
            this.controls.autoRotate = true
            this.controls.autoRotateSpeed = -2
            this.controls.enableDamping = false
            this.controls.dampingFactor = 1.3
            this.controls.rotateSpeed = 0.2
            this.controls.update()
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
            const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
            const cube = new THREE.Mesh(geometry, material)
            // this.scene.add(cube)

            geometry = new THREE.IcosahedronGeometry(20, 4)
            // material = new THREE.MeshBasicMaterial({ color: 0xb7ff00, wireframe: true })
            this.shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    tExplosion: {
                        type: 't',
                        value: THREE.ImageUtils.loadTexture('static/explosion.png'),
                    },
                    time: { // float initialized to 0
                        type: 'f',
                        value: 0.0,
                    },
                    /* topColor: { type: 'c', value: new THREE.Color(0x0077ff) },
                    bottomColor: { type: 'c', value: new THREE.Color(0xffffff) },
                    offset: { type: 'f', value: 33 },
                    exponent: { type: 'f', value: 0.6 },
                    fogColor: { type: 'c', value: this.scene.fog.color },
                    fogNear: { type: 'f', value: this.scene.fog.near },
                    fogFar: { type: 'f', value: this.scene.fog.far }, */
                },
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
            /* side: THREE.BackSide,
                fog: true, */
            })
            const metaball = new THREE.Mesh(geometry, this.shaderMaterial)
            this.scene.add(metaball)
        },
        setupLights() {
            const light = new THREE.DirectionalLight(0xffffff, 1)
            light.position.set(0, 500, 100)
            this.scene.add(light)
        },
        animate() {
            requestAnimationFrame(this.animate)
            this.shaderMaterial.uniforms.time.value = 0.00025 * (Date.now() - this.start)
            this.controls.update()
            this.renderer.render(this.scene, this.camera)
        },
        updateSessions() {
            debug('$route:info')(this.itemList)
        },
    },
    watch: {
        itemList: {
            handler() {
                this.updateSessions()
            },
        },
    },
}
</script>
<style scoped>
    
</style>