import { Optional } from '@shared/core/types/Optional'

interface PersonSnowflakeStructureExpansionProps {
  function: string | null
  objective: string | null
  motivation: string | null
  obstacle: string | null
  apprenticeship: string | null
  povByThisEye: string | null
}

export class PersonSnowflakeStructureExpansion {
  private _function: string | null

  private _objective: string | null

  private _motivation: string | null

  private _obstacle: string | null

  private _apprenticeship: string | null

  private _povByThisEye: string | null

  private constructor(
    personSnowflakeStructureExpansion: PersonSnowflakeStructureExpansionProps,
  ) {
    this._function = personSnowflakeStructureExpansion.function
    this._objective = personSnowflakeStructureExpansion.objective
    this._motivation = personSnowflakeStructureExpansion.motivation
    this._obstacle = personSnowflakeStructureExpansion.obstacle
    this._apprenticeship = personSnowflakeStructureExpansion.apprenticeship
    this._povByThisEye = personSnowflakeStructureExpansion.povByThisEye
  }

  static create(
    personSnowflakeStructureExpansion: Optional<
      PersonSnowflakeStructureExpansionProps,
      | 'apprenticeship'
      | 'function'
      | 'motivation'
      | 'objective'
      | 'obstacle'
      | 'povByThisEye'
    >,
  ) {
    const newPersonSnowflakeStructureExpansion =
      new PersonSnowflakeStructureExpansion({
        apprenticeship:
          personSnowflakeStructureExpansion.apprenticeship ?? null,
        function: personSnowflakeStructureExpansion.function ?? null,
        motivation: personSnowflakeStructureExpansion.motivation ?? null,
        objective: personSnowflakeStructureExpansion.objective ?? null,
        obstacle: personSnowflakeStructureExpansion.obstacle ?? null,
        povByThisEye: personSnowflakeStructureExpansion.povByThisEye ?? null,
      })

    return newPersonSnowflakeStructureExpansion
  }

  get function() {
    return this._function
  }

  set function(func: string | null | undefined) {
    this._function = func === null ? null : func || this._function
  }

  get objective() {
    return this._objective
  }

  set objective(objective: string | null | undefined) {
    this._objective = objective === null ? null : objective || this._objective
  }

  get apprenticeship() {
    return this._apprenticeship
  }

  set apprenticeship(apprenticeship: string | null | undefined) {
    this._apprenticeship =
      apprenticeship === null ? null : apprenticeship || this._apprenticeship
  }

  get motivation() {
    return this._motivation
  }

  set motivation(motivation: string | null | undefined) {
    this._motivation =
      motivation === null ? null : motivation || this._motivation
  }

  get obstacle() {
    return this._obstacle
  }

  set obstacle(obstacle: string | null | undefined) {
    this._obstacle = obstacle === null ? null : obstacle || this._obstacle
  }

  get povByThisEye() {
    return this._povByThisEye
  }

  set povByThisEye(povByThisEye: string | null | undefined) {
    this._povByThisEye =
      povByThisEye === null ? null : povByThisEye || this._povByThisEye
  }
}
