
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProduct: (products) => set({ products }),

  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    
    set({ products: data.data });
  },

  postProduct: async (newProduct) => {
    if (!newProduct.name) {
      return { success: false, message: "Name is required." };
    }
    if (!newProduct.price) {
      return { success: false, message: "Price is required." };
    }
    if (!newProduct.image) {
      return { success: false, message: "Image is required." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();

    set((state) => ({
      products: [ ...state.products, data.data ]
    }));

    return { success: true, message: "Product is created." };
  },

  putProduct: async (id, updateProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateProduct)
    });
    const data = await res.json();

    if (!data.success) {
      return { success: data.success, message: data.message };
    }

    // Update UI immediately without needing a refresh
    set((state) => ({
      products: state.products.map(product => product._id === id ? data.data : product)
    }));

    return { success: data.success, message: data.message };
  },
  
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();

    if (!data.success) {
      return { success: data.success, message: data.message };
    }

    // Update UI immediately without needing a refresh
    set((state) => ({
      products: state.products.filter(product => product._id !== id)
    }));

    return { success: data.success, message: data.message };
  }
}));