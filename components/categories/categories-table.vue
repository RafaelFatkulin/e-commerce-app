<script lang="ts" setup>
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { Category, RootCategory } from '~/types/categories'
import { useRootCategories } from '~/composables/categories/root-categories'
import type { _GlobalComponents } from '#components'

const { data, status, error } = await useRootCategories()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')


const columns: TableColumn<RootCategory>[] = [
  {
    accessorKey: 'title',
    header: 'Название',
    cell: ({ row }) => {
      return h('div', { class: 'flex flex-col gap-1' }, [
        h('p', { class: 'font-medium text-(--ui-text-highlighted)' }, row.original.shortTitle),
        h('p', { class: 'text-xs' }, row.original.title)
      ])
    }
  },
  {
    accessorKey: 'isActive',
    header: 'Статус',
    cell: ({ row }) => {
      const value = row.getValue('isActive')
      return h(
        UBadge,
        {
          size: 'md',
          variant: 'soft',
          color: value ? 'success' : 'error',
        },
        () => (value ? 'активна' : 'не активна'),
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
              align: 'end'
            },
            items: getRowItems(row)
          },
          () => h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            class: 'ml-auto'
          })
        )
      )
    }
  }
]

function getRowItems(row: Row<RootCategory>): DropdownMenuItem[] {
  console.log(row);

  return [
    {
      type: 'label',
      label: 'Действия'
    },
    {
      type: 'separator'
    },
    {
      type: 'link',
      icon: 'i-lucide-pencil',
      label: 'Редактировать',
      to: { name: 'dashboard-categories-id', params: { id: row.original.id } }
    },
    // {
    // type: '',
    // }
  ]
}
</script>

<template>
  <UTable
    :data="data?.data"
    :columns
    :loading="status === 'pending'"
  >
    <template #empty>
      Нет данных
    </template>
  </UTable>

</template>
