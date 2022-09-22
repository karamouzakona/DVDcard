import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../config";

interface InputFormData {
  email: string;
  time: string;
  type: "cross" | "weights";
  rsdate: Date;
  classId: string;
}

const initFormData: InputFormData = {
  email: localStorage.getItem("email") || "",
  time: "18:00",
  type: "cross",
  rsdate: new Date(),
  classId: "",
};

const ReservationPage = () => {
  const [dvds, setDvds] = useState([]);
  const [newDvd, setNewDvd] = useState("");

  const dataCall = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/dvds`);

      setDvds(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    dataCall();
  }, []);

  const onAdd = useCallback(async () => {
    await axios.post(`${baseUrl}/dvds`, { title: newDvd });

    setNewDvd("");
    dataCall();
  }, [newDvd]);

  const onRemove = useCallback(async (index) => {
    await axios.delete(`${baseUrl}/dvds/${index}`);

    dataCall();
  }, []);

  return (
    <Stack direction="column" spacing={3}>
      <Card style={{ width: "100%", height: "100px" }}>Card id: test</Card>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          value={newDvd}
          onChange={(e) => setNewDvd(e.target.value)}
          id="outlined-basic"
          label="New Dvd"
          variant="outlined"
        />
        <Button color="primary" variant="outlined" onClick={onAdd}>
          ADD
        </Button>
      </Stack>

      {dvds.map((dvd, index) => (
        <Stack
          key={index}
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={1}
        >
          <Typography color="textPrimary" variant="h6">
            {dvd}
          </Typography>
          <Button
            onClick={() => onRemove(index)}
            style={{ marginLeft: "auto" }}
            color="error"
            variant="outlined"
          >
            REMOVE
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};

export default ReservationPage;
