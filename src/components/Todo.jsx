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
        Width: 275,
        maxWidth: "98%",
        borderRadius: 1,
        marginBlock: 1,
        marginInline: "auto",
        color: "#fff",
        bgcolor: "#283593",
        transition: "0.3s",
        "&:hover": {
          bgcolor: "#283463",
          boxShadow: "0px 7px 7px rgb(0, 0, 0,0.4)",
        },
      }}
    >
      <CardContent>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="h5" align="right" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} title={title}>
              {title}
            </Typography>
            <Typography variant="h6" align="right" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} title={description}>
              {description}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex", gap: 1, justifyContent:"center"}}>
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
