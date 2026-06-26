const form = document.querySelector(".todoForm");
const todosBox = document.querySelector(".todosBox");
const logoutBtn = document.querySelector(".logOutBtn");

async function getLoggedInUser() {
  const res = await fetch("http://localhost:3000/loggedInUser");
  return await res.json();
}

async function saveUser(user) {
  await fetch("http://localhost:3000/loggedInUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todo = e.target[0].value.trim();

  if (!todo) return;

  const user = await getLoggedInUser();

  user.todos.push({
    id: Date.now(),
    todo,
    isEditing: false,
    isChecked: false,
  });

  await saveUser(user);

  e.target.reset();

  location.reload();
});

todosBox.addEventListener("click", async (e) => {
  const button = e.target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);

  const user = await getLoggedInUser();

  const todo = user.todos.find((t) => t.id === id);

  if (!todo) return;

  if (button.classList.contains("editBtn")) {
    const todoElement = button.closest(".todo");
    const input = todoElement.querySelector(".todoInput");

    if (!todo.isEditing) {
      todo.isEditing = true;
    } else {
      todo.todo = input.value.trim();
      todo.isEditing = false;
    }

    await saveUser(user);
    location.reload();
    return;
  }
  if (button.classList.contains("doneBtn")) {
    todo.isChecked = true;
    todo.isEditing = false;

    await saveUser(user);

    location.reload();
    return;
  }

  if (button.classList.contains("deleteBtn")) {
    user.todos = user.todos.filter((t) => t.id !== id);

    await saveUser(user);

    location.reload();

    return;
  }
});

logoutBtn.addEventListener("click", async () => {
  await fetch("http://localhost:3000/loggedInUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  window.location.href = "/login";
});
