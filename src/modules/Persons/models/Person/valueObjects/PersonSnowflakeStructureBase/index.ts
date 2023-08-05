import { Optional } from '@shared/core/types/Optional';

interface PersonSnowflakeStructureBaseProps {
  function: string | null;
  objective: string | null;
  motivation: string | null;
  obstacle: string | null;
  apprenticeship: string | null;
  povByThisEye: string | null;
}

export class PersonSnowflakeStructureBase {
  private _function: string | null;

  private _objective: string | null;

  private _motivation: string | null;

  private _obstacle: string | null;

  private _apprenticeship: string | null;

  private _povByThisEye: string | null;

  private constructor(
    personSnowflakeStructureBase: PersonSnowflakeStructureBaseProps
  ) {
    this._function = personSnowflakeStructureBase.function;
    this._objective = personSnowflakeStructureBase.objective;
    this._motivation = personSnowflakeStructureBase.motivation;
    this._obstacle = personSnowflakeStructureBase.obstacle;
    this._apprenticeship = personSnowflakeStructureBase.apprenticeship;
    this._povByThisEye = personSnowflakeStructureBase.povByThisEye;
  }

  static create(
    personSnowflakeStructureBase: Optional<
      PersonSnowflakeStructureBaseProps,
      | 'apprenticeship'
      | 'function'
      | 'motivation'
      | 'objective'
      | 'obstacle'
      | 'povByThisEye'
    >
  ) {
    const newPersonSnowflakeStructureBase = new PersonSnowflakeStructureBase({
      apprenticeship: personSnowflakeStructureBase.apprenticeship ?? null,
      function: personSnowflakeStructureBase.function ?? null,
      motivation: personSnowflakeStructureBase.motivation ?? null,
      objective: personSnowflakeStructureBase.objective ?? null,
      obstacle: personSnowflakeStructureBase.obstacle ?? null,
      povByThisEye: personSnowflakeStructureBase.povByThisEye ?? null,
    });

    return newPersonSnowflakeStructureBase;
  }

  get function() {
    return this._function;
  }

  get objective() {
    return this._objective;
  }

  get apprenticeship() {
    return this._apprenticeship;
  }

  get motivation() {
    return this._motivation;
  }

  get obstacle() {
    return this._obstacle;
  }

  get povByThisEye() {
    return this._povByThisEye;
  }
}
