<script setup lang="ts">
useHead({
  title: 'SANE - The Brands of 2025',
  meta: [
    { name: 'description', content: 'Discover the standout brands of 2025. Shop the latest collections from the top names in men\'s fashion, featured at Men\'s Fashion Week.' },
    { name: 'keywords', content: 'fashion, brands, 2025, men\'s fashion, catwalk, style' },

    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'SANE - The Brands of 2025' },
    { property: 'og:description', content: 'Discover the standout brands of 2025. Shop the latest collections from the top names in men\'s fashion, featured at Men\'s Fashion Week.' },
    { property: 'og:image', content: 'https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10392908/data/b63ef7c46929eb8337c46a59f4d45d50/1x1_messaging-side/637/2025-01-22-mw-webapp-key-designers-pre-s-multibrand-multicategory-img.jpeg' },
    { property: 'og:url', content: 'https://yourwebsite.com/sane' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SANE - The Brands of 2025' },
    { name: 'twitter:description', content: 'Discover the standout brands of 2025. Shop the latest collections from the top names in men\'s fashion, featured at Men\'s Fashion Week.' },
    { name: 'twitter:image', content: 'https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10392908/data/b63ef7c46929eb8337c46a59f4d45d50/1x1_messaging-side/637/2025-01-22-mw-webapp-key-designers-pre-s-multibrand-multicategory-img.jpeg' },
  ],
  link: [
    { rel: 'canonical', href: 'http://127.0.0.1:3000' },
  ],
})
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
        <!-- <nuxt-img alt="The brands of 2025" class="aspect-square w-full h-auto" src="https://cdn-static.farfetch-contents.com/cms-ccloud/caas/v1/media/10392908/data/b63ef7c46929eb8337c46a59f4d45d50/1x1_messaging-side/637/2025-01-22-mw-webapp-key-designers-pre-s-multibrand-multicategory-img.jpeg" /> -->
      </div>
    </u-container>
  </section>
</template>
