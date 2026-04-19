'use client'

import * as SkillIcons from '@fdorantesm/react-skill-icons'
import type { ComponentType, SVGProps } from 'react'
import {
  FaBookOpen,
  FaBolt,
  FaChartLine,
  FaCloud,
  FaCode,
  FaCogs,
  FaComments,
  FaDollarSign,
  FaDatabase,
  FaDesktop,
  FaFileAlt,
  FaGlobe,
  FaHdd,
  FaHeartbeat,
  FaLayerGroup,
  FaLightbulb,
  FaMobileAlt,
  FaPaintBrush,
  FaPlug,
  FaRobot,
  FaSearch,
  FaSitemap,
  FaServer,
  FaShieldAlt,
  FaShoppingCart,
  FaTachometerAlt,
  FaTerminal,
  FaTools,
  FaUsers,
  FaBullhorn,
  FaVial,
} from 'react-icons/fa'

import { getSkillIconLabel, resolveSkillIconName, type SkillIconValue } from '@/lib/skills'

type SkillIconOptionContentProps = {
  value: SkillIconValue
}

const genericSkillIconMap: Partial<Record<SkillIconValue, ComponentType<{ size?: number }>>> = {
  cloud: FaCloud,
  server: FaServer,
  database: FaDatabase,
  api: FaPlug,
  backend: FaLayerGroup,
  frontend: FaCode,
  mobile: FaMobileAlt,
  desktop: FaDesktop,
  security: FaShieldAlt,
  devops: FaCogs,
  infrastructure: FaServer,
  networking: FaGlobe,
  automation: FaBolt,
  ai: FaRobot,
  analytics: FaChartLine,
  design: FaPaintBrush,
  product: FaLayerGroup,
  management: FaUsers,
  documentation: FaFileAlt,
  collaboration: FaUsers,
  performance: FaTachometerAlt,
  search: FaSearch,
  storage: FaHdd,
  hosting: FaCloud,
  cli: FaTerminal,
  cms: FaFileAlt,
  architecture: FaSitemap,
  operations: FaTools,
  testing: FaVial,
  monitoring: FaHeartbeat,
  observability: FaHeartbeat,
  deployment: FaCloud,
  integration: FaPlug,
  workflow: FaCogs,
  research: FaBookOpen,
  seo: FaSearch,
  marketing: FaBullhorn,
  sales: FaDollarSign,
  crm: FaUsers,
  finance: FaDollarSign,
  support: FaComments,
  qa: FaVial,
  data: FaDatabase,
  'machine-learning': FaRobot,
  'ui-ux': FaPaintBrush,
}

export function SkillIcon({ value }: SkillIconOptionContentProps) {
  const GenericIcon = genericSkillIconMap[value]

  if (GenericIcon) {
    return <GenericIcon size={18} />
  }

  const resolvedIconName = resolveSkillIconName(value)

  if (!resolvedIconName) {
    return null
  }

  const Icon = SkillIcons[resolvedIconName] as ComponentType<SVGProps<SVGSVGElement>>

  return <Icon height={18} width={18} />
}

export function SkillIconOptionContent({ value }: SkillIconOptionContentProps) {
  return (
    <span style={{ alignItems: 'center', display: 'inline-flex', gap: 10 }}>
      <span
        style={{
          alignItems: 'center',
          display: 'inline-flex',
          fontSize: 16,
          height: 18,
        justifyContent: 'center',
        width: 18,
      }}
    >
        <SkillIcon value={value} />
      </span>
      <span>{getSkillIconLabel(value)}</span>
    </span>
  )
}
