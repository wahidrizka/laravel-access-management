export interface UserTypes {
    id: number;
    name: string;
    email: string;
    roles: RolesForUsers[];
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

export interface UserHasRoles {
    role_id: number;
    model_id: number;
    name: string;
}

export interface RolesForUsers {
    [key: string]: string;
}

export interface PermissionTypes {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface RoleTypes {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface RoleHasPermissions {
    permission_id: number;
    role_id: number;
    permission_name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: UserTypes;
    };
};
