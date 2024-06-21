"use client";

import {
  UserSlice,
  fetchUserStore,
  updateUserStore,
} from "@/store/slices/userSlice";
import { AppState } from "@/store/store";
import {
  Alert,
  Box,
  Button,
  CardContent,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";

const Profile = () => {
  const state = useSelector<AppState, UserSlice>((state) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();

  const [formState, setFormState] = useState<UserSlice["data"]>({
    email: undefined,
    name: undefined,
    age: undefined,
    address: undefined,
    telp: undefined,
  });

  useEffect(() => {
    // fetch user data from api
    dispatch(fetchUserStore());
  }, []);

  useEffect(() => {
    // Set form state with user data
    setFormState({
      email: state.data.email,
      name: state.data.name,
      age: state.data.age,
      address: state.data.address,
      telp: state.data.telp,
    });
  }, [state.data]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <CardContent sx={{ pt: 0, px: 0 }}>
      {state.status === "loading" && <LinearProgress />}
      <Typography variant="h4" align="center" p={3}>
        Profile
      </Typography>
      {state.status === "error" && (
        <Alert sx={{ mb: 2 }} severity="error">
          {state.error || "Something went wrong, please try again later"}
        </Alert>
      )}
      {state.status === "success" && state.mode === "update" && (
        <Alert sx={{ mb: 2 }} severity="success">
          User data updated successfully
        </Alert>
      )}
      <Box
        component="form"
        p={3}
        display="flex"
        flexDirection="column"
        rowGap={3}
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            updateUserStore({
              name: formState.name!,
              age: formState.age!,
              address: formState.address!,
              telp: formState.telp!,
            })
          );
        }}
      >
        <TextField
          type="email"
          fullWidth
          label="Email"
          size="small"
          name="email"
          helperText="Email cannot be changed"
          defaultValue={formState.email || ""}
          variant="standard"
          disabled
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="text"
          fullWidth
          label="Name"
          size="small"
          name="name"
          value={formState.name || ""}
          onChange={handleChange}
          variant="standard"
          required
        />
        <TextField
          type="number"
          fullWidth
          label="Age"
          size="small"
          name="age"
          variant="standard"
          value={formState.age || ""}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          fullWidth
          label="Phone Number"
          size="small"
          name="telp"
          variant="standard"
          value={formState.telp || ""}
          onChange={handleChange}
          required
        />
        <TextField
          type="text"
          fullWidth
          label="Address"
          size="small"
          name="address"
          multiline
          rows={4}
          variant="standard"
          value={formState.address || ""}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={state.status === "loading"}
        >
          Update
        </Button>
        <LogoutButton />
      </Box>
    </CardContent>
  );
};

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    Cookie.remove("EBUDDY_TOKEN");
    setLoading(true);
    // add promise to simulate logout process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.replace("/auth/login");
  };

  return (
    <Button variant="text" onClick={logoutHandler} disabled={loading}>
      Logout
    </Button>
  );
};

export default Profile;
