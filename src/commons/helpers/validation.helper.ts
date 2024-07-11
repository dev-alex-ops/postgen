export function slugify(...sources: string[]): string {
  const separator = '-'
  let result = ''

  for (const source of sources) {
    if (!source.trim()) {
      continue
    }

    let normalizedSource = source.toLowerCase().trim()
    normalizedSource = normalizedSource
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/(?<=\w)\.(?=\w)/g, separator)
      .replace(/[^\w\s{(?<=\w)\-(?=\w)}]+/g, '')
      .replace(/(\s\-\s)+/g, separator)
      .replace(/\s+/g, separator)
      .replace(/[^a-zA-Z0-9-]/g, '')
      .replace(/\-{2,}/g, separator)

    if (result !== '') {
      result += separator
    }
    result += normalizedSource
  }

  return result.trim()
}
