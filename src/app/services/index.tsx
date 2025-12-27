const getProducts = async () => {
  const data = await import("../products/products.json");
  console.log("data 1", data)
  console.log("data 2", data.default)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data.default;
}

export { getProducts }