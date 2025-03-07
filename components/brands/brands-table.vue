<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { Brand } from '~/types/brands'
import { useDeleteBrand } from '~/composables/brands/delete-brand'
import { useGetBrands } from '~/composables/brands/get-brands'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { data, status, error, filter } = useGetBrands()
const { setBrandToDelete } = useDeleteBrand()

const columns: TableColumn<Brand>[] = [
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
        },
      })
    },
    cell: ({ row }) => {
      return h('div', { class: 'flex flex-col gap-1' }, [
        h(
          'p',
          { class: 'font-medium text-(--ui-text-highlighted)' },
          row.original.title,
        ),
      ])
    },
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

function getRowItems(row: Row<Brand>): DropdownMenuItem[] {
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
      to: { name: 'dashboard-brands-id', params: { id: row.original.id } },
    },
    {
      type: 'link',
      icon: 'i-lucide-trash-2',
      label: 'Удалить',
      color: 'error' as const,
      onSelect: () => setBrandToDelete(row.original),
    },
  ]
}
</script>

<template>
  <UCard
    :ui="{
      root: '!border-0 ring-0 shadow-none rounded-none',
      body: 'flex flex-col gap-4',
      header: 'flex flex-row items-center',
    }"
  >
    <UTable
      :ui="{
        root: 'border border-[var(--ui-border)] rounded-[calc(var(--ui-radius)*2)] shadow-sm',
      }"
      :data="data?.data"
      :columns
      :loading="status === 'pending'"
    >
      <template #empty>
        <span v-if="error">{{ error.data?.message }}</span>
        <span v-else>Нет данных</span>
      </template>
    </UTable>
    <UPagination
      v-model:page="filter.page"
      :items-per-page="filter.per_page"
      :total="data?.meta?.total"
      @update:page="(p) => (filter.page = p)"
    />

    <BrandsDeleteModal />
  </UCard>
</template>
