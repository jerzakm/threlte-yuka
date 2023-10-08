<script lang='ts'>
  import { EvadeBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type Props = 'panicDistance' | 'predictionFactor' | 'pursuer'
  type $$Props = Partial<Pick<EvadeBehavior, 'active' | 'weight' | Props>> & {
    behavior?: EvadeBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined
  export let panicDistance: $$Props['panicDistance'] = undefined
  export let predictionFactor: $$Props['predictionFactor'] = undefined
  export let pursuer: $$Props['pursuer'] = undefined

  const behavior = useBehavior(new EvadeBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
  $: if (panicDistance !== undefined) behavior.panicDistance = panicDistance
  $: if (predictionFactor !== undefined) behavior.predictionFactor = predictionFactor
  $: if (pursuer !== undefined) behavior.pursuer = pursuer
</script>
