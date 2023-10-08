<script>
  import { MOUSE } from 'three'
  import { T, Canvas } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Scene from './Scene.svelte'
</script>

<Canvas>
  <Scene />

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
</Canvas>
