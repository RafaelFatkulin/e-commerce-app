export default () => {
  const paths = {
    products: {
      root: '/products',
      getAll: () => paths.products.root,
      id: (id: number) => paths.products.root.concat(`/${id}`),
      slug: (slug: string) => paths.products.root.concat(`/slug/${slug}`),
      create: () => paths.products.root,
      edit: (id: number) => paths.products.id(id).concat('/edit'),
      delete: (id: number) => paths.products.id(id).concat('/delete'),
    },
  }

  return paths
}
