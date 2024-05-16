import { Optional } from '@shared/core/types/Optional'

const acceptedFeatures = [
  'multi-book',
  'time-lines',
  'structure',
  'planet',
  'nation',
  'person',
  'city',
  'race',
  'religion',
  'power',
  'family',
  'inst',
  'language',
] as const

export type Feature = (typeof acceptedFeatures)[number]
export type FeaturesUsing = Array<Feature> & { 0: Feature }

export interface ObjectFeatures {
  'multi-book': boolean
  structure: boolean
  planet: boolean
  nation: boolean
  person: boolean
  city: boolean
  race: boolean
  religion: boolean
  power: boolean
  family: boolean
  inst: boolean
  'time-lines': boolean
  language: boolean
}

export class Features {
  private _featuresUsing: FeaturesUsing

  private _invalids: string[]

  protected constructor(features: FeaturesUsing, invalids?: string[]) {
    this._featuresUsing = features
    this._invalids = invalids || []
  }

  static createFromString(value: string) {
    const splittedString = value.split('|')

    const featuresInvalid: string[] = []
    const featuresValid = splittedString.filter((f) => {
      const feature = f as Feature

      if (acceptedFeatures.includes(feature)) return true

      featuresInvalid.push(feature)

      return false
    }) as FeaturesUsing

    const features = new Features(featuresValid, featuresInvalid)

    return features
  }

  static createFromObject(
    objectFeatures: Optional<
      ObjectFeatures,
      | 'multi-book'
      | 'city'
      | 'family'
      | 'inst'
      | 'language'
      | 'nation'
      | 'person'
      | 'planet'
      | 'power'
      | 'race'
      | 'religion'
      | 'structure'
      | 'time-lines'
    >,
  ) {
    const featuresUsing: string[] = []
    const invalids: string[] = []

    Object.keys(objectFeatures).forEach((featureNameReceived) => {
      const featureName = featureNameReceived as Feature
      const featureActive = objectFeatures[featureName]

      if (featureActive) {
        featuresUsing.push(featureName)
      }
    })

    const filteredFeatures = featuresUsing.filter((feature) => {
      if (acceptedFeatures.includes(feature as Feature)) return true

      invalids.push(feature)

      return false
    })

    const features = new Features(filteredFeatures as FeaturesUsing, invalids)
    return features
  }

  static create(featuresUsing: FeaturesUsing) {
    const invalids: string[] = []
    const filteredFeatures = featuresUsing.filter((feature, i) => {
      if (
        featuresUsing.indexOf(feature) === i &&
        acceptedFeatures.includes(feature)
      )
        return true

      invalids.push(feature)
      return false
    })

    return new Features(filteredFeatures as FeaturesUsing, invalids)
  }

  static isValid(features: string | ObjectFeatures | FeaturesUsing): boolean {
    if (Array.isArray(features)) {
      const instancedFeatures = Features.create(features)
      const featuresLength = instancedFeatures.featuresUsing.length
      return (
        featuresLength !== 0 &&
        featuresLength > 0 &&
        instancedFeatures._invalids.length === 0
      )
    }

    if (typeof features === 'string') {
      const instancedFeatures = Features.createFromString(features)
      const featuresLength = instancedFeatures.featuresUsing.length
      return (
        featuresLength !== 0 &&
        featuresLength > 0 &&
        instancedFeatures._invalids.length === 0
      )
    }

    if (typeof features === 'object') {
      const instancedFeatures = Features.createFromObject(features)
      const featuresLength = instancedFeatures.featuresUsing.length
      return (
        featuresLength !== 0 &&
        featuresLength > 0 &&
        instancedFeatures._invalids.length === 0
      )
    }

    return false
  }

  enable(feature: Feature) {
    const featureIsApplied = this._featuresUsing.find((f) => f === feature)

    if (featureIsApplied) return

    this._featuresUsing.push(feature)
  }

  disable(feature: Feature) {
    const newFeatures = this._featuresUsing.filter((f) => f !== feature)
    this._featuresUsing = newFeatures as FeaturesUsing
  }

  isValid(): boolean {
    return Features.isValid(this.featuresUsing)
  }

  toString() {
    let featuresInString = ''

    this._featuresUsing.forEach((feature, i) => {
      if (i === 0) {
        featuresInString = feature
      } else {
        featuresInString = `${featuresInString}|${feature}`
      }
    })

    return featuresInString
  }

  toValue() {
    const value = {
      'multi-book': false,
      structure: false,
      planet: false,
      nation: false,
      person: false,
      city: false,
      race: false,
      religion: false,
      power: false,
      family: false,
      inst: false,
      'time-lines': false,
      language: false,
    }

    acceptedFeatures.forEach(
      (featureAccepted) =>
        (value[featureAccepted] =
          this._featuresUsing.includes(featureAccepted)),
    )

    return value
  }

  featureIsApplied(feature: Feature): boolean {
    const features = this.toValue()
    const featureToVerify = features[feature]
    return featureToVerify
  }

  get featuresUsing() {
    return this._featuresUsing
  }
}
