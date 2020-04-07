import _, { set, has, isEmpty } from 'lodash'
import produce from 'immer'

export const enhancedReducer = (state, updateArg) => {
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) }
  }

  if (updateArg.constructor === Object) {
    if (has(updateArg, 'path') && has(updateArg, 'value')) {
      const { path, value } = updateArg

      return produce(state, (draft) => {
        set(draft, path, value)
      })
    } else if (!isEmpty(updateArg)) {
      return { ...state, ...updateArg }
    }
  }

  return state
}