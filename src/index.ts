import { shellCommand } from 'cerebro-tools'
import * as os from 'os'

const REGEXP = /fs\s(.*)/
const SEARCH_CMD = 'fd'
const OPEN_CMD = os.platform() === 'linux' ? 'xdg-open' : 'open'

async function queryFiles(query: string, display: any) {
  const stdout = await shellCommand(`${SEARCH_CMD} '${query}'`)
  const files = stdout.split('\n').map((path: string) => {
    return {
      title: path,
      onSelect: () => shellCommand(`${OPEN_CMD} '${path}'`)
    }
  })
  display(files)
  console.log(open)
}

function fn({ term, display }: any) {
  const match = term.match(REGEXP)
  if (match) {
    const query = match[1]
    if (query.length >= 3) {
      queryFiles(query, display)
    }
  }
}

export default {
  name: 'cerebro-file-search',
  fn,
  keyword: 'fs'
}
