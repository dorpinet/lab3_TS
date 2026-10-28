import { BaseEntity } from "./base-entity";
import { EntityStatus } from "./entity-status";

export interface BookEntity extends BaseEntity {
  title: string;
  price: number;
  isbn: string;
  pageCount: number;
  author: string;
  status: EntityStatus;
}