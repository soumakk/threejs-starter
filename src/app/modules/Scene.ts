import * as THREE from 'three'
import Clock from '../utils/Clock'
import Loader from '../utils/Loader'

class Scene {
	scene: THREE.Scene
	private clock: Clock
	private loader: Loader

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
	}

	get instance() {
		return this.scene
	}

	update() {
		console.log(this.clock.elapsed)
	}
}

export default Scene
