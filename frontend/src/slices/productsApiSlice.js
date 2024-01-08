import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// bu key'ler çağırılıp içerisindeki react'tan gelen fonksiyon sayesinde api isteği (backend) yapılıyor.
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProducts: builder.query({ // Çağıracağımız fonksiyonun adı key'de belirtildiği gibi değil sokuk redux başına use sonuna query veya mutation getiriyor
      query: ({ keyword, pageNumber }) => ({ // FONKSİYONU ÇAĞIRIRKEN SOKUK REACT'TA FONKSİYONUN İÇERİSİNDEKİ OLUŞTURULAN KEY'LER BU KEYLERRİN TAŞIDIĞI DEĞER PARAMS'TAKİ (url) değişken değer yani "?keyword=ayakkabı" gibi 
        url: PRODUCTS_URL, // standart URL
        params: { keyword, pageNumber }, // ÖRN  URL.COM  api/products?keyword=pahali&number=7
      }),
      keepUnusedDataFor: 5, // sorgunun cevabının ne kadar süreyle önbellekte (cache) tutulacağını belirtir. 
      providesTags: ['Products'], // önbellekteki verilerin etiketlenmesine ve bu etiketler aracılığıyla verilerin yeniden yüklenmesine olanak tanır. Bu sayede, örneğin bir veri güncellendiğinde veya değiştiğinde, bu etiketleri kullanan bileşenlerin otomatik olarak güncel verileri alması sağlanabilir.
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
    
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice; // BURADA EXPORT EDİLEN endpoint fonksiyonu içerisindeki key'ler fakat fark edildiği üzere export edilirken başına use sonuna ise istek get ise query veya istek post'sa mutation ismi koyuluyor
