<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import { useGetCategories } from '~/composables/categories/get-categories';
import type { RootCategory } from '~/types/categories';

const UBadge = resolveComponent('UBadge')

const { parentId } = defineProps<{
  parentId: number
}>()

const { data, status, error, refresh } = useGetCategories(parentId)

const columns: TableColumn<RootCategory>[] = [
  {
    id: 'expand',
  },
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
          color: value ? 'error' : 'success',
        },
        () => (value ? 'не активна' : 'активна'),
      )
    },
  }
]
</script>

<template>
  <UTable
    :data="data?.data"
    :columns
    :loading="status === 'pending'"
    :ui="{
      base: 'border border-[var(--ui-border)]'
    }"
  >
    <template #empty>
      Нет данных
    </template>
  </UTable>
</template>