import type { Brand, BrandFilter } from "~/types/brands";
import type { ErrorResponse, SuccessResponse } from "~/types/response";

export const useGetBrands = () => {
  const nuxtApp = useNuxtApp();

  // Инициализация фильтра через useState
  const filter = useState<BrandFilter>("brands-filter", () => ({
    q: "",
    page: 1,
    per_page: 10,
    sort_by: "id",
    sort_order: "desc",
  }));

  // Вычисляемые параметры запроса
  const queryParamsRaw = computed(() => ({
    q: filter.value.q,
    page: filter.value.page,
    per_page: filter.value.per_page,
    sort_by: filter.value.sort_by,
    sort_order: filter.value.sort_order,
  }));

  // Применяем дебаунсинг ко всему объекту queryParams
  const queryParams = refDebounced(queryParamsRaw, 500);

  const response = useAsyncData<SuccessResponse<Brand[]>, ErrorResponse>(
    "get-brands",
    async () => await nuxtApp.$api("/brands", {
      params: queryParams.value,
    }),
    {
      watch: [queryParams], // Следим только за дебаунсед версией
      immediate: true,
      dedupe: "defer", // "defer" откладывает запросы до завершения предыдущего
    }
  );

  return { ...response, filter };
};