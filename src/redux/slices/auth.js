import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { doSignOut, doCreateUserWithEmailAndPassword } from "@/firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const initialState = {
  currentUser: null,
  userLoggedIn: null,
  loading: false,
  loadingGoogle: false,
  error: null,
};

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            const serializedUser = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            };
            resolve({ user: serializedUser, loggedIn: true });
          } else {
            resolve({ user: null, loggedIn: false });
          }
        },
        (error) => reject(rejectWithValue(error.message))
      );
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

      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        email: result.user.email,
        createdAt: new Date(),
        uid: result.user.uid,
      });

      const serializedUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };

      return serializedUser;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const doSignInWithEmailAndPassword = createAsyncThunk(
  'auth/doSignInWithEmailAndPassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const serializedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      return serializedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        email: result.user.email,
        createdAt: new Date(),
        uid: result.user.uid,
      }, { merge: true });

      const serializedUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };

      return serializedUser;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const sharedExtraReducers = (builder) => {
  builder
    .addCase(doSignInWithEmailAndPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(doSignInWithEmailAndPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.userLoggedIn = true;
    })
    .addCase(doSignInWithEmailAndPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
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
    state.loadingGoogle = true;
  })
    .addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loadingGoogle = false;
      state.currentUser = action.payload;
      state.userLoggedIn = true;
    })
    .addCase(signInWithGoogle.rejected, (state, action) => {
      state.loadingGoogle = false;
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

export const selectAuth = (state) => state.auth

export default authSlice.reducer;