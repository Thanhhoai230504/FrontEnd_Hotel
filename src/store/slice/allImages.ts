import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { Room } from "../../Types";

interface AxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
}

interface ImageState {
  images: string[];
  loading: boolean;
}

export const fetchImages = createAsyncThunk(
  "images/fetchImages", 
  async (_, thunkAPI) => {
    try {
      const response: AxiosResponse<Room[]> = await axiosClient.get("/rooms");

      const allImages = response.data.flatMap(room => room.images);
     
      return allImages;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialValue: ImageState = {
  images: [],
  loading: false,
};

export const ImagesSlice = createSlice({
  name: "ImagesSlice", 
  initialState: initialValue,
  reducers: {
    setImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.loading = false;
      console.error("Fetching images rejected. Error:", action.error.message);
    });
  },
});

export const { setImages, setLoading } = ImagesSlice.actions;
export default ImagesSlice.reducer;