import {getCubaREST} from "@cuba-platform/react";

type defaultRestParams = {
  view?: string
  limit?: number
  offset?: string
  sort?: string,
  [x: string]: any
}

class EntityCrudRest {
  updateEntity<T>(entityName: string, entityId: string, data: defaultRestParams):Promise<T> {
    return getCubaREST()!.fetch<T>("PUT", `v2/entities/${entityName}/${entityId}`, JSON.stringify(data))
  }

  getEntities<T>(entityName: string, data: defaultRestParams):Promise<T> {
    return getCubaREST()!.fetch<T>("GET", `v2/entities/${entityName}`, data)
  }
}

export default new EntityCrudRest();

