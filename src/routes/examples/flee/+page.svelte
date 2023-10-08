<script lang='ts'>
  import {
    Vehicle,
    ArriveBehavior,
    FleeBehavior,
  } from '$lib'
  import type { Vector3 } from 'yuka'
  import { T } from '@threlte/core'
	import Raycast from '../Raycast.svelte'

  let target: Vector3
</script>

<Raycast bind:target />

{#each { length: 50 } as _, i}
  <Vehicle
    maxSpeed={10}
    updateNeighborhood={true}
    neighborhoodRadius={10}
    position.x={2.5 - Math.random() * 5}
    position.z={2.5 - Math.random() * 5}
    rotation.y={Math.PI * Math.random()}
  >
    <FleeBehavior {target} />
    <ArriveBehavior />

    <T.Mesh rotation.x={Math.PI * 0.5}>
      <T.ConeGeometry args={[0.1, 0.5, 8]} />
      <T.MeshNormalMaterial />
    </T.Mesh>
  </Vehicle>
{/each}
