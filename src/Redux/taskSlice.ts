import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a Task
interface Task {
  id: number;
  name: string;
  dueDate: string;
  status: string;
  category: string;
  description: string;
}

// Initial state loaded from localStorage, or default to an empty array
const initialState: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // CREATE: Add a new task
    addTask(state, action: PayloadAction<Task>) {
      console.log("Adding Task:", action.payload); // Log the task being added
      state.push(action.payload); // Add the new task to the state
      localStorage.setItem("tasks", JSON.stringify(state)); // Update localStorage
      console.log("Updated Tasks after Add:", state); // Log the updated state
    },

    // READ: Load tasks (usually when app starts or state is reset)
    loadTasks(state, action: PayloadAction<Task[]>) {
      console.log("Loading Tasks:", action.payload); // Log the tasks being loaded
      state.length = 0; // Clear the current state (tasks)
      state.push(...action.payload); // Add the new tasks to the state
    },

    // UPDATE: Edit an existing task (accepts partial updates)
    editTask(state, action: PayloadAction<Partial<Task> & { id: number }>) {
      console.log("Editing Task:", action.payload); // Log the task being edited
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        // Update the task at the found index with the updated fields
        state[index] = { ...state[index], ...action.payload };
        localStorage.setItem("tasks", JSON.stringify(state)); // Save updated state in localStorage
        console.log("Updated Task at Index", index, state[index]); // Log the updated task
        console.log("Updated Tasks after Edit:", state); // Log the updated tasks
      }
    },

    // DELETE: Remove a single task by id
    removeTask(state, action: PayloadAction<number>) {
      console.log("Removing Task with ID:", action.payload); // Log the id of the task being removed
      const updatedTasks = state.filter((task) => task.id !== action.payload); // Remove task by id
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks in localStorage
      console.log("Updated Tasks after Remove:", updatedTasks); // Log the updated tasks
      return updatedTasks; // Return updated tasks
    },

    // DELETE MULTIPLE: Remove multiple tasks by an array of ids
    removeMultipleTasks(state, action: PayloadAction<number[]>) {
      console.log("Removing Multiple Tasks with IDs:", action.payload); // Log the ids of tasks being removed
      const updatedTasks = state.filter(
        (task) => !action.payload.includes(task.id) // Filter out tasks with ids in the array
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks in localStorage
      console.log("Updated Tasks after Multiple Remove:", updatedTasks); // Log the updated tasks
      return updatedTasks; // Return updated tasks
    },
  },
});

export const {
  addTask,
  loadTasks,
  removeTask,
  editTask,
  removeMultipleTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
