import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=36.2&lon=37.1&appid=ab6f4be119dc74407dca71b1cc400a42",
    // {
    //   cancelToken: new axios.CancelToken((c) => {
    //     cancelAxios = c;
    //   }),
    // }
  );

  console.log(response);
  const responseTemp = Math.round(response.data.main.temp - 272.15);
  const min = Math.round(response.data.main.temp_min - 272.15);
  const max = Math.round(response.data.main.temp_max - 272.15);
  const discription = response.data.weather[0].description;
  const IconTemp = response.data.weather[0].icon;

  console.log(response);
  // setTemp({
  //   number: responseTemp,
  //   min: min,
  //   max: max,
  //   discription: discription,
  //   icon: `https://openweathermap.org/img/wn/${IconTemp}@2x.png`,
  return {
    number: responseTemp,
    min,
    max,
    discription,
    icon: `https://openweathermap.org/img/wn/${IconTemp}@2x.png`,
  };
});

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather:{},
    isLoading:false
  },

  reducers: {
    chngeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder){
    builder.addCase(fetchWeather.pending , (state)=>{
        console.log("receavid weatherApi/fetchWeather/pending");
        state.isLoading = true
    }).addCase(fetchWeather.fulfilled , (state , action)=>{
        state.isLoading=false
        state.weather = action.payload
    }).addCase(fetchWeather.rejected , (state)=>{
        state.isLoading=false
    })
  }
});

export const { chngeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
