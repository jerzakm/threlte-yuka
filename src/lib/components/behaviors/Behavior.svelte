<svelte:options immutable />

<script lang='ts'>
  import { SteeringBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type $$Props = Partial<Pick<SteeringBehavior, 'active' | 'weight'>> & {
    behavior?: SteeringBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined

  const behavior = useBehavior(new SteeringBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
</script>
