import { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  fields: [
    {
      name: 'aboutMe',
      type: 'textarea',
      required: true,
      localized: true
    }
  ],
}
