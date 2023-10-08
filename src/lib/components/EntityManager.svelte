<script>
  import { EntityManager, Time } from 'yuka'
  import { onDestroy } from 'svelte'
  import { useFrame } from '@threlte/core'
  import { setManager } from '../hooks/useParent'
  
  export const manager = setManager(new EntityManager())
  const time = new Time()

  useFrame(() => {
    const delta = time.update().getDelta()
		manager.update(delta)
  })

  onDestroy(() => manager.clear())
</script>

<slot />
