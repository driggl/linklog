import * as TextUtils from '@/lib/utils/text-utils'

describe('TextUtils.slugify', () => {
  test('returns sluggified text', () => {
    expect(TextUtils.slugify('This is big car')).toEqual('this-is-big-car')
  })
})
