
<script>
  import { AmbientLight, DirectionalLight, MOUSE } from 'three'
  import { T, Canvas } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { EntityManager } from '$lib'
</script>

<Canvas>
  <EntityManager>
    <slot />
  </EntityManager>

  <T.PerspectiveCamera
    makeDefault
    position={[0, 20, 0]}
    on:create={({ ref }) => ref.lookAt(0, 0, 0)}
  >
    <OrbitControls
      on:create={({ ref }) => {
        ref.mouseButtons.LEFT = MOUSE.PAN
      }}
    />
  </T.PerspectiveCamera>

  <T.AmbientLight />
  <T.DirectionalLight />
</Canvas>
