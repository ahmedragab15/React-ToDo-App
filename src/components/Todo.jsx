import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";

const Todo = ({ id, title, description, isCompleted, deleteTaskHandler, toggleCompletedHandler, openEditModal }) => {
  return (
    <Card
      id={id}
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: "98%",
        borderRadius: 1,
        marginBlock: 1,
        marginInline: "auto",
        color: "#fff",
        bgcolor: "#283593",
        transition: "0.3s",
        "&:hover": {
          bgcolor: "#283580",
          paddingBlock: 1,
          boxShadow: "0px 7px 7px rgb(0, 0, 0,0.4)",
        },
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={8}>
            <Typography variant="h5" align="right">
              {title}
            </Typography>
            <Typography variant="h6" align="right">
              {description}
            </Typography>
          </Grid>
          <Grid size={4} sx={{ display: "flex", gap: 1 }}>
            <IconButton aria-label="check" className="iconBtn" sx={{ bgcolor: isCompleted ? "#8bc34a" : "#fff", color: isCompleted ? "#fff" : "#8bc34a", border: "3px solid #8bc34a" }} onClick={() => toggleCompletedHandler(id)}>
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="edit" className="iconBtn" sx={{ bgcolor: "#fff", color: "#1769aa", border: "3px solid #1769aa" }} onClick={openEditModal}>
              <CreateIcon />
            </IconButton>
            <IconButton aria-label="delete" className="iconBtn" sx={{ bgcolor: "#fff", color: "#b23c17", border: "3px solid #b23c17" }} onClick={() => deleteTaskHandler(id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Todo;
