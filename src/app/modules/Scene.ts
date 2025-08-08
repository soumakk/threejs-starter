import * as THREE from 'three'
import Clock from '../utils/Clock'
import Loader from '../utils/Loader'

import vertexShader from '../shaders/demo.vert'
import fragmentShader from '../shaders/demo.frag'

class Scene {
	scene: THREE.Scene
	private clock: Clock
	private loader: Loader
	plane: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial, THREE.Object3DEventMap>

	constructor() {
		this.clock = new Clock()
		this.loader = new Loader()
	}

	init() {
		// Initialize scene
		this.scene = new THREE.Scene()

		this.addLights()
		this.addObjects()
	}

	async addLights() {
		// Add hdri env
		const envTexture = await this.loader.loadHDRI('/hdri/cyclorama_hard_light_2k.hdr')
		envTexture.mapping = THREE.EquirectangularRefractionMapping
		// this.scene.background = envTexture
		this.scene.environment = envTexture
	}

	async addObjects() {
		const suzanne = await this.loader.loadGLTF('/models/suzanne.glb')
		this.scene.add(suzanne.scene)

		// Plane
		this.plane = new THREE.Mesh(
			new THREE.PlaneGeometry(5, 5, 200, 200),
			new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
				},
				vertexShader,
				fragmentShader,
				wireframe: false,
			})
		)
		this.plane.rotation.x = -Math.PI * 2
		// this.scene.add(this.plane)
	}

	get instance() {
		return this.scene
	}

	update() {
		console.log(this.clock.elapsed)
	}
}

export default Scene
