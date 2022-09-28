import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Geometry
 */
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()
const geometry2 = new THREE.BufferGeometry()
// Create a Float32Array containing the vertices position (3 by 3)
const count = 8
const positionsArray = new Float32Array(count * 2 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 2
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
geometry2.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xA020F0, wireframe: true})
const material2 = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh.material.side = THREE.DoubleSide;
scene.add(mesh, mesh2)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * GUI
 */
  const gui = new dat.GUI()
  const shapeFolder = gui.addFolder('Shape Rotation')
  shapeFolder.add(mesh.rotation, 'x', 0, Math.PI * 2)
  shapeFolder.add(mesh.rotation, 'y', 0, Math.PI * 2)
  shapeFolder.add(mesh.rotation, 'z', 0, Math.PI * 2)
 shapeFolder.open()
 const cameraFolder = gui.addFolder('Camera')
 cameraFolder.add(camera.position, 'z', 0, 10)
 cameraFolder.add(camera.position, 'x', 0, 10)
 cameraFolder.add(camera.position, 'y', 0, 10)
 cameraFolder.open()
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
     mesh.rotation.y = 2 * elapsedTime
     mesh2.rotation.x = 2 * elapsedTime
    //  mesh.rotation.x = 1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()