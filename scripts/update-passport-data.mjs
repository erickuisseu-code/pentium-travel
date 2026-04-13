import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { get } from 'node:https'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, '..')
const OUT_DIR   = join(ROOT, 'public', 'data')
const OUT_FILE  = join(OUT_DIR, 'passport-index.json')
const TMP_FILE  = join(OUT_DIR, 'passport-raw.csv')
const CSV_URL   = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy.csv'

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    get(url, (res) => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

function parseCsv(raw) {
  const lines = raw.split('\n').filter(Boolean)
  const index = {}
  for (let i = 1; i < lines.length; i++) {
    const [passport, destination, requirement] = lines[i].split(',').map(s => s.trim())
    if (!passport || !destination || !requirement) continue
    if (!index[passport]) index[passport] = {}
    index[passport][destination] = requirement
  }
  return index
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
  console.log('Downloading passport-index-tidy.csv ...')
  try {
    await download(CSV_URL, TMP_FILE)
    console.log('Downloaded.')
  } catch (err) {
    if (existsSync(TMP_FILE)) { console.warn('Using cached file:', err.message) }
    else throw err
  }
  const raw   = readFileSync(TMP_FILE, 'utf-8')
  const index = parseCsv(raw)
  writeFileSync(OUT_FILE, JSON.stringify(index, null, 0))
  console.log('passport-index.json written — ' + Object.keys(index).length + ' passports')
}

main().catch(err => { console.error(err.message); process.exit(1) })
