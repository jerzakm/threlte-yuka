<script lang='ts'>
  import { ArriveBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type Props = 'deceleration' | 'tolerance'
  type $$Props = Partial<Pick<ArriveBehavior, 'active' | 'weight' | Props>> & {
    behavior?: ArriveBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined
  export let deceleration: $$Props['deceleration'] = undefined
  export let tolerance: $$Props['tolerance'] = undefined

  export const behavior = useBehavior(new ArriveBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
  $: if (deceleration !== undefined) behavior.deceleration = deceleration
  $: if (tolerance !== undefined) behavior.tolerance = tolerance
</script>
