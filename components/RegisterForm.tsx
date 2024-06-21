"use client";

import registerAction from "@/app/auth/register/registerAction";
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
import { useFormState } from "react-dom";

const initialFormData: AuthResponse = {
  status: null,
  message: "",
};

const RegisterForm = () => {
  const [state, action] = useFormState<AuthResponse, FormData>(
    registerAction,
    initialFormData
  );

  return (
    <Card sx={{ width: "350px" }}>
      <CardContent>
        <Typography variant="h6" align="center">
          Register
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
          <RegisterButton />
        </Box>
        <Link
          href="/auth/login"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="text" sx={{ mt: 2, textAlign: "center" }}>
            Login
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const RegisterButton = () => {
  return (
    <Button type="submit" variant="contained" color="primary" size="large">
      Register
    </Button>
  );
};

export default RegisterForm;
