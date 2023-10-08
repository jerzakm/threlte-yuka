<script lang='ts'>
  import { SeparationBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'
	import type { FleeBehavior } from '$lib';

  type $$Props = Partial<Pick<SeparationBehavior, 'active' | 'weight'>> & {
    behavior?: FleeBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined

  export const behavior = useBehavior(new SeparationBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
</script>
