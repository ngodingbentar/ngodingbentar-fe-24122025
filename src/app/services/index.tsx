const getProducts = async () => {
  const data = await import("../products/products.json");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data.default;
}

const getProductBySlug = async (slug: string) => {
  const data = await import("../products/products.json");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data.default.find((product) => product.slug === slug);
}

export { getProducts, getProductBySlug }