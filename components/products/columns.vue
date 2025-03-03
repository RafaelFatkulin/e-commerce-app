<script lang="ts" setup>
import type { ButtonProps, TableColumn } from '@nuxt/ui';
import type { ProductWithInfo } from '~/types/products';
import type { Row } from '@tanstack/vue-table'
import { useGetProducts } from '~/composables/products/get-products';

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { filter } = useGetProducts()

const columns: TableColumn<ProductWithInfo>[] = [
  {
    accessorKey: 'title',
    header: () => {
      const isSorted = filter.value.sort_order === 'asc'

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Название',
        icon: isSorted
          ? 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-narrow-wide',
        class: '-mx-2.5',
        onClick: () => {
          filter.value.page = 1
          filter.value.sort_by = 'title'
          filter.value.sort_order = isSorted ? 'desc' : 'asc'
        }
      } as ButtonProps)
    }
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      const value = row.getValue('status')
      return h(
        UBadge,
        {
          size: 'md',
          variant: 'soft',
          color: value === 'active' ? 'success' : 'error',
        },
        () => (value === 'active' ? 'активна' : 'не активна'),
      )
    },
  },
  {
    accessorKey: 'brandId',
    header: 'Бренд',
    cell({ row }) {
      const value = row.original.brand
      return h(
        UBadge,
        {
          size: 'md',
          variant: 'soft',
          color: 'info',
        },
        () => value,
      )
    },
  },
  {
    accessorKey: 'categoryId',
    header: 'Категория',
    cell({ row }) {
      const value = row.original.category
      return h(
        UBadge,
        {
          size: 'md',
          variant: 'soft',
          color: 'info',
        },
        () => value,
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
            }),
        ),
      )
    },
  },
]

function getRowItems(row: Row<ProductWithInfo>) {
  return [
    {
      type: 'label',
      label: 'Действия',
    },
    {
      type: 'separator',
    },
    {
      type: 'link',
      icon: 'i-lucide-pencil',
      label: 'Редактировать',
      to: { name: 'dashboard-products-id', params: { id: row.original.id } },
    },
    {
      type: 'link',
      icon: 'i-lucide-trash-2',
      label: 'Удалить',
      color: 'error' as const,
      onSelect: () => { }
    },
  ]
}
</script>

<template>
  <slot
    :columns
    :getRowItems
  />
</template>