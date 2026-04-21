const originLabels: Record<string, string> = {
  French: '法语',
  Germanic: '日耳曼语',
  Greek: '希腊语',
  Latin: '拉丁语',
  'Old English': '古英语',
}

export function displayOrigin(origin: string) {
  return origin
    .split('/')
    .map((part) => originLabels[part] ?? part)
    .join('/')
}
