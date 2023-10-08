<script lang='ts'>
  import * as THREE from 'three'
  import { Vector3 } from 'yuka'
  import { useThrelte } from '@threlte/core'

  export const target = new Vector3()

  const internalTarget = new THREE.Vector3()
  const { camera } = useThrelte()
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const plane = new THREE.Plane()
  plane.normal.set(0, 1, 0)

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(pointer, camera.current)
    raycaster.ray.intersectPlane(plane, internalTarget)
    target.set(internalTarget.x, internalTarget.y, internalTarget.z)
  }
</script>

<svelte:window on:pointermove={onPointerMove} />
