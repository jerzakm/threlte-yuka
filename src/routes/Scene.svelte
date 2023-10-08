<script lang='ts'>
  import {
    EntityManager,
    Vehicle,
    ArriveBehavior,
    FleeBehavior,
    WanderBehavior,
  } from '$lib'
  import { T } from '@threlte/core'
	import type { Vector3 } from 'yuka'
	import Raycast from './examples/Raycast.svelte';

  let target: Vector3
</script>

<Raycast bind:target />

<EntityManager>
  {#each { length: 300 } as _, i}
    <Vehicle
      maxSpeed={5}
      updateNeighborhood={true}
      neighborhoodRadius={10}
      position={[2.5 - Math.random() * 5, 0, 2.5 - Math.random() * 5]}
      rotation.y={Math.PI * Math.random()}
    >
      <FleeBehavior weight={0.1} {target} />
      <WanderBehavior weight={0.1} />
      <ArriveBehavior />

      <T.Mesh rotation.x={Math.PI * 0.5}>
        <T.ConeGeometry args={[0.1, 0.5, 8]} />
        <T.MeshNormalMaterial />
      </T.Mesh>
    </Vehicle>
  {/each}
</EntityManager>
