import { randomUUID } from "node:crypto";
import { BookRepository } from "./repositories";
import {
  ApiResponse,
  BookEntity,
  CreateDto,
  EntityStatus,
  EntitySummary,
  UpdateDto,
} from "./types";

const toBook = (dto: CreateDto<BookEntity>): BookEntity => {
  const now = new Date();
  return { ...dto, id: randomUUID(), createdAt: now, updatedAt: now };
};

const repo = new BookRepository();

console.log("== generic repository init ==");

const first = repo.create(
  toBook({
    title: "bembembem",
    price: 650,
    isbn: "978-0132350884",
    pageCount: 464,
    author: "Vereshchahing O.O.",
    status: EntityStatus.Active,
  }),
);
console.log(`Created | ID: ${first.id} | Status: ${first.status} | Title: ${first.title}`);

const second = repo.create(
  toBook({
    title: "potuzhno",
    price: 720,
    isbn: "978-0135957059",
    pageCount: 352,
    author: "Voloshin T.R.",
    status: EntityStatus.Active,
  }),
);
console.log(`Created | ID: ${second.id} | Status: ${second.status} | Title: ${second.title}`);

const third = repo.create(
  toBook({
    title: "meme beme",
    price: 800,
    isbn: "978-0134757599",
    pageCount: 448,
    author: "Neymet D.V.",
    status: EntityStatus.Draft,
  }),
);
console.log(`created | ID: ${third.id} | status: ${third.status} | title: ${third.title}`);

const patch: UpdateDto<BookEntity> = { price: 590, status: EntityStatus.Archived };
const updated = repo.update(first.id, patch);
console.log(`updated | ID: ${updated?.id} | price: ${updated?.price} | status: ${updated?.status}`);
console.log(`update of unknown id: ${repo.update("missing-id", patch)}`);

console.log(`found by id: ${repo.findById(second.id)?.title}`);
console.log(`deleted: ${repo.deleteById(third.id)} | deleted again: ${repo.deleteById(third.id)}`);
console.log(`entities in repository: ${repo.findAll().length}`);

console.log("\n== status record ==");
console.log(JSON.stringify(repo.getStatusAnalytics(), null, 2));

console.log("\n== pick ==");
const summaries: EntitySummary<BookEntity>[] = repo
  .findAll()
  .map(({ id, title, price }) => ({ id, title, price }));
console.log(JSON.stringify(summaries, null, 2));

console.log("\n== API response  ==");
const response: ApiResponse<BookEntity | null> = {
  success: updated !== null,
  data: updated,
  timestamp: new Date(),
  meta: { totalCount: repo.findAll().length, version: "1.0.0" },
};
console.log(JSON.stringify(response, null, 2));