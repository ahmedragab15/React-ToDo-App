import { Box, Button, Card, CardContent, Container, Divider, Grid, Modal, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import toast from "react-hot-toast";

const initialTodos = {
  all: {
    name: "الكل",
    items: [
      { id: crypto.randomUUID(), header: "Learn React", body: "details", isCompleted: true },
      { id: crypto.randomUUID(), header: "Learn JS", body: "details", isCompleted: true },
      { id: crypto.randomUUID(), header: "Learn Next", body: "details", isCompleted: false },
    ],
  },
};

function TodoList() {
  const [tasksTaps, setTasksTaps] = useState(() => {
    const savedTodos = localStorage.getItem("Saved Todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  const [activeTap, setActiveTap] = useState("all");
  const [newTask, setNewTask] = useState({ header: "", body: "" });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editForm, setEditForm] = useState({ header: "", body: "" });

  useEffect(() => {
    localStorage.setItem("Saved Todos", JSON.stringify(tasksTaps));
  }, [tasksTaps]);

  const activeSectionHandler = (e) => {
    setActiveTap(e.target.value);
  };

  const addTaskHandler = () => {
    if (!newTask.header.trim()) return toast.error("قم بكتابة عنوان المهمة");
    if (!newTask.body.trim()) return toast.error("قم بكتابة وصف المهمة");

    const updatedsections = { ...tasksTaps };
    updatedsections["all"].items.push({
      id: crypto.randomUUID(),
      header: newTask.header,
      body: newTask.body,
      isCompleted: false,
    });
    setTasksTaps(updatedsections);
    setNewTask({ header: "", body: "" });
    toast.success("تمت إضافة المهمة");
  };

  const deleteTaskHandler = (id) => {
    const updated = { ...tasksTaps };
    updated.all.items = updated.all.items.filter((item) => item.id !== id);
    setTasksTaps(updated);
    toast.success("تم حذف المهمة");
  };

  const toggleCompletedHandler = (id) => {
    const updated = { ...tasksTaps };
    let updatedTask;
    updated.all.items = updated.all.items.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, isCompleted: !item.isCompleted };
        updatedTask = newItem;
        return newItem;
      }
      return item;
    });
    setTasksTaps(updated);
    if (updatedTask) {
      toast.success(updatedTask.isCompleted ? "تم انجاز المهمة" : "لم تنجز المهمة");
    }
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setEditForm({ header: task.header, body: task.body });
    setIsEditOpen(true);
  };

  const saveEditedTask = () => {
    if (!editForm.header.trim()) return toast.error("العنوان لا يمكن أن يكون فارغًا");
    if (!editForm.body.trim()) return toast.error("الوصف لا يمكن أن يكون فارغًا");

    const updated = { ...tasksTaps };
    updated.all.items = updated.all.items.map((item) => (item.id === taskToEdit.id ? { ...item, header: editForm.header, body: editForm.body } : item));

    setTasksTaps(updated);
    toast.success("تم التعديل");
    setIsEditOpen(false);
  };

  const sectionButtonsRendring = ["all", "finshed", "unfinshed"].map((key) => (
    <ToggleButton key={key} value={key} aria-label={key} color="success" sx={{ fontSize: 16, fontWeight: 600 }}>
      {
        {
          all: "الكل",
          finshed: "منجز",
          unfinshed: "غير منجز",
        }[key]
      }
    </ToggleButton>
  ));

  const getVisibleItems = () => {
    const allItems = tasksTaps.all.items;
    if (activeTap === "finshed") {
      return allItems.filter((item) => item.isCompleted);
    } else if (activeTap === "unfinshed") {
      return allItems.filter((item) => !item.isCompleted);
    }
    return allItems;
  };

  const visibleItems = getVisibleItems();
  const tasksListRendring =
    visibleItems.length > 0 ? (
      visibleItems.map((item) => {
        const { id, header, body, isCompleted } = item;
        return <Todo key={id} id={id} title={header} description={body} isCompleted={isCompleted} deleteTaskHandler={deleteTaskHandler} toggleCompletedHandler={toggleCompletedHandler} openEditModal={() => openEditModal(item)} />;
      })
    ) : (
      <Typography sx={{ padding: 3, color: "#777", fontSize: 18 }}> لا توجد مهام حالياً قم باضافة مهمة جديدة</Typography>
    );

  return (
    <>
      <Container maxWidth="sm">
        <Card variant="outlined" sx={{ minWidth: 275, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h1" sx={{ fontSize: 48, fontWeight: 600 }}>
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup value={activeTap} exclusive onChange={activeSectionHandler} aria-label="active Section" sx={{ marginTop: 3 }}>
              {sectionButtonsRendring}
            </ToggleButtonGroup>
          </CardContent>
          {tasksListRendring}
          <Grid container margin={2} spacing={2}>
            <Grid size={8} display={"flex"} gap={1}>
              <TextField fullWidth label="عنوان المهمة" variant="outlined" value={newTask.header} onChange={(e) => setNewTask({ ...newTask, header: e.target.value })} />
              <TextField fullWidth label="وصف المهمة" variant="outlined" value={newTask.body} onChange={(e) => setNewTask({ ...newTask, body: e.target.value })} />
            </Grid>
            <Grid size={4}>
              <Button fullWidth sx={{ height: "100%" }} variant="contained" onClick={addTaskHandler}>
                اضافة
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            تعديل المهمة
          </Typography>
          <TextField fullWidth label="العنوان الجديد" value={editForm.header} onChange={(e) => setEditForm({ ...editForm, header: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth label="الوصف الجديد" value={editForm.body} onChange={(e) => setEditForm({ ...editForm, body: e.target.value })} multiline rows={3} />
          <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={saveEditedTask}>
            حفظ
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default TodoList;