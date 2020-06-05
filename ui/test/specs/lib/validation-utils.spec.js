import * as ValidationUtils from '@/lib/utils/validation-utils'

describe('ValidationUtils.isValidEmail', () => {
  test('fails for random text without "@"', () => {
    expect(ValidationUtils.isValidEmail('dsaldjk')).toEqual(false)
  })

  test('pass for valid email', () => {
    expect(ValidationUtils.isValidEmail('lukasz@gmail.com')).toEqual(true)
  })
})

describe('ValidationUtils.isNotEmpty', () => {
  test('pass for not empty string', () => {
    expect(ValidationUtils.isNotEmpty('x')).toEqual(true)
  })

  test('fails for null', () => {
    expect(ValidationUtils.isNotEmpty(null)).toEqual(false)
  })

  test('fails for undefined', () => {
    expect(ValidationUtils.isNotEmpty(null)).toEqual(false)
  })

  test('fails for empty string', () => {
    expect(ValidationUtils.isNotEmpty('')).toEqual(false)
  })

  test('fails for empty array', () => {
    expect(ValidationUtils.isNotEmpty([])).toEqual(false)
  })
})
