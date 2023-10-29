<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { Matrix4, NearestFilter, PlaneGeometry, ShaderMaterial } from 'three';

	import { useTexture } from '@threlte/extras';
	import { setContext } from 'svelte';
	import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { spriteMaterial } from './material';

	export let count: number = 50;

	const spriteTexture = useTexture('/flyingEye.png', {
		transform: (t) => {
			t.minFilter = NearestFilter;
			t.magFilter = NearestFilter;
		}
	});

	// const material = spriteMaterial()

	let material: any;

	const w = 11;
	const h = 12;

	$: {
		if ($spriteTexture) {
			material = spriteMaterial();
			material.uniforms.spritesheet.value = $spriteTexture;
			material.needsUpdate = true;
		}
	}

	let mesh: InstancedUniformsMesh<ShaderMaterial>;

	let initialized = false;

	const spread = 80;

	const matrix = new Matrix4();
	matrix.makeRotationX(-DEG2RAD * 90);

	const setPosition = (position: any, index: number) => {
		if (mesh) {
			// matrix.makeRotationX(-DEG2RAD * 90);
			matrix.setPosition(position.x, index / 1000, position.z);
			// matrix.setPosition(
			// 	Math.random() * spread - spread / 2,
			// 	0,
			// 	Math.random() * spread - spread / 2
			// );
			mesh.setMatrixAt(index, matrix);
		}
	};

	setContext('setSpritePosition', setPosition);

	$: {
		if ($spriteTexture && material && !initialized) {
			initialized = true;
			mesh = new InstancedUniformsMesh(new PlaneGeometry(), material, count);
			mesh.castShadow = true;

			// material.depthTest = false

			for (let i = 0; i < count; i++) {
				matrix.setPosition(
					Math.random() * spread - spread / 2,
					Math.sin(i) * 3,
					Math.random() * spread - spread / 2
				);

				mesh.setMatrixAt(i, matrix);
				mesh.setUniformAt('offset', i, Math.random());
				// mesh.setUniformAt('emissive', i, color.set(Math.random() * 0xffffff))

				material.needsUpdate = true;
			}
		}
	}

	useFrame(({ clock }) => {
		if (material) {
			material.uniforms.time.value = clock.getElapsedTime();

			mesh.instanceMatrix.needsUpdate = true;
		}
	});
</script>

{#if mesh}
	<T is={mesh} />
{/if}

<slot />
