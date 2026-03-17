export const skillIconOptions = [
  { label: 'React', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Payload CMS', value: 'payload' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'Docker', value: 'docker' },
  { label: 'Git', value: 'git' },
  { label: 'Python', value: 'python' },
  { label: 'C++', value: 'cpp' },
] as const

export type SkillIconValue = (typeof skillIconOptions)[number]['value']

export const skillIconLabelMap: Record<SkillIconValue, string> = Object.fromEntries(
  skillIconOptions.map((option) => [option.value, option.label]),
) as Record<SkillIconValue, string>
