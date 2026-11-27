import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from "sequelize";
import { sequelize } from "../database/connection.ts";

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare slug: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare products?: NonAttribute<Product[]>;
}

Category.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING(80), allowNull: false },
    slug: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "categories", underscored: true },
);

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<string>;
  declare slug: string;
  declare name: string;
  declare description: string;
  declare priceCents: number;
  declare categoryId: string;
  declare imageUrl: string | null;
  declare featured: CreationOptional<boolean>;
  declare featuredLabel: string | null;
  declare active: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare category?: NonAttribute<Category>;
}

Product.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    priceCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "price_cents",
      validate: { min: 0 },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "category_id",
      references: { model: "categories", key: "id" },
    },
    imageUrl: { type: DataTypes.STRING(500), allowNull: true, field: "image_url" },
    featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    featuredLabel: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: "featured_label",
    },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "products", underscored: true },
);

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<string>;
  declare status: "CONFIRMED";
  declare totalCents: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare items?: NonAttribute<OrderItem[]>;
}

Order.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "CONFIRMED",
      validate: { isIn: [["CONFIRMED"]] },
    },
    totalCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "total_cents",
      validate: { min: 0 },
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "orders", underscored: true },
);

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<string>;
  declare orderId: string;
  declare productId: string | null;
  declare productName: string;
  declare unitPriceCents: number;
  declare quantity: number;
  declare subtotalCents: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare order?: NonAttribute<Order>;
  declare product?: NonAttribute<Product | null>;
}

OrderItem.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "order_id",
      references: { model: "orders", key: "id" },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "product_id",
      references: { model: "products", key: "id" },
    },
    productName: { type: DataTypes.STRING(120), allowNull: false, field: "product_name" },
    unitPriceCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "unit_price_cents",
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    subtotalCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "subtotal_cents",
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "order_items", underscored: true },
);

Category.hasMany(Product, { as: "products", foreignKey: "categoryId", onDelete: "RESTRICT" });
Product.belongsTo(Category, { as: "category", foreignKey: "categoryId" });
Order.hasMany(OrderItem, { as: "items", foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { as: "order", foreignKey: "orderId" });
Product.hasMany(OrderItem, { as: "orderItems", foreignKey: "productId" });
OrderItem.belongsTo(Product, { as: "product", foreignKey: "productId" });
