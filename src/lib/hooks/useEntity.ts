import type { GameEntity } from 'yuka'
import { onMount } from 'svelte'
import { getManager } from './useParent'

export const useEntity = <T extends GameEntity>(entity: T): T => {
  const manager = getManager()
  onMount(() => {
    manager.add(entity)
    return () => manager.remove(entity)
  })
  return entity as T
}
