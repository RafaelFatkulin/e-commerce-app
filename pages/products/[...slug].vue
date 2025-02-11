<script lang="ts" setup>
import type { RootCategory } from "~/types/categories";
import type { ErrorResponse, SuccessResponse } from "~/types/response";

const nuxtApp = useNuxtApp();
const route = useRoute();

const { data, status, error } = useAsyncData<
  SuccessResponse<RootCategory>,
  ErrorResponse
>("category-by-slug", async () =>
  nuxtApp.$api(`/categories/slug/${route.params.slug[0]}`)
);
</script>

<template>
  <h1>
    {{ data?.data.title }}
  </h1>
  <span>{{ data?.data.shortTitle }}</span>
  <span>{{ data?.data.slug }}</span>

  <span>{{ status }}</span>

  <p>{{ error?.data?.message }}</p>
  <p>{{ JSON.stringify(error?.data?.errors) }}</p>
</template>

<style></style>
