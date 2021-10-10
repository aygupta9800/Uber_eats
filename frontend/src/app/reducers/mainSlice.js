import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
    allRestList: [],
    favResList: [],
    token: "",
    // 1 for customer and 2 for restaurant
    userType: undefined,
    resProfile: {},
    resMenu: [],
    resOrders: [],
    customerProfile: {},
    customerMenu: [],
    customerOrders: [],
    selectedRes: null,
    cart: [],
    customerSignupSuccessMsg: '',
    resSignupSuccessMsg: '',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onCustomerSignup: (state, action) => {
      state.customerSignupSuccessMsg= action.payload?.msg;
    },
    onResSignup: (state, action) => {
      state.resSignupSuccessMsg= action.payload?.msg;
    },
    onCustomerLogin: (state, action) => {
      const data = action.payload;
      state.token= data.token;
      state.customerProfile = data;
      state.userType = 1;
    },
    onResLogin: (state, action) => {
      const data = action.payload;
      state.token= data.token;
      state.resProfile = data;
      state.userType = 2;
    },
    onCustomerLogout: (state, action) => {
      state.token= '';
      state.userType = undefined;
      state.cart = [];
      state.favResList= [];
      state.customerProfile = {};
      state.customerSignupSuccessMsg = '';
    },
    onResLogout: (state, action) => {
      state.token= '';
      state.userType = undefined;
      state.resProfile = {};
      state.resMenu = [];
      state.resSignupSuccessMsg = '';
    },
    updateResProfile: (state, action) => {
      state.resProfile = action.payload;
    },
    updateCustomerProfile: (state, action) => {
      state.customerProfile = action.payload;
    },
    getResMenu: (state, action) => {
      console.log("action", action.payload);
      state.resMenu = action.payload;
    },
    getAllResList: (state, action) => {
      state.allRestList = action.payload;
    },
    getFavResList: (state, action) => {
      state.favResList = action.payload;
    },
    // getCustomersDeliveryAddress
    deleteResFromFavList: (state, action) => {
      const  { favourite_id } = action.payload
      const favList = state.favResList;
      const index = favList.findIndex(res => res?.favourite_id === favourite_id);
      if (index !== -1) {
        favList.splice(index, 1);
      }
      state.favResList = favList;
    },

    updateCustomerMenu: (state, action) => {
        state.customerMenu = action.payload;
    },
    updateCustomerOrders: (state, action) => {
        state.customerOrders= action.payload;
    },
    updateResOrders: (state, action) => {
        state.resOrders= action.payload;
    },
    addDishToCart: (state, action) => {
      const payload = action.payload
      let cartList = state.cart;
      const resIndex = cartList.findIndex(res => res.res_id === payload?.res?.res_id);
      if (resIndex === -1) {
        cartList.push({...payload?.res, dishes: [{ ...payload?.dish, quantity: 1}]})
      } else {
        const dishIndex= cartList[resIndex].dishes.findIndex(dish => dish.res_menu_id === payload?.dish?.res_menu_id);
        if (dishIndex === -1) {
          cartList[resIndex]?.dishes?.push({...payload?.dish, quantity: 1})
        } else {
          alert("Dish already added in cart")
        }
      }
      state.cart = cartList;
    },
    incrementDishCount: (state, action) => {
      const payload = action.payload;
      const { dish } = payload;
      let cartList = state.cart;
      const resIndex = cartList.findIndex(res => res.res_id === dish?.res_id);
      if (resIndex !== -1) {
        const dishIndex= cartList[resIndex].dishes.findIndex(dishItem => dishItem.res_menu_id === dish?.res_menu_id);
        if (dishIndex !== -1) {
          cartList[resIndex].dishes[dishIndex].quantity += 1
        }

      }

    },
    decrementDishCount: (state, action) => {
      const payload = action.payload;
      const { dish } = payload;
      let cartList = state.cart;
      const resIndex = cartList.findIndex(res => res.res_id === dish?.res_id);
      if (resIndex !== -1) {
        const dishIndex= cartList[resIndex].dishes.findIndex(dishItem => dishItem.res_menu_id === dish?.res_menu_id);
        if (dishIndex !== -1) {
          if (cartList[resIndex].dishes[dishIndex].quantity !== 1) {
            cartList[resIndex].dishes[dishIndex].quantity -= 1
          }
        }

      }
    },
    removeDishToCart: (state, action) => {
      let cartList = state.cart;
      const index = cartList.findIndex(item => item?.res?.res_menu_id === action.payload?.dish?.res_menu_id);
      if (index !== -1) {
        cartList.splice(index, 1);
      }
      state.cart = cartList;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    changeToken: (state, action) => {
        state.token = action.payload;
    },
    selectUserType: (state, action) => {
        state.userType = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
});

export const {
  onCustomerSignup, onResSignup, onCustomerLogin, onResLogin, onCustomerLogout, onResLogout,
  updateResProfile, updateCustomerProfile, getResMenu, getAllResList, getFavResList, deleteResFromFavList,
  changeToken, selectUserType, addDishToCart, removeDishToCart, clearCart, incrementDishCount, decrementDishCount,
  updateCustomerMenu, updateCustomerOrders, updateResOrders
 } = mainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default mainSlice.reducer;
