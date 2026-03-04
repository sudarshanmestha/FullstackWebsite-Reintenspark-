import fs from 'fs'
import path from 'path'

type Metadata = { title: string; publishedAt: string; summary: string; image?: string }

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) return { metadata: {} as Metadata, content: fileContent }
  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}
  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    if (!key) return
    let value = valueArr.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim() as keyof Metadata] = value
  })
  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  try { return fs.readdirSync(dir).filter(f => path.extname(f) === '.mdx') }
  catch { return [] }
}

function readMDXFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(raw)
}

function getMDXData(dir: string) {
  return getMDXFiles(dir).map(file => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return { metadata, slug, content }
  })
}

export function getBlogPosts() {
  const dir = path.join(process.cwd(), 'app', 'more', 'posts')
  return getMDXData(dir)
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) date = `${date}T00:00:00`
  let targetDate = new Date(date)
  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()
  let formatted = yearsAgo > 0 ? `${yearsAgo}y ago`
    : monthsAgo > 0 ? `${monthsAgo}mo ago`
    : daysAgo > 0 ? `${daysAgo}d ago`
    : 'Today'
  let full = targetDate.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
  return includeRelative ? `${full} (${formatted})` : full
}
