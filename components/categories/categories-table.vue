<script lang="ts" setup>
import type { UTable } from '#components'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { RootCategory } from '~/types/categories'
import { useGetCategories } from '~/composables/categories/get-categories'

const { bordered = false } = defineProps<{
  bordered?: boolean
}>()

const { data, status, error, filter } = useGetCategories()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const columns: TableColumn<RootCategory>[] = [
  {
    accessorKey: 'shortTitle',
    header: ({ column }) => {
      const isSorted = filter.sort_order === 'asc'

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Название',
        icon: isSorted
          ? 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-narrow-wide',
        class: '-mx-2.5',
        onClick: () => {
          filter.page = 1
          filter.sort_by = 'shortTitle'
          filter.sort_order = isSorted ? 'desc' : 'asc'
        },
      })
    },
    cell: ({ row }) => {
      return h('div', { class: 'flex flex-col gap-1' }, [
        h(
          'p',
          { class: 'font-medium text-(--ui-text-highlighted)' },
          row.original.shortTitle,
        ),
        h('p', { class: 'text-xs' }, row.original.title),
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

function getRowItems(row: Row<RootCategory>): DropdownMenuItem[] {
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
      to: { name: 'dashboard-categories-id', params: { id: row.original.id } },
    },
  ]
}
</script>

<template>
  <UCard :ui="{
    root: !bordered ? '!border-0 ring-0 shadow-none rounded-none' : '',
    body: 'flex flex-col gap-4',
    header: 'flex flex-row items-center',
  }">
    <template
      v-if="bordered"
      #header
    >
      <div class="flex flex-col">
        <h2
          class="text-base text-pretty font-semibold text-(--ui-text-highlighted)"
        >
          Подкатегории
        </h2>
        <p class="text-sm text-pretty text-(--ui-text-muted)">
          Таблица подкатегорий
        </p>
      </div>

      <CategoriesCreateModal />
    </template>

    <CategoriesFilters />

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
  </UCard>
</template>
