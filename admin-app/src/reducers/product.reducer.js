import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
      console.log("success Delete");
      // state = {
      //   ...state,
      //   loading: false,
      // };
      break;
  }

  return state;
};
