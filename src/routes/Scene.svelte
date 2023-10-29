<script lang="ts">
	import { EntityManager, Vehicle, ArriveBehavior, FleeBehavior, WanderBehavior } from '$lib';
	import { T } from '@threlte/core';
	import type { Vector3 } from 'yuka';
	import Raycast from './examples/Raycast.svelte';
	import AnimatedInstancedSprite from '$lib/components/AnimatedInstancedSprite.svelte';
	import FlyerUpdater from './FlyerUpdater.svelte';
	import Separation from '$lib/components/behaviors/Separation.svelte';
	import Cohesion from '$lib/components/behaviors/Cohesion.svelte';
	import Alignment from '$lib/components/behaviors/Alignment.svelte';

	let target: Vector3;

	const count = 500;
</script>

<Raycast bind:target />

<AnimatedInstancedSprite {count}>
	<EntityManager>
		{#each { length: count } as _, i}
			<Vehicle maxSpeed={1} updateNeighborhood={true} neighborhoodRadius={10}>
				<FleeBehavior weight={0.2} {target} />
				<WanderBehavior weight={0.2} />
				<ArriveBehavior />
				<Separation weight={0.01} />
				<Cohesion weight={0.1} />

				<Alignment weight={0.3} />

				<FlyerUpdater {i} />
			</Vehicle>
		{/each}
	</EntityManager>
</AnimatedInstancedSprite>
