import Product from '../models/Product';

export const getAllProducts = async () => {
  try {
    return await Product.findAll();
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getProductById = async (id: number) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Failed to fetch product with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createProduct = async (data: any) => {
  try {
    return await Product.create(data);
  } catch (error) {
    throw new Error(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const updateProduct = async (id: number, data: any) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await product.update(data);
  } catch (error) {
    throw new Error(`Failed to update product with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return product;
  } catch (error) {
    throw new Error(`Failed to delete product with ID ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};