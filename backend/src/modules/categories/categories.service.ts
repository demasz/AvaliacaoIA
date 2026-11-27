import { Category } from "../../models/index.ts";
import type { CategoryDto } from "../../types/api.ts";

export async function listCategories(): Promise<CategoryDto[]> {
  const categories = await Category.findAll({
    attributes: ["id", "name", "slug"],
    include: [{ association: "products", attributes: [], where: { active: true }, required: true }],
    group: ["Category.id"],
    order: [["name", "ASC"]],
  });

  return categories.map(({ id, name, slug }) => ({ id, name, slug }));
}
