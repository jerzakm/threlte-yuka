<script lang='ts'>
  import {
    GameEntity,
    Vehicle,
    ArriveBehavior,
    FleeBehavior,
    ObstacleAvoidanceBehavior,
	WanderBehavior,
  } from '$lib'
  import type { Vector3, GameEntity as GameEntityType } from 'yuka'
  import { T } from '@threlte/core'
	import Raycast from '../Raycast.svelte'

  const r = (n: number) => (Math.random() - 0.5) * n

  let target: Vector3

  let obstacles: GameEntityType[] = []

  let arriveActive = false

  setInterval(() => arriveActive = !arriveActive, 2000)
</script>

<Raycast bind:target />

{#each { length: 10 } as _, i}
  <GameEntity
    position.x={r(30)}
    position.z={r(30)}
    boundingRadius={2}
    bind:entity={obstacles[i]}
  >
    <T.Mesh>
      <T.SphereGeometry args={[1]} />
      <T.MeshToonMaterial color='red' />
    </T.Mesh>
  </GameEntity>
{/each}

{#each { length: 50 } as _, i}
  <Vehicle
    maxSpeed={5}
    updateNeighborhood={true}
    neighborhoodRadius={10}
    position.x={2.5 - Math.random() * 5}
    position.z={2.5 - Math.random() * 5}
    rotation.y={Math.PI * Math.random()}
  >
    <ArriveBehavior weight={0.5} active={arriveActive} />
    <WanderBehavior weight={0.2} />
    <ObstacleAvoidanceBehavior {obstacles} brakingWeight={5} />

    <T.Mesh rotation.x={Math.PI * 0.5}>
      <T.ConeGeometry args={[0.1, 0.5, 8]} />
      <T.MeshToonMaterial color='turquoise' />
    </T.Mesh>
  </Vehicle>
{/each}
