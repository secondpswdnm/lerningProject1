import { fileURLToPath } from 'url'
import { dirname } from 'path'


export const getDirName = (moduleUrl) => {
  const filename = fileURLToPath(moduleUrl)
  return dirname(filename)
}



