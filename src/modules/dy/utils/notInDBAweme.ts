import { DyAweme } from '../entity/dyAweme.entity'
function notInDBAweme(local:Array<string>, remote:Array<DyAweme>):Array<DyAweme> {
  return remote.filter((v:DyAweme) => {
    return !local.includes(v.id)
  })
}

export {
  notInDBAweme
}
