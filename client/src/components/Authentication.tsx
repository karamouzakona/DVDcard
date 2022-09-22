import React, { useCallback, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { baseUrl } from "../config";
import axios from "axios";

const Authentication = ({
  setIsUserAuthenticated,
}: {
  setIsUserAuthenticated: (prevState: boolean | (() => boolean)) => void;
}) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("user") || "test"
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") || "1234"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onConfirm = useCallback(async () => {
    try {
      setError("");

      const { data } = await axios.post(`${baseUrl}/user`, {
        userName,
        password,
      });

      if (data.error) {
        setError(data.error);
      } else {
        setIsUserAuthenticated(true);
      }
    } catch (e) {
      setError(e.message);
    }
  }, [password, userName]);

  return (
    <Stack spacing={2}>
      <Typography variant="h6" color="textPrimary">
        Card Info
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        id="outlined-basic"
        label="Card id"
        variant="outlined"
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            onConfirm();
          }
        }}
      />
      <TextField
        fullWidth
        size="small"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            onConfirm();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={onConfirm}>
        Login
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Stack>
  );
};

export default Authentication;
