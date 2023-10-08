<script lang='ts'>
  import { FleeBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type Props = 'panicDistance' | 'target'
  type $$Props = Partial<Pick<FleeBehavior, 'active' | 'weight' | Props>> & {
    behavior?: FleeBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined
  export let panicDistance: $$Props['panicDistance'] = undefined
  export let target: $$Props['target'] = undefined

  export const behavior = useBehavior(new FleeBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
  $: if (panicDistance !== undefined) behavior.panicDistance = panicDistance
  $: if (target !== undefined) behavior.target = target
</script>
