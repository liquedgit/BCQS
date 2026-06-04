import { localDB } from "../lib/store/db";

export class Tenant {
  id: string;
  name: string;
  imageUrl: string | undefined;

  constructor(id: string, name: string, imageUrl: string | undefined) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

export async function GetAllTenants(): Promise<Tenant[]> {
  return localDB.tenants
    .map((t) => new Tenant(t.id, t.name, t.imageUrl))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function GetTenantById(tenantId: string): Promise<Tenant | undefined> {
  const t = localDB.tenants.find((t) => t.id === tenantId);
  if (!t) return undefined;
  return new Tenant(t.id, t.name, t.imageUrl);
}
