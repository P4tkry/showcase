'use client'

import { useField } from '@payloadcms/ui'

import type { SkillIconValue } from '@/lib/skills'

import { SkillIcon, SkillIconOptionContent } from '@/app/(payload)/admin/components/skillIcons'

export function SkillIconPreview() {
  const { value } = useField<string>()
  const selectedValue = value as SkillIconValue | undefined

  if (!selectedValue) {
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
        <SkillIcon value={selectedValue} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span
          style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          Icon preview
        </span>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
          <SkillIconOptionContent value={selectedValue} />
        </span>
      </div>
    </div>
  )
}
