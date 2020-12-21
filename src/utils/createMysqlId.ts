/*
 * @Author: your name
 * @Date: 2020-10-07 02:53:24
 * @LastEditTime: 2020-10-07 03:45:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/src/utils/mysql.id.ts
 */
import FlakeId = require('flake-idgen')
import intformat = require('biguint-format')

const flakeIdGen = new FlakeId()

export default () => {
  return intformat(flakeIdGen.next(), 'dec')
}
