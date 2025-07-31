function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskText = taskInput.value.trim();
  const date = taskDate.value;

  if (taskText === "" || date === "") return;

  const formattedDate = new Date(date).toDateString();

  let dateGroup = document.getElementById(formattedDate);
  if (!dateGroup) {
    // Create date group container
    dateGroup = document.createElement("div");
    dateGroup.className = "date-group";
    dateGroup.id = formattedDate;

    // Date title
    const dateTitle = document.createElement("div");
    dateTitle.className = "date-title";
    dateTitle.textContent = formattedDate;

    // Task list for this date
    const ul = document.createElement("ul");
    ul.className = "date-task-list";

    // Append to dateGroup
    dateGroup.appendChild(dateTitle);
    dateGroup.appendChild(ul);
    document.getElementById("taskList").appendChild(dateGroup);
  }

  // Create task list item
  const li = document.createElement("li");

  // Checkbox icon
  const icon = document.createElement("img");
  icon.src = "images/unchecked.png";
  icon.className = "task-icon";

  // Task text
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.className = "task-text";

  // Task container
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-content";
  taskDiv.appendChild(icon);
  taskDiv.appendChild(taskSpan);

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => {
    if (editBtn.textContent === "✏️") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskSpan.textContent;
      input.className = "edit-input";
      taskDiv.replaceChild(input, taskSpan);
      editBtn.textContent = "✔️";
    } else {
      const input = taskDiv.querySelector(".edit-input");
      taskSpan.textContent = input.value.trim() || "(empty task)";
      taskDiv.replaceChild(taskSpan, input);
      editBtn.textContent = "✏️";
    }
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    const ul = li.parentElement;
    li.remove();

    // Remove date group if no tasks remain
    if (ul.children.length === 0) {
      const dateGroup = ul.parentElement;
      dateGroup.remove();
    }
  };

  // Toggle task done state
  icon.addEventListener("click", () => {
    li.classList.toggle("done");
    icon.src = li.classList.contains("done")
      ? "images/checked.png"
      : "images/unchecked.png";
  });

  // Append elements to list item
  li.appendChild(taskDiv);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  // Add task to correct date group
  dateGroup.querySelector("ul").appendChild(li);

  // Clear input fields
  taskInput.value = "";
  taskDate.value = "";
}
