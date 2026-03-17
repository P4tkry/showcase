'use client'

import type { ReactNode } from 'react'

import { useField } from '@payloadcms/ui'
import { FaDocker, FaGitAlt, FaNodeJs, FaPython, FaReact } from 'react-icons/fa'
import { SiCplusplus, SiJavascript, SiNextdotjs, SiPayloadcms, SiPostgresql, SiTailwindcss, SiTypescript } from 'react-icons/si'

import { skillIconLabelMap, type SkillIconValue } from '@/lib/skills'

const iconMap: Record<SkillIconValue, ReactNode> = {
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  javascript: <SiJavascript />,
  nodejs: <FaNodeJs />,
  payload: <SiPayloadcms />,
  postgresql: <SiPostgresql />,
  tailwind: <SiTailwindcss />,
  docker: <FaDocker />,
  git: <FaGitAlt />,
  python: <FaPython />,
  cpp: <SiCplusplus />,
}

export function SkillIconPreview() {
  const { value } = useField<string>()
  const selectedValue = value as SkillIconValue | undefined

  if (!selectedValue || !(selectedValue in iconMap)) {
    return null
  }

  return (
    <div
      style={{
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        display: 'flex',
        gap: 12,
        marginTop: 12,
        padding: '12px 14px',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background: 'rgba(59, 130, 246, 0.12)',
          borderRadius: 12,
          color: '#93c5fd',
          display: 'flex',
          fontSize: 24,
          height: 48,
          justifyContent: 'center',
          width: 48,
        }}
      >
        {iconMap[selectedValue]}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Icon preview
        </span>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{skillIconLabelMap[selectedValue]}</span>
      </div>
    </div>
  )
}
