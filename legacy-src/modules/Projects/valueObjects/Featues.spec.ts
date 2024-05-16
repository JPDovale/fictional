import { Features, FeaturesUsing, ObjectFeatures } from './Features'

describe('Features data', () => {
  it('should be able to create an new features object', () => {
    const features = Features.create(['multi-book', 'city'])

    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).includes('multi-book')
    expect(features.featuresUsing).not.includes('time-lines')
    expect(features.featuresUsing).toHaveLength(2)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to exclude duplicated features and create an new features object', () => {
    const features = Features.create(['multi-book', 'city', 'multi-book'])

    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).includes('multi-book')
    expect(features.featuresUsing).not.includes('time-lines')
    expect(features.featuresUsing).toHaveLength(2)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to create an new features object by object mapper', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
    })

    expect(features.featuresUsing).includes('time-lines')
    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).not.includes('multi-book')
    expect(features.featuresUsing).toHaveLength(2)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to enable an new features', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
    })

    features.enable('multi-book')

    expect(features.featuresUsing).includes('time-lines')
    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).includes('multi-book')
    expect(features.featuresUsing).toHaveLength(3)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to disable an features', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
      'multi-book': true,
    })

    features.disable('multi-book')

    expect(features.featuresUsing).includes('time-lines')
    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).not.includes('multi-book')
    expect(features.featuresUsing).toHaveLength(2)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to create an new features object by string', () => {
    const features = Features.createFromString('time-lines|city|planet')

    expect(features.featuresUsing).includes('time-lines')
    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).includes('planet')
    expect(features.featuresUsing).not.includes('multi-book')
    expect(features.featuresUsing).toHaveLength(3)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to exclude not available features an create an new features object by string', () => {
    const features = Features.createFromString(
      'time-lines|city|planet|person|invalid',
    )

    expect(features.featuresUsing).includes('time-lines')
    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).includes('planet')
    expect(features.featuresUsing).includes('person')
    expect(features.featuresUsing).not.includes('multi-book')
    expect(features.featuresUsing).not.includes('invalid')
    expect(features.featuresUsing).toHaveLength(4)
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to get an string of features', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
      planet: true,
      'multi-book': false,
    })

    const featuresInString = features.toString()

    expect(featuresInString).toEqual('time-lines|city|planet')
  })

  it('should be able to get an array of features', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
      planet: true,
      inst: true,
      'multi-book': false,
    })

    const featuresInArray = features.featuresUsing

    expect(featuresInArray).toHaveLength(4)
    expect(featuresInArray).includes('time-lines')
    expect(featuresInArray).includes('city')
    expect(featuresInArray).includes('planet')
    expect(featuresInArray).includes('inst')
    expect(featuresInArray).not.includes('multi-book')
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to get an object of features', () => {
    const features = Features.create(['multi-book', 'city', 'race', 'language'])

    const featuresInObject = features.toValue()

    expect(featuresInObject).toEqual({
      'multi-book': true,
      city: true,
      family: false,
      inst: false,
      language: true,
      nation: false,
      person: false,
      planet: false,
      power: false,
      race: true,
      religion: false,
      structure: false,
      'time-lines': false,
    })
    expect(features.isValid()).toEqual(true)
  })

  it('should be able to create an features object with invalid parameters but it is discarded', () => {
    const features = Features.createFromObject({
      invalid: true,
      'multi-book': true,
    } as unknown as ObjectFeatures)

    expect(features.isValid()).toEqual(true)
    expect(features.featuresUsing).includes('multi-book')
    expect(features.featuresUsing).not.includes('invalid')
  })

  it('should be able to create an features object using array with invalid parameters but it is discarded', () => {
    const features = Features.create([
      'multi-book',
      'city',
      'invalid',
    ] as unknown as FeaturesUsing)

    expect(features.isValid()).toEqual(true)
    expect(features.featuresUsing).includes('multi-book')
    expect(features.featuresUsing).includes('city')
    expect(features.featuresUsing).not.includes('invalid')
  })

  it('should be able to create an empty features object, but it is not valid', () => {
    const features = Features.createFromString('')
    const features2 = Features.createFromObject({})
    const features3 = Features.create([] as unknown as FeaturesUsing)

    expect(features.isValid()).toEqual(false)
    expect(features2.isValid()).toEqual(false)
    expect(features3.isValid()).toEqual(false)
  })

  it('should be able to verify if one feature is applied', () => {
    const features = Features.create(['multi-book', 'city'])

    const featureMiltBookIsApplied = features.featureIsApplied('multi-book')
    const featureCityIsApplied = features.featureIsApplied('city')
    const featurePersonIsApplied = features.featureIsApplied('person')

    expect(featureMiltBookIsApplied).toEqual(true)
    expect(featureCityIsApplied).toEqual(true)
    expect(featurePersonIsApplied).toEqual(false)
  })

  it('should be able to validate one object feature dismounted', () => {
    const featuresIsValid = Features.isValid({
      city: true,
      'multi-book': true,
      'time-lines': false,
      family: true,
      inst: true,
      language: true,
      nation: true,
      person: true,
      planet: true,
      power: false,
      race: false,
      religion: false,
      structure: true,
    })

    const featuresIsValid2 = Features.isValid({
      city: true,
      'multi-book': true,
      'time-lines': false,
      family: true,
      inst: true,
      language: true,
      nation: true,
      person: true,
      planet: true,
      power: false,
      race: false,
      religion: false,
      structure: true,
      invalid: true,
    } as unknown as ObjectFeatures)

    expect(featuresIsValid).toEqual(true)
    expect(featuresIsValid2).toEqual(false)
  })
}
