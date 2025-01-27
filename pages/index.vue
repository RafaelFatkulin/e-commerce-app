<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section>
    <u-container>
      <div class="grid grid-cols-2">
        <div class="flex flex-col items-center justify-center gap-9">
          <h2 class="text-2xl">
            The brands of 2025
          </h2>
          <p class="max-w-[360px] text-center">
            Shop the standout names taking to the catwalks at Men's Fashion Week
          </p>
          <u-button variant="outline" color="neutral">
            Shop Now
          </u-button>
        </div>
        <nuxt-img class="aspect-square w-full h-auto" src="https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10392908/data/b63ef7c46929eb8337c46a59f4d45d50/1x1_messaging-side/637/2025-01-22-mw-webapp-key-designers-pre-s-multibrand-multicategory-img.jpeg" />
      </div>
    </u-container>
  </section>
</template>
