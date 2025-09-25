import { apiSlice } from "./apiSlice.js";
import { PRODUCT_URL, UPLOAD_URL } from "../constants.js";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProducts: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    createReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
    }),

    getLimitedProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/allproducts`,
        method: "GET",
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "GET",
      }),
      provideTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
  }),
});

export const {
  useCreateProductsMutation,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetLimitedProductsQuery,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} = productApiSlice;
