import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { sellerReducer } from "./reducers/sellerReducers";
import { productReducer } from "./reducers/productReducers";

const Store = configureStore({
    reducer:{
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
    },
});

export default Store;