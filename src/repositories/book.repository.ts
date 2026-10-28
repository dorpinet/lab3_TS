import { BookEntity, EntityAnalytics, EntityStatus } from "../types";
import { InMemoryRepository } from "./in-memory.repository";

export class BookRepository extends InMemoryRepository<BookEntity> {
  getStatusAnalytics(): EntityAnalytics<BookEntity> {
    const counters: EntityAnalytics<BookEntity> = {
      [EntityStatus.Active]: 0,
      [EntityStatus.Archived]: 0,
      [EntityStatus.Draft]: 0,
    };
    for (const book of this.items.values()) counters[book.status]++;
    return counters;
  }
}