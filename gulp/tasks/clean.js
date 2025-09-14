import {deleteAsync} from 'del'
import config from '../config.js'

export default async function clean() {
  return await deleteAsync(config.dist.dist)
}