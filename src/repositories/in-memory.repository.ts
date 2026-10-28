import { BaseEntity, UpdateDto } from "../types";
import { IRepository } from "./repository.interface";

export class InMemoryRepository<T extends BaseEntity> implements IRepository<T> {
  protected items = new Map<string, T>();

  create(item: T): T {
    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | null {
    return this.items.get(id) ?? null;
  }

  findAll(): T[] {
    return [...this.items.values()];
  }

  update(id: string, patch: UpdateDto<T>): T | null {
    const existing = this.items.get(id);
    if (!existing) return null;

    const updated: T = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };
    this.items.set(id, updated);
    return updated;
  }

  deleteById(id: string): boolean {
    return this.items.delete(id);
  }
}