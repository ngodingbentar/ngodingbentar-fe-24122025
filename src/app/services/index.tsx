const getProducts = async (query?: string) => {
  const data = await import("../products/products.json");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (query) {
    return data.default.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  return data.default;
}

const getProductBySlug = async (slug: string) => {
  const data = await import("../products/products.json");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data.default.find((product) => product.slug === slug);
}

export { getProducts, getProductBySlug }