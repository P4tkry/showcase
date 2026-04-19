import * as SkillIcons from '@fdorantesm/react-skill-icons'

type PackageSkillIconValue = keyof typeof SkillIcons

const legacySkillIconAliases = [
  { label: 'HTML5', value: 'html5', icon: 'HTML' },
  { label: 'CSS3', value: 'css3', icon: 'CSS' },
  { label: 'Sass', value: 'sass', icon: 'Sass' },
  { label: 'React', value: 'react', icon: 'ReactDark' },
  { label: 'Redux', value: 'redux', icon: 'Redux' },
  { label: 'Next.js', value: 'nextjs', icon: 'NextJSDark' },
  { label: 'Vite', value: 'vite', icon: 'ViteDark' },
  { label: 'TypeScript', value: 'typescript', icon: 'TypeScript' },
  { label: 'JavaScript', value: 'javascript', icon: 'JavaScript' },
  { label: 'Node.js', value: 'nodejs', icon: 'NodeJSDark' },
  { label: 'NestJS', value: 'nestjs', icon: 'NestJSDark' },
  { label: 'Prisma', value: 'prisma', icon: 'Prisma' },
  { label: 'MongoDB', value: 'mongodb', icon: 'MongoDB' },
  { label: 'MySQL', value: 'mysql', icon: 'MySQLDark' },
  { label: 'PostgreSQL', value: 'postgresql', icon: 'PostgreSQLDark' },
  { label: 'Redis', value: 'redis', icon: 'RedisDark' },
  { label: 'GraphQL', value: 'graphql', icon: 'GraphQLDark' },
  { label: 'Firebase', value: 'firebase', icon: 'FirebaseDark' },
  { label: 'Tailwind CSS', value: 'tailwind', icon: 'TailwindCSSDark' },
  { label: 'Docker', value: 'docker', icon: 'Docker' },
  { label: 'Git', value: 'git', icon: 'Git' },
  { label: 'GitHub', value: 'github', icon: 'GithubDark' },
  { label: 'Linux', value: 'linux', icon: 'LinuxDark' },
  { label: 'Vitest', value: 'vitest', icon: 'VitestDark' },
  { label: 'Notion', value: 'notion', icon: 'NotionDark' },
  { label: 'Figma', value: 'figma', icon: 'FigmaDark' },
  { label: 'Discord', value: 'discord', icon: 'Discord' },
  { label: 'Python', value: 'python', icon: 'PythonDark' },
  { label: 'PHP', value: 'php', icon: 'PHPDark' },
  { label: 'Laravel', value: 'laravel', icon: 'LaravelDark' },
  { label: 'Java', value: 'java', icon: 'JavaDark' },
  { label: '.NET', value: 'dotnet', icon: 'DotNet' },
  { label: 'C++', value: 'cpp', icon: 'CPP' },
] as const satisfies readonly {
  label: string
  value: string
  icon: PackageSkillIconValue
}[]

const genericSkillIconOptions = [
  { label: 'Cloud', value: 'cloud' },
  { label: 'Server', value: 'server' },
  { label: 'Database', value: 'database' },
  { label: 'API', value: 'api' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Desktop', value: 'desktop' },
  { label: 'Security', value: 'security' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Networking', value: 'networking' },
  { label: 'Automation', value: 'automation' },
  { label: 'AI', value: 'ai' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Design', value: 'design' },
  { label: 'Product', value: 'product' },
  { label: 'Management', value: 'management' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Performance', value: 'performance' },
  { label: 'Search', value: 'search' },
  { label: 'Storage', value: 'storage' },
  { label: 'Hosting', value: 'hosting' },
  { label: 'CLI', value: 'cli' },
  { label: 'CMS', value: 'cms' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Operations', value: 'operations' },
  { label: 'Testing', value: 'testing' },
  { label: 'Monitoring', value: 'monitoring' },
  { label: 'Observability', value: 'observability' },
  { label: 'Deployment', value: 'deployment' },
  { label: 'Integration', value: 'integration' },
  { label: 'Workflow', value: 'workflow' },
  { label: 'Research', value: 'research' },
  { label: 'SEO', value: 'seo' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'CRM', value: 'crm' },
  { label: 'Finance', value: 'finance' },
  { label: 'Support', value: 'support' },
  { label: 'QA', value: 'qa' },
  { label: 'Data', value: 'data' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'UI/UX', value: 'ui-ux' },
] as const

const acronymReplacements: Record<string, string> = {
  AWS: 'AWS',
  BSD: 'BSD',
  CLion: 'CLion',
  CMake: 'CMake',
  CPP: 'C++',
  CS: 'C#',
  CSS: 'CSS',
  DENO: 'Deno',
  DotNet: '.NET',
  GCP: 'GCP',
  GTK: 'GTK',
  HTML: 'HTML',
  IPFS: 'IPFS',
  JavaScript: 'JavaScript',
  MySQL: 'MySQL',
  NeoVim: 'NeoVim',
  NextJS: 'Next.js',
  NodeJS: 'Node.js',
  NuxtJS: 'NuxtJS',
  PHP: 'PHP',
  PostgreSQL: 'PostgreSQL',
  QT: 'Qt',
  SVG: 'SVG',
  TailwindCSS: 'Tailwind CSS',
  TypeScript: 'TypeScript',
  VSCode: 'VS Code',
  VSCodium: 'VS Codium',
  Vitest: 'Vitest',
  Vite: 'Vite',
}

const splitCamelCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim()

export const formatSkillIconLabel = (value: string) => {
  if (value in acronymReplacements) {
    return acronymReplacements[value]
  }

  const normalized = value.replace(/(Dark|Light)$/g, ' $1')
  return splitCamelCase(normalized)
}

const packageSkillIconNames = Object.entries(SkillIcons)
  .filter(([, component]) => typeof component === 'function')
  .map(([icon]) => icon as PackageSkillIconValue)

const legacyResolvedIconNames = new Set<PackageSkillIconValue>(
  legacySkillIconAliases.map((option) => option.icon),
)

const packageSkillIconOptions = packageSkillIconNames
  .filter((icon) => !legacyResolvedIconNames.has(icon))
  .sort((left, right) => formatSkillIconLabel(left).localeCompare(formatSkillIconLabel(right)))
  .map((icon) => ({
    label: formatSkillIconLabel(icon),
    value: icon,
  }))

export const skillIconOptions = [...genericSkillIconOptions, ...legacySkillIconAliases, ...packageSkillIconOptions]
export const featuredSkillIconValues = new Set<string>([
  ...genericSkillIconOptions.map((option) => option.value),
  ...legacySkillIconAliases.map((option) => option.value),
])

export type SkillIconValue = string

const legacySkillIconAliasMap = Object.fromEntries(
  legacySkillIconAliases.map((option) => [option.value, option.icon]),
) as Record<(typeof legacySkillIconAliases)[number]['value'], PackageSkillIconValue>

export const resolveSkillIconName = (value: string): PackageSkillIconValue | null => {
  if (packageSkillIconNames.includes(value as PackageSkillIconValue)) {
    return value as PackageSkillIconValue
  }

  return legacySkillIconAliasMap[value as keyof typeof legacySkillIconAliasMap] ?? null
}

export const skillIconLabelMap: Record<string, string> = Object.fromEntries(
  skillIconOptions.map((option) => [option.value, option.label]),
)

export const getSkillIconLabel = (value: string) => skillIconLabelMap[value] ?? formatSkillIconLabel(value)
