<script lang='ts'>
  import { Group } from 'three'
  import { GameEntity } from 'yuka'
  import { useEntity } from '../hooks/useEntity'
  import { T } from '@threlte/core'

  type Props = 'active' | 'boundingRadius'
  type $$Props = Partial<Pick<GameEntity, Props>> & {
    entity?: GameEntity
    ref?: Group
  }

  export let entity = useEntity(new GameEntity())

  export const ref = new Group()
  ref.matrixAutoUpdate = false

  export let active: $$Props['active'] = undefined
  export let boundingRadius: $$Props['boundingRadius'] = undefined

  $: if (active !== undefined) entity.active = active
  $: if (boundingRadius !== undefined) entity.boundingRadius = boundingRadius

  const sync = (entity: any, renderComponent: Group) => {
    renderComponent.matrix.copy(entity.worldMatrix)
  }
</script>

<T
  is={ref}
  {...$$restProps}
  on:create={() => {
    const { position, quaternion } = ref
    entity.position.set(position.x, position.y, position.z)
    entity.rotation.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
    entity.setRenderComponent(ref, sync)
  }}
>
  <slot />
</T>
