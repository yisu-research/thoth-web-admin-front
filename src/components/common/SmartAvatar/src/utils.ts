/**
 * 获取头像显示文本
 * @param text 原始文本
 * @returns 处理后的头像显示文本
 */
export function getAvatarText(text: string | null | undefined): string {
  if (!text) {
    return ''
  }

  // 去除空格并获取第一个字符
  const firstChar = text.trim().charAt(0)
  const textTrim = text.trim()

  // 判断第一个字符的类型
  if (/^\d/.test(firstChar)) {
    // 数字：截取前两个字符
    return textTrim.slice(0, 2)
  }
  else if (/^[a-z]/i.test(firstChar)) {
    // 字母：截取第一个字符并转大写
    return firstChar.toUpperCase()
  }
  else if (/^[\u4E00-\u9FA5]/.test(firstChar)) {
    // 汉字：截取第一个字符
    return firstChar
  }
  else {
    // 其他字符：截取第一个字符
    return firstChar
  }
}
