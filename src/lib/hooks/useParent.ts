import { setContext, getContext } from 'svelte'
import type { Vehicle, EntityManager } from 'yuka'

const managerKey = Symbol('manager')
const vehicleKey = Symbol('vehicle')

export const setManager = (manager: EntityManager): EntityManager => {
  setContext(managerKey, manager)
  return manager
}

export const getManager = (): EntityManager => {
  return getContext<EntityManager>(managerKey)
}

export const setVehicle = (vehicle: Vehicle): Vehicle => {
  setContext(vehicleKey, vehicle) 
  return vehicle
}

export const getVehicle = (): Vehicle => {
  return getContext<Vehicle>(vehicleKey)
}
