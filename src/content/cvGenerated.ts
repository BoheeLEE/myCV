import cvData from '../generated/cv-data.json'

export type Contact = {
  email?: string
  website?: string
  scholar?: string
  hindex?: string
}

export type Position = {
  title: string
  institution: string
  period: string
}

export type Employment = {
  raw: string
  title: string
  institution: string
  period: string
  projects: string[]
  skills?: string[]
  researchSummary?: string
}

export type Education = {
  degree: string
  details: string[]
  funding?: string
  supervisors?: string
  project?: string
}

export type ServiceItem = {
  text: string
  is_list: boolean
}

export type CVData = {
  name: string
  credentials: string
  contact: Contact
  summary: string
  currentPosition: Position
  employment: Employment[]
  education: Education[]
  publications: string[]
  manuscriptsUnderReview: string[]
  fundingAwards: string[]
  teaching: string[]
  service: ServiceItem[]
  conferences: string[]
  skills: string[]
}

export default cvData as CVData
