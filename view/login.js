document
  .querySelector(".formBoxLogin")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    const user = users.find(
      (user) =>
        user.email === e.target[0].value && user.password === e.target[1].value
    );

    if (user) {
      const response = await fetch(`http://localhost:3000/loggedInUser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      e.target.reset();

      if (response.ok) {
        window.location.href = "/todo";
      }
    } else {
      alert("user is not available");
    }
  });
