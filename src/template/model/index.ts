import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ModelClassName {
  /**
   * Getter For Primary Key'id'
   */
  public get _id() {
    return this.id;
  }

  @Property()
  public title!: string;

  @PrimaryKey()
  private id!: number;
}
