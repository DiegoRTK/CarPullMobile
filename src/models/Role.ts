export interface Rol {
  roleAccountId: number;
  createdAt: Date;
  role: number | RolDetail;
}

export interface RolDetail {
  roleId: number;
  roleName: string;
  description: string;
  createdAt: Date;
}
