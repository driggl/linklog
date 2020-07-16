import * as TextUtils from './text-utils'

export function calculateErrorMessage(e) {
  try {
    const error = e.response.data.errors[0]
    const field = TextUtils.capitalize(error.source.pointer.replace('/data/attributes/', ''))

    return `${field} ${error.detail}`
  } catch (e) {
    return null
  }
}
