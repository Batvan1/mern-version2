import { createSlice } from '@reduxjs/toolkit'; // redux slice'ı oluşturulmaya yarayan modül

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => { // action fonksiyonu çağıdığımız sıradaki fonksiyonun içerisine verdiğimiz parametre değişken.. state ise reduxtan gelen modülün içerisinde ki oluşturdsuğumuz initiaa state..
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },

    logout: (state, action) => {
      state.userInfo = null;
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
    },
    
  },
});

export const { setCredentials, logout } = authSlice.actions; // reducers key'i içerisidneki oluşturulan fonksiyonlar dışa sikik redux authSlice.actions yapısı içerisinden dışa aktarılıyor

export default authSlice.reducer;
