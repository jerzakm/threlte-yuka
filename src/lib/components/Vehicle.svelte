<script lang="ts">
	import { Group } from 'three';
	import { Vehicle, Smoother } from 'yuka';
	import { useEntity } from '../hooks/useEntity';
	import { setVehicle } from '../hooks/useParent';
	import Entity from './Entity.svelte';
	import { useFrame } from '@threlte/core';
	import { setContext } from 'svelte';

	type OmitProps =
		| 'updateWorldMatrix'
		| 'resolveReferences'
		| 'fromJSON'
		| 'toJSON'
		| 'sendMessage'
		| 'lineOfSightTest'
		| 'handleMessage'
		| 'setRenderComponent'
		| 'getWorldPosition'
		| 'getWorldDirection'
		| 'rotateTo'
		| 'lookAt'
		| 'getDirection'
		| 'remove'
		| 'add'
		| 'update'
		| 'start'
		| 'updateOrientation'
		| 'getSpeed'
		| 'getSpeedSquared';
	type $$Props = Partial<Omit<Vehicle, OmitProps>> & {
		entity?: Vehicle;
		ref?: Group;
	};

	export const entity = setVehicle(useEntity(new Vehicle()));
	export const ref = new Group();
	ref.matrixAutoUpdate = false;

	setContext('entity', entity);

	export let maxSpeed: $$Props['maxSpeed'] = undefined;
	export let neighborhoodRadius: $$Props['neighborhoodRadius'] = undefined;
	export let updateNeighborhood: $$Props['updateNeighborhood'] = undefined;

	entity.smoother = new Smoother();

	$: if (maxSpeed !== undefined) entity.maxSpeed = maxSpeed;
	$: if (neighborhoodRadius !== undefined) entity.neighborhoodRadius = neighborhoodRadius;
	$: if (updateNeighborhood !== undefined) entity.updateNeighborhood = updateNeighborhood;
</script>

<Entity {entity} {...$$restProps}>
	<slot />
</Entity>
