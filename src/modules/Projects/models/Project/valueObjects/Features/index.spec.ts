import { Features, FeaturesUsing, ObjectFeatures } from '.';

describe('Features data', () => {
  it('should be able to create an new features object', () => {
    const features = Features.create(['book', 'city']);

    expect(features.featuresUsing).includes('city');
    expect(features.featuresUsing).includes('book');
    expect(features.featuresUsing).not.includes('time-lines');
    expect(features.featuresUsing).toHaveLength(2);
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to exclude duplicated features and create an new features object', () => {
    const features = Features.create(['book', 'city', 'book']);

    expect(features.featuresUsing).includes('city');
    expect(features.featuresUsing).includes('book');
    expect(features.featuresUsing).not.includes('time-lines');
    expect(features.featuresUsing).toHaveLength(2);
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to create an new features object by object mapper', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
    });

    expect(features.featuresUsing).includes('time-lines');
    expect(features.featuresUsing).includes('city');
    expect(features.featuresUsing).not.includes('book');
    expect(features.featuresUsing).toHaveLength(2);
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to create an new features object by string', () => {
    const features = Features.createFromString('time-lines|city|planet');

    expect(features.featuresUsing).includes('time-lines');
    expect(features.featuresUsing).includes('city');
    expect(features.featuresUsing).includes('planet');
    expect(features.featuresUsing).not.includes('book');
    expect(features.featuresUsing).toHaveLength(3);
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to exclude not available features an create an new features object by string', () => {
    const features = Features.createFromString(
      'time-lines|city|planet|person|invalid'
    );

    expect(features.featuresUsing).includes('time-lines');
    expect(features.featuresUsing).includes('city');
    expect(features.featuresUsing).includes('planet');
    expect(features.featuresUsing).includes('person');
    expect(features.featuresUsing).not.includes('book');
    expect(features.featuresUsing).not.includes('invalid');
    expect(features.featuresUsing).toHaveLength(4);
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to get an string of features', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
      planet: true,
      book: false,
    });

    const featuresInString = features.toString();

    expect(featuresInString).toEqual('time-lines|city|planet');
  });

  it('should be able to get an array of features', () => {
    const features = Features.createFromObject({
      'time-lines': true,
      city: true,
      planet: true,
      inst: true,
      book: false,
    });

    const featuresInArray = features.featuresUsing;

    expect(featuresInArray).toHaveLength(4);
    expect(featuresInArray).includes('time-lines');
    expect(featuresInArray).includes('city');
    expect(featuresInArray).includes('planet');
    expect(featuresInArray).includes('inst');
    expect(featuresInArray).not.includes('book');
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to get an object of features', () => {
    const features = Features.create(['book', 'city', 'race', 'language']);

    const featuresInObject = features.toValue();

    expect(featuresInObject).toEqual({
      book: true,
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
    });
    expect(features.isValid()).toEqual(true);
  });

  it('should be able to create an features object with invalid parameters but it is discarded', () => {
    const features = Features.createFromObject({
      invalid: true,
      book: true,
    } as unknown as ObjectFeatures);

    expect(features.isValid()).toEqual(true);
    expect(features.featuresUsing).includes('book');
    expect(features.featuresUsing).not.includes('invalid');
  });

  it('should be able to create an features object using array with invalid parameters but it is discarded', () => {
    const features = Features.create([
      'book',
      'city',
      'invalid',
    ] as unknown as FeaturesUsing);

    expect(features.isValid()).toEqual(true);
    expect(features.featuresUsing).includes('book');
    expect(features.featuresUsing).includes('city');
    expect(features.featuresUsing).not.includes('invalid');
  });

  it('should be able to create an empty features object, but it is not valid', () => {
    const features = Features.createFromString('');
    const features2 = Features.createFromObject({});
    const features3 = Features.create([] as unknown as FeaturesUsing);

    expect(features.isValid()).toEqual(false);
    expect(features2.isValid()).toEqual(false);
    expect(features3.isValid()).toEqual(false);
  });
});
