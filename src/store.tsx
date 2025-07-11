import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kimchi',
    reducers:{}
})

let stock = createSlice({
    name: 'stock',
    initialState: [10,11,12],
    reducers:{}
})

export default configureStore({
  reducer: { 
    user: user.reducer,
    stock: stock.reducer
  }
}) 