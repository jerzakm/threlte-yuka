<script lang='ts'>
  import { ObstacleAvoidanceBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'
	import type { FleeBehavior } from '$lib';

  type Props = 'brakingWeight' | 'dBoxMinLength' | 'obstacles'
  type $$Props = Partial<Pick<ObstacleAvoidanceBehavior, 'active' | 'weight' | Props>> & {
    behavior?: FleeBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined
  export let brakingWeight: $$Props['brakingWeight'] = undefined
  export let dBoxMinLength: $$Props['dBoxMinLength'] = undefined
  export let obstacles: $$Props['obstacles'] = undefined

  export const behavior = useBehavior(new ObstacleAvoidanceBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
  $: if (brakingWeight !== undefined) behavior.brakingWeight = brakingWeight
  $: if (dBoxMinLength !== undefined) behavior.dBoxMinLength = dBoxMinLength
  $: if (obstacles !== undefined) behavior.obstacles = obstacles

  $: console.log(obstacles)
</script>
