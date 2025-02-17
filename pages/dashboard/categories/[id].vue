<script lang="ts" setup>
import { useGetCategory } from "~/composables/categories/get-category";

definePageMeta({
  layout: "dashboard",
});

const route = useRoute();

const { data, error } = await useGetCategory(Number(route.params.id));

useHead(() => ({
  title: `Категории - ${data.value?.data.title}`,
}));

const isSame = computed(
  () => data.value?.data.title === data.value?.data.shortTitle
);
const hasParent = computed(() => data.value?.data.parentId);
watch(error, () => {
  error.value?.data;
});
</script>

<template>
  <DashboardPage>
    <template #header>
      <div class="flex flex-col">
        <DashboardTitle back>
          {{ data?.data.title }}

          <template
            v-if="!isSame"
            #subtitle
          >
            {{ data?.data.shortTitle }}
          </template>
        </DashboardTitle>
      </div>
    </template>

    <div class="p-4 grid gap-8 grid-cols-1 md:grid-cols-2">
      <UCard>
        <template #header>
          <svg
            class="inset-0 h-8 w-full stroke-(--ui-border-inverted)/10"
            fill="none"
          >
            <defs>
              <pattern
                id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
              </pattern>
            </defs>
            <rect
              stroke="none"
              fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
              width="100%"
              height="100%"
            ></rect>
          </svg>
        </template>
      </UCard>

      <CategoriesTable
        v-if="!hasParent"
        bordered
      />
    </div>
  </DashboardPage>
</template>
