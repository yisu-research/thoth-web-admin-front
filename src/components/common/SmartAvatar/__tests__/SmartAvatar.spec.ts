import { describe, expect, it } from 'vitest'
import { getAvatarText } from '../src/utils'

describe('getAvatarText', () => {
  // 测试空值情况
  it('should return empty string for empty input', () => {
    expect(getAvatarText('')).toBe('')
    expect(getAvatarText(null as any)).toBe('')
    expect(getAvatarText(undefined as any)).toBe('')
  })

  // 测试数字开头的情况
  it('should return first two characters for number input', () => {
    expect(getAvatarText('123')).toBe('12')
    expect(getAvatarText('1')).toBe('1')
    expect(getAvatarText('12345')).toBe('12')
  })

  // 测试英文字母的情况
  it('should return capitalized first letter for alphabetic input', () => {
    expect(getAvatarText('abc')).toBe('A')
    expect(getAvatarText('john')).toBe('J')
    expect(getAvatarText('MARY')).toBe('M')
  })

  // 测试中文字符的情况
  it('should return first character for Chinese input', () => {
    expect(getAvatarText('张三')).toBe('张')
    expect(getAvatarText('李四丰')).toBe('李')
    expect(getAvatarText('王')).toBe('王')
  })

  // 测试特殊字符的情况
  it('should return first character for special characters', () => {
    expect(getAvatarText('@special')).toBe('@')
    expect(getAvatarText('#tag')).toBe('#')
    expect(getAvatarText('$100')).toBe('$')
  })

  // 测试带空格的输入
  it('should handle input with spaces correctly', () => {
    expect(getAvatarText('  abc')).toBe('A')
    expect(getAvatarText(' 123 ')).toBe('12')
    expect(getAvatarText('  张三  ')).toBe('张')
  })
})
