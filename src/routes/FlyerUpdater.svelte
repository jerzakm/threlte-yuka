<script lang="ts">
	import { useFrame } from '@threlte/core';
	import { getContext } from 'svelte';

	export let i: number;

	const entity: any = getContext('entity');
	const instancedSprite: any = getContext('setSpritePosition');

	useFrame(() => {
		instancedSprite(entity.position, i);
	});
</script>
