import readline from "readline";

// Define Todo type
type Todo = {
  id: number;
  text: string;
  priorityLevel: string;
};

// Store todos in memory (array)
let todos: Todo[] = [];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Add a new todo
const addTodo = (): void => {
  rl.question("Enter task: ", (text: string) => {
    if (text.trim() === "") {
      console.log("Task cannot be empty!\n");
    } else {
      rl.question(
        "Enter Priority Level(High/Medium/Low):",
        (pLevel: string) => {
          const newTodo: Todo = {
            id: Date.now(),
            text: text.trim(),
            priorityLevel: pLevel.trim(),
          };

          todos.push(newTodo);
          console.log(todos);
          console.log("✓ Task added successfully!\n");
          showMenu();
          // return;
        },
      );
    }
  });
};

// List all todos
const listTodos = (): void => {
  console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, list, remove, update, exit\n");

  if (todos.length === 0) {
    console.log("No todos yet!\n");
  } else {
    console.log("Your Todos:");
    todos.forEach((todo: Todo) => {
      console.log(
        `${todo.id} , Task Name: ${todo.text} , priority Level: ${todo.priorityLevel}`,
      );
    });
    console.log("");
  }

  process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });
};

// Remove a todo
const removeTodo = (): void => {
  rl.question("Enter task ID to remove: ", (input: string) => {
    const id: number = parseInt(input);

    // Use filter to create new array without the todo
    const updatedTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);

    if (updatedTodos.length === todos.length) {
      console.log("Task not found!\n");
    } else {
      todos = updatedTodos;
      console.log("Task removed successfully!\n");
    }
    setTimeout(() => {
      showMenu();
    }, 3000);
  });
};

// Update Todo
const updateTodo = (): void => {
  rl.question("Enter task ID to update: ", (idnum: string) => {
    const idindex: number = parseInt(idnum);

    if (todos.includes(todos.find((element) => element.id === idindex)!)) {
      console.log("Task found, you can update it.");
    } else {
      console.log("Task not found!\n");
      setTimeout(() => {
        showMenu();
      }, 2000);
      return;
    }

    rl.question("Enter new task: ", (text3: string) => {
      if (text3.trim() === "") {
        console.log("Task cannot be empty!\n");
      } else {
        todos.forEach((element, index) => {
          if (element.id === idindex) {
            if (todos[index]!.text) {
              todos[index]!.text = text3;
              console.log("Task updated successfully");
            } else {
              console.log("update error");
            }
          }
        });
      }

      // return;
    });
    setTimeout(() => {
      showMenu();
    }, 3000);
  });
};

// Handle command logic
const handleCommand = (command: string): void => {
  switch (command.trim().toLowerCase()) {
    case "add":
      addTodo();
      break;
    case "list":
      listTodos();
      break;
    case "remove":
      removeTodo();
      break;
    case "exit":
      console.log("Goodbye!");
      rl.close();
      break;
    case "update":
      updateTodo();
      break;
    default:
      console.log("Unknown command\n");
      showMenu();
  }
};

// Show menu and handle commands
const showMenu = (): void => {
  console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, list, remove, update, exit\n");
  process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });
};

// Start the app
console.log("\n=== Todo List App ===");
console.log("Commands: add, list, remove, update, exit\n");
showMenu();
