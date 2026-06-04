import { ADMIN_ROLE, TENANT_ROLE, USER_ROLE } from "../config/constant";

export interface DBUser {
  uid: string;
  email: string;
  password: string;
  role: string;
}

export interface DBTenant {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface DBProduct {
  id: string;
  tenantId: string;
  name: string;
  imageUrl?: string;
  price: number;
}

export interface DBOrderItem {
  productId: string;
  name: string;
  imageUrl?: string;
  price: number;
  qty: number;
}

export interface DBQueue {
  id: string;
  userid: string;
  tenantId: string;
  order: DBOrderItem[];
  status: string;
  createdAt: string;
}

const SEED_USERS: DBUser[] = [
  { uid: "user-001", email: "user@gmail.com", password: "user1234", role: USER_ROLE },
  { uid: "admin-001", email: "admin@gmail.com", password: "admin1234", role: ADMIN_ROLE },
  { uid: "tenant-001", email: "tenant1@gmail.com", password: "tenant1234", role: TENANT_ROLE },
];

const SEED_TENANTS: DBTenant[] = [
  { id: "tenant-001", name: "Warung Makan Bu Sari" },
  { id: "tenant-002", name: "Es Teh Indonesia" },
  { id: "tenant-003", name: "Bakso Pak Kumis" },
];

const SEED_PRODUCTS: DBProduct[] = [
  { id: "prod-001", tenantId: "tenant-001", name: "Nasi Goreng", price: 15000 },
  { id: "prod-002", tenantId: "tenant-001", name: "Mie Goreng", price: 12000 },
  { id: "prod-003", tenantId: "tenant-001", name: "Ayam Goreng", price: 20000 },
  { id: "prod-004", tenantId: "tenant-002", name: "Es Teh Manis", price: 5000 },
  { id: "prod-005", tenantId: "tenant-002", name: "Es Jeruk", price: 7000 },
  { id: "prod-006", tenantId: "tenant-003", name: "Bakso Biasa", price: 15000 },
  { id: "prod-007", tenantId: "tenant-003", name: "Bakso Special", price: 20000 },
];

function load<T>(key: string, seed: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [...seed];
}

function persist<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

type QueueListener = {
  type: "user" | "tenant";
  id: string;
  callback: (queues: DBQueue[]) => void;
};

class LocalDB {
  users: DBUser[];
  tenants: DBTenant[];
  products: DBProduct[];
  queues: DBQueue[];
  private queueListeners: QueueListener[] = [];

  constructor() {
    this.users = load("db_users", SEED_USERS);
    this.tenants = load("db_tenants", SEED_TENANTS);
    this.products = load("db_products", SEED_PRODUCTS);
    this.queues = load("db_queues", []);
  }

  saveUsers() { persist("db_users", this.users); }
  saveTenants() { persist("db_tenants", this.tenants); }
  saveProducts() { persist("db_products", this.products); }
  saveQueues() {
    persist("db_queues", this.queues);
    this.notifyQueueListeners();
  }

  subscribeUserQueue(userId: string, callback: (queues: DBQueue[]) => void): () => void {
    const listener: QueueListener = { type: "user", id: userId, callback };
    this.queueListeners.push(listener);
    callback(this.getUserQueues(userId));
    return () => {
      this.queueListeners = this.queueListeners.filter((l) => l !== listener);
    };
  }

  subscribeTenantQueue(tenantId: string, callback: (queues: DBQueue[]) => void): () => void {
    const listener: QueueListener = { type: "tenant", id: tenantId, callback };
    this.queueListeners.push(listener);
    callback(this.getTenantQueues(tenantId));
    return () => {
      this.queueListeners = this.queueListeners.filter((l) => l !== listener);
    };
  }

  private getUserQueues(userId: string): DBQueue[] {
    return this.queues
      .filter((q) => q.userid === userId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  private getTenantQueues(tenantId: string): DBQueue[] {
    return this.queues
      .filter((q) => q.tenantId === tenantId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  private notifyQueueListeners() {
    this.queueListeners.forEach(({ type, id, callback }) => {
      callback(type === "user" ? this.getUserQueues(id) : this.getTenantQueues(id));
    });
  }

  generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}

export const localDB = new LocalDB();
