import { ShaderMaterial } from 'three';

export const spriteMaterial = () => {
	const material = new ShaderMaterial({
		transparent: true,
		alphaTest: 0.99,
		defines: {
			USE_UV: ''
		},

		uniforms: {
			spritesheet: { value: null },
			time: { value: 0 },
			offset: { value: 0 }
		},
		fragmentShader: /*glsl*/ `
		#include <common>
		#include <dithering_pars_fragment>
		#include <color_pars_fragment>
		#include <uv_pars_fragment>
		#include <map_pars_fragment>
		#include <alphamap_pars_fragment>
		#include <alphatest_pars_fragment>
		#include <alphahash_pars_fragment>
		#include <aomap_pars_fragment>
		#include <lightmap_pars_fragment>
		#include <envmap_common_pars_fragment>
		#include <envmap_pars_fragment>
		#include <fog_pars_fragment>
		#include <specularmap_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>
		// varying vec2 vUv;
		uniform sampler2D spritesheet;
		uniform float time;
		uniform float offset;



		void main() {
			#include <clipping_planes_fragment>


			vec4 diffuseColor = vec4(1. );

			float w = 8.;
			float h = 1.;
			float totalTime = 1. + offset / 2.;

			// % through the animation
			float frameTimedId = mod(time +  abs(offset * 1000.) ,totalTime) / totalTime;
			float frameId = floor(frameTimedId * w);

			vec2 frameOffset = vec2(frameId, 0.);

			vec2 frameSize = vec2(1./w, 1./h);
			vec2 frameUv = vec2(vUv*frameSize) + frameSize * frameOffset;
			vec4 sprite = texture2D(spritesheet, frameUv);
			if(sprite.a <= 0.) discard;
			diffuseColor = vec4(sprite);

			#include <logdepthbuf_fragment>
			#include <map_fragment>
			#include <color_fragment>
			#include <alphamap_fragment>
			#include <alphatest_fragment>
			#include <alphahash_fragment>
			#include <specularmap_fragment>

			ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

			// accumulation (baked indirect lighting only)
			#ifdef USE_LIGHTMAP

				vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
				reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

			#else

				reflectedLight.indirectDiffuse += vec3( 1.0 );

			#endif

			// modulation
			#include <aomap_fragment>

			reflectedLight.indirectDiffuse *= diffuseColor.rgb;

			vec3 outgoingLight = reflectedLight.indirectDiffuse;

			#include <envmap_fragment>

			#include <opaque_fragment>
			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>
			#include <dithering_fragment>


		}`,
		vertexShader: /*glsl*/ `

		#include <common>
		#include <uv_pars_vertex>
		#include <envmap_pars_vertex>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <morphtarget_pars_vertex>
		#include <skinning_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		void main() {



			#include <uv_vertex>
			#include <color_vertex>
			#include <morphcolor_vertex>

			#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

				#include <beginnormal_vertex>
				#include <morphnormal_vertex>
				#include <skinbase_vertex>
				#include <skinnormal_vertex>
				#include <defaultnormal_vertex>

			#endif

			#include <begin_vertex>
			#include <morphtarget_vertex>
			#include <skinning_vertex>
			#include <project_vertex>
			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>

			#include <worldpos_vertex>
			#include <envmap_vertex>
			#include <fog_vertex>

		}
		`
	});

	return material;
};
