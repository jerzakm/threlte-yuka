<svelte:options immutable />

<script lang='ts'>
  import { AlignmentBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type $$Props = Partial<Pick<AlignmentBehavior, 'active' | 'weight'>> & {
    behavior?: AlignmentBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined

  export const behavior = useBehavior(new AlignmentBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
</script>
