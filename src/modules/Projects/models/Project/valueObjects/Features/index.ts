import { Optional } from '@shared/core/types/Optional';

const acceptedFeatures = [
  'book',
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
] as const;

type Feature = (typeof acceptedFeatures)[number];
export type FeaturesUsing = Array<Feature> & { 0: Feature };

export interface ObjectFeatures {
  book: boolean;
  structure: boolean;
  planet: boolean;
  nation: boolean;
  person: boolean;
  city: boolean;
  race: boolean;
  religion: boolean;
  power: boolean;
  family: boolean;
  inst: boolean;
  'time-lines': boolean;
  language: boolean;
}

export class Features {
  private _featuresUsing: FeaturesUsing;

  protected constructor(features: FeaturesUsing) {
    this._featuresUsing = features;
  }

  static createFromString(value: string) {
    const splittedString = value.split('|');

    const featuresValid = splittedString.filter((f) => {
      const feature = f as Feature;
      return acceptedFeatures.includes(feature);
    }) as FeaturesUsing;

    const features = new Features(featuresValid);

    return features;
  }

  static createFromObject(
    objectFeatures: Optional<
      ObjectFeatures,
      | 'book'
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
    >
  ) {
    const featuresUsing: string[] = [];

    Object.keys(objectFeatures).forEach((featureNameReceived) => {
      const featureName = featureNameReceived as Feature;
      const featureActive = objectFeatures[featureName];

      if (featureActive) {
        featuresUsing.push(featureName);
      }
    });

    const filteredFeatures = featuresUsing.filter((feature) =>
      acceptedFeatures.includes(feature as Feature)
    );
    const features = new Features(filteredFeatures as FeaturesUsing);

    return features;
  }

  static create(featuresUsing: FeaturesUsing) {
    const filteredFeatures = featuresUsing.filter(
      (feature, i) =>
        featuresUsing.indexOf(feature) === i &&
        acceptedFeatures.includes(feature)
    );

    return new Features(filteredFeatures as FeaturesUsing);
  }

  static isValid(features: string | ObjectFeatures | FeaturesUsing): boolean {
    if (Array.isArray(features)) {
      const instancedFeatures = Features.create(features);
      const featuresLength = instancedFeatures.featuresUsing.length;
      return featuresLength !== 0 && featuresLength > 0;
    }

    if (typeof features === 'string') {
      const instancedFeatures = Features.createFromString(features);
      const featuresLength = instancedFeatures.featuresUsing.length;
      return featuresLength !== 0 && featuresLength > 0;
    }

    if (typeof features === 'object') {
      const instancedFeatures = Features.createFromObject(features);
      const featuresLength = instancedFeatures.featuresUsing.length;
      return featuresLength !== 0 && featuresLength > 0;
    }

    return false;
  }

  isValid(): boolean {
    return Features.isValid(this.featuresUsing);
  }

  toString() {
    let featuresInString: string = '';

    this._featuresUsing.forEach((feature, i) => {
      if (i === 0) {
        featuresInString = feature;
      } else {
        featuresInString = `${featuresInString}|${feature}`;
      }
    });

    return featuresInString;
  }

  toValue() {
    const value = {
      book: false,
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
    };

    acceptedFeatures.forEach(
      (featureAccepted) =>
        (value[featureAccepted] = this._featuresUsing.includes(featureAccepted))
    );

    return value;
  }

  get featuresUsing() {
    return this._featuresUsing;
  }
}
