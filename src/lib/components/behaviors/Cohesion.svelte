<script lang='ts'>
  import { CohesionBehavior } from 'yuka'
  import { useBehavior } from '../../hooks/useBehavior'

  type $$Props = Partial<Pick<CohesionBehavior, 'active' | 'weight'>> & {
    behavior?: CohesionBehavior
  }

  export let active: $$Props['active'] = undefined
  export let weight: $$Props['weight'] = undefined

  export const behavior = useBehavior(new CohesionBehavior())
  $: if (active !== undefined) behavior.active = active
  $: if (weight !== undefined) behavior.weight = weight
</script>
