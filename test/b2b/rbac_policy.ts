import { Policy } from "../../lib";

export const MOCK_RBAC_POLICY: Policy = {
  resources: [
    {
      resource_id: "documents",
      description: "",
      actions: ["create", "read", "write", "delete"],
    },
    {
      resource_id: "images",
      description: "",
      actions: ["create", "read", "delete"],
    },
  ],
  roles: [
    {
      role_id: "default",
      description: "",
      permissions: [],
    },
    {
      role_id: "organization_admin",
      description: "",
      permissions: [
        {
          actions: ["*"],
          resource_id: "documents",
        },
        {
          actions: ["*"],
          resource_id: "images",
        },
      ],
    },
    {
      role_id: "editor",
      description: "",
      permissions: [
        {
          actions: ["read", "write"],
          resource_id: "documents",
        },
        {
          actions: ["create", "read", "delete"],
          resource_id: "images",
        },
      ],
    },
    {
      role_id: "reader",
      description: "",
      permissions: [
        {
          actions: ["read"],
          resource_id: "documents",
        },
        {
          actions: ["read"],
          resource_id: "images",
        },
      ],
    },
  ],
  scopes: [
    {
      scope: "read:data",
      description: "Reads documents and images",
      permissions: [
        {
          actions: ["read"],
          resource_id: "documents",
        },
        {
          actions: ["read"],
          resource_id: "images",
        },
      ],
    },
    {
      scope: "write:data",
      description: "Edits documents and images",
      permissions: [
        {
          actions: ["read", "write"],
          resource_id: "documents",
        },
        {
          actions: ["create", "read", "delete"],
          resource_id: "images",
        },
      ],
    },
    {
      scope: "crud:data",
      description: "All CRUD operations on documents and images",
      permissions: [
        {
          actions: ["create", "read", "write", "delete"],
          resource_id: "documents",
        },
        {
          actions: ["create", "read", "delete"],
          resource_id: "images",
        },
      ],
    },
    {
      scope: "wildcard:data",
      description: "All CRUD operations on documents and images",
      permissions: [
        {
          actions: ["*"],
          resource_id: "documents",
        },
        {
          actions: ["*"],
          resource_id: "images",
        },
      ],
    },
  ],
};
