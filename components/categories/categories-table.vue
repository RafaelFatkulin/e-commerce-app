<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { RootCategory } from "~/types/categories";
import { useRootCategories } from "~/composables/categories/root-categories";

const { data, status, error } = await useRootCategories();

const UBadge = resolveComponent("UBadge");

const columns: TableColumn<RootCategory>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "title",
    header: "Название",
  },
  {
    accessorKey: "isActive",
    header: "Статус",
    cell: ({ row }) => {
      const value = row.getValue("isActive");
      return h(
        UBadge,
        {
          size: "md",
          variant: "soft",
          color: value ? "error" : "success",
        },
        () => (value ? "не активна" : "активна")
      );
    },
  },
];
</script>

<template>
  <UTable
    :data="data?.data"
    :columns
    :loading="status === 'pending'"
  >
    <template #empty>Нет данных</template>
  </UTable>
</template>
