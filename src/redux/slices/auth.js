import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { doSignOut, doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "@/firebase/auth";

const initialState = {
  currentUser: null,
  userLoggedIn: false,
  loading: true,
  error: null,
};

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({ user, loggedIn: true });
        } else {
          resolve({ user: null, loggedIn: false });
        }
      }, (error) => rejectWithValue(error.message));
    });
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await doSignOut();
  return null;
});

export const createUserWithEmailAndPassword = createAsyncThunk(
  'auth/createUserWithEmailAndPassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await doCreateUserWithEmailAndPassword(email, password);
      return result.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await doSignInWithGoogle();
      return result.user;  
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sharedExtraReducers = (builder) => {
  builder
    .addCase(initializeAuth.pending, (state) => {
      state.loading = true;
    })
    .addCase(initializeAuth.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.userLoggedIn = action.payload.loggedIn;
      state.loading = false;
    })
    .addCase(initializeAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  builder.addCase(signOut.pending, (state) => {
    state.loading = true;
  })
    .addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.currentUser = null;
      state.userLoggedIn = false;
    })
  builder.addCase(signInWithGoogle.pending, (state) => {
    state.loading = true;
  })
    .addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.userLoggedIn = true;
    })
    .addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  builder
    .addCase(createUserWithEmailAndPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(createUserWithEmailAndPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.userLoggedIn = true;
    })
    .addCase(createUserWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: sharedExtraReducers,
  reducers: {},
});

export default authSlice.reducer;