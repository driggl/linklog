import * as DateUtils from '@/lib/utils/date-utils'

describe('DateUtils.formatDate', () => {
  test('returns date in "mm-dd-yyyy" format', () => {
    expect(DateUtils.formatDate('Sun May 11,2014')).toEqual('05-11-2014')
  })
})
