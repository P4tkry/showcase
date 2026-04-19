type LexicalNode = {
  [key: string]: unknown
  children?: LexicalNode[]
  text?: string
  type?: string
}

export function lexicalToPlainText(value: unknown): string {
  if (!value || typeof value !== 'object' || !('root' in value)) {
    return ''
  }

  const lines: string[] = []

  const visit = (node: LexicalNode) => {
    if (typeof node.text === 'string') {
      lines.push(node.text)
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit)

      if (node.type === 'paragraph' || node.type === 'heading' || node.type === 'listitem') {
        lines.push('\n')
      }
    }
  }

  const root = (value as { root?: LexicalNode }).root

  if (root) {
    visit(root)
  }

  return lines.join('').replace(/\n{3,}/g, '\n\n').trim()
}

export function plainTextToLexical(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return {
    root: {
      children:
        paragraphs.length > 0
          ? paragraphs.map((paragraph) => ({
              children: paragraph.split('\n').flatMap((line, lineIndex, lines) => {
                const nodes: Array<{ detail: number; format: number; mode: string; style: string; text: string; type: string; version: number }> = [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: line,
                    type: 'text',
                    version: 1,
                  },
                ]

                if (lineIndex < lines.length - 1) {
                  nodes.push({
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '\n',
                    type: 'text',
                    version: 1,
                  })
                }

                return nodes
              }),
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
              type: 'paragraph',
              version: 1,
            }))
          : [
              {
                children: [],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                textStyle: '',
                type: 'paragraph',
                version: 1,
              },
            ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

export function cloneLexicalValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function collectLexicalTextNodes(value: unknown): string[] {
  if (!value || typeof value !== 'object' || !('root' in value)) {
    return []
  }

  const texts: string[] = []

  const visit = (node: LexicalNode) => {
    if (typeof node.text === 'string') {
      texts.push(node.text)
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit)
    }
  }

  const root = (value as { root?: LexicalNode }).root

  if (root) {
    visit(root)
  }

  return texts
}

export function replaceLexicalTextNodes<T>(value: T, texts: string[]): T {
  if (!value || typeof value !== 'object' || !('root' in (value as object))) {
    return value
  }

  const nextValue = cloneLexicalValue(value)
  let index = 0

  const visit = (node: LexicalNode) => {
    if (typeof node.text === 'string') {
      node.text = texts[index] ?? node.text
      index += 1
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit)
    }
  }

  const root = (nextValue as { root?: LexicalNode }).root

  if (root) {
    visit(root)
  }

  return nextValue
}
