import type { SteeringBehavior } from 'yuka'
import { onMount } from 'svelte'
import { getVehicle } from './useParent'

export const useBehavior = <T extends SteeringBehavior>(behavior: T): T => {
  const parent = getVehicle()
  onMount(() => {
    parent.steering.add(behavior)
    return () => parent.steering.remove(behavior)
  })
  return behavior as T
}
