"use client";

import loginAction from "@/app/auth/login/loginAction";
import { AuthResponse } from "@/types";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const initialFormData: AuthResponse = {
  status: null,
  message: "",
};

const LoginForm = () => {
  const [state, action] = useFormState<AuthResponse, FormData>(
    loginAction,
    initialFormData
  );

  return (
    <Card sx={{ width: "350px" }}>
      <CardContent>
        <Typography variant="h6" align="center">
          Login
        </Typography>
        {state.status === "error" && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {state.message}
          </Alert>
        )}
        <Box
          component="form"
          mt={3}
          action={action}
          display="flex"
          flexDirection="column"
          rowGap={3}
        >
          <TextField
            type="email"
            fullWidth
            label="Email"
            size="small"
            id="email"
            name="email"
            required
          />
          <TextField
            type="password"
            fullWidth
            label="Password"
            size="small"
            name="password"
            required
          />
          <LoginButton />
        </Box>
        <Link
          href="/auth/register"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="text" sx={{ mt: 2, textAlign: "center" }}>
            Register
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
    >
      Login
    </Button>
  );
};

export default LoginForm;
