import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

import { logout } from './authSlice'; // Import the logout action

// NOTE: code here has changed to handle when our JWT and Cookie expire.
// We need to customize the baseQuery to be able to intercept any 401 responses
// and log the user out
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery

// buradaki kodlar ne işe yarıyor ?
const baseQuery = fetchBaseQuery({ // Bu, API isteklerinin temelini oluşturan HTTP istemcisidir.
  baseUrl: BASE_URL, 
});

//alttaki fonksiyon üstekini genişletir ve extra yetkilendirme kontrolü yapar
async function baseQueryWithAuth(args, api, extra) { // Bu fonksiyon, baseQuery'yi genişletir ve her istekten önce yetkilendirme işlemlerini kontrol etmek için kullanılır.Bu işlev, baseQuery'yi çağırarak API isteğini gerçekleştirir ve sonucu alır.
  
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}

export const apiSlice = createApi({//createApi, RTK Query'nin ana bileşenidir ve API tarafından sağlanan verilerin yönetimini kolaylaştırır.
  baseQuery: baseQueryWithAuth, // Use the customized baseQuery (yani üstte oluşturduğpumuz özelleşti,rilmiş baseQuery kullanıyoruz)
  tagTypes: ['Product', 'Order', 'User'], // belirli türdeki verileri etiketlemek için kullanılır. Bu, verileri organize etmeye ve kullanımı kolaylaştırmaya yardımcı olur.
  endpoints: (builder) => ({}), //  builder fonksiyonu aracılığıyla, özel API endpoint'lerini tanımlamak için kullanılabilir. yani /api/product gibileri...
});
