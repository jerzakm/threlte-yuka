<svelte:options immutable />

<script lang='ts'>
  import { WanderBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type Props = 'distance' | 'jitter' | 'radius'
  type $$Props = Partial<Pick<WanderBehavior, 'active' | 'weight' | Props>> & {
    behavior?: WanderBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined
  export let distance: $$Props['distance'] = undefined
  export let jitter: $$Props['jitter'] = undefined
  export let radius: $$Props['radius'] = undefined

  export const behavior = useBehavior(new WanderBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
  $: if (distance !== undefined) behavior.distance = distance
  $: if (jitter !== undefined) behavior.jitter = jitter
  $: if (radius !== undefined) behavior.radius = radius
</script>
