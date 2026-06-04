import { localDB } from "../lib/store/db";

export class Product {
  id: string;
  name: string;
  imageUrl: string | undefined;
  price: number;

  constructor(id: string, name: string, imageUrl: string | undefined, price: number) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
  }
}

export async function GetAllProductFromTenants(tenantId: string): Promise<Product[] | null> {
  const tenant = localDB.tenants.find((t) => t.id === tenantId);
  if (!tenant) return null;
  return localDB.products
    .filter((p) => p.tenantId === tenantId)
    .map((p) => new Product(p.id, p.name, p.imageUrl, p.price))
    .sort((a, b) => a.price - b.price);
}

export async function DeleteProductFromTenants(product: Product, tenantId: string): Promise<boolean> {
  const idx = localDB.products.findIndex((p) => p.id === product.id && p.tenantId === tenantId);
  if (idx === -1) return false;
  localDB.products.splice(idx, 1);
  localDB.saveProducts();
  return true;
}

export async function UpdateProductFromTenants(product: Product, tenantId: string): Promise<boolean> {
  const idx = localDB.products.findIndex((p) => p.id === product.id && p.tenantId === tenantId);
  if (idx === -1) return false;
  localDB.products[idx] = { id: product.id, tenantId, name: product.name, imageUrl: product.imageUrl, price: product.price };
  localDB.saveProducts();
  return true;
}

export async function AddProductFromTenants(product: Product, tenantId: string): Promise<boolean> {
  const newProduct = { id: localDB.generateId(), tenantId, name: product.name, imageUrl: product.imageUrl, price: product.price };
  localDB.products.push(newProduct);
  localDB.saveProducts();
  return true;
}
