import { UniqueId } from '../valueObjects/UniqueId';
/**
 * @class Entity - Entity is a base class that can be extended to create a new entity. The entity is responsible for validating the data and creating the id
 * @template T The type of the props
 *
 * @prop {UniqueId} id - The id of the entity
 * @prop {T} props - The props that are required to create a new entity
 */
export class Entity<T> {
  private _id: UniqueId;
  private _isNewEntity: boolean;
  protected props: T;

  /**
   * A protected constructor that is used to create a new entity with the required properties...
   * The pattern is followwed by the entity class that is extend, implementing a SOLID architecture
   *
   * @param {T} props - The props that are required to create a new entity
   * @param {UniqueId=} id - The id of the entity. If not provided, it will be generated
   */
  protected constructor(props: T, id?: UniqueId) {
    this._id = id ?? UniqueId.create();
    this._isNewEntity = !id;
    this.props = props;
  }

  /**
   * Property that returns the uniqu  id
   * @returns {UniqueId}
   */
  get id(): UniqueId {
    return this._id;
  }

  get isNewEntity(): boolean {
    return this._isNewEntity;
  }

  /**
   * Method that is used to compare the entity with another entity
   *
   * @param {Entity} entity - Entity that is compared with the current entity
   * @returns {boolean} - Whether the entities are equal
   */
  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true;
    }

    if (entity.id.equals(this.id)) {
      return true;
    }

    return false;
  }
}
