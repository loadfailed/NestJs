/**
     * @desc 将日期格式化成指定格式的字符串
     * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
     * @param format 目标字符串格式，1是yyyy-MM-dd HH:mm:ss，0是yyyy-MM-ddThh:mm:ssZ
     * @returns 返回格式化后的日期字符串
     */
function formatDate(date:Date | string | number) {
      if (!date) return
    
      const format = 'yyyy-MM-dd hh:mm:ss'
      switch (typeof date) {
        case 'string':
          date = new Date(date)
          break
        case 'number':
          date = new Date(date)
          break
      }
      if (!(date instanceof Date)) return
    
      const dict = {
    
        'yyyy': date.getFullYear(),
    
        'M': date.getMonth() + 1,
    
        'd': date.getDate(),
    
        'h': date.getHours(),
    
        'm': date.getMinutes(),
    
        's': date.getSeconds(),
    
        'MM': ('' + (date.getMonth() + 101)).substr(1),
    
        'dd': ('' + (date.getDate() + 100)).substr(1),
    
        'hh': ('' + (date.getHours() + 100)).substr(1),
    
        'mm': ('' + (date.getMinutes() + 100)).substr(1),
    
        'ss': ('' + (date.getSeconds() + 100)).substr(1)
    
      }
    
      return format.replace(/(yyyy|MM?|dd?|hh?|ss?|mm?)/g, val => dict[val] )
}

export default formatDate