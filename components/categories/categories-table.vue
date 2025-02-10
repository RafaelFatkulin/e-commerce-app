<script lang="ts" setup>
import { useRootCategories } from "~/composables/categories/root-categories";
import type { Category, RootCategory } from "~/types/categories";
const { data, status, error } = await useRootCategories();
import type { TableColumn } from "@nuxt/ui";

console.log(data.value);

const columns: TableColumn<RootCategory>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) =>
      !!row.getValue("isActive")
        ? h("span", { class: "text-green-400" }, "active")
        : h("span", { class: "text-red-400" }, "not active"),
  },
];
</script>

<template>
  <UTable
    :data="data?.data"
    :columns
  />
</template>
