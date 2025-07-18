let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskTableBody = document.getElementById("taskTableBody");
const taskModal = new bootstrap.Modal(document.getElementById("taskModal"));
const taskDesc = document.getElementById("taskDesc");
const taskResp = document.getElementById("taskResp");
const taskTime = document.getElementById("taskTime");
const editIndex = document.getElementById("editIndex");

function renderTasks() {
  taskTableBody.innerHTML = "";
  tasks.forEach((task, index) => {
    taskTableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${task.description}</td>
          <td>${task.responsible}</td>
          <td>${task.time}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      `;
  });
}

function resetForm() {
  taskForm.reset();
  editIndex.value = "";
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const desc = taskDesc.value.trim();
  const resp = taskResp.value.trim();
  const time = taskTime.value;

  if (editIndex.value === "") {
    tasks.push({ description: desc, responsible: resp, time: time });
  } else {
    const idx = parseInt(editIndex.value);
    tasks[idx] = { description: desc, responsible: resp, time: time };
  }

  renderTasks();
  resetForm();
  taskModal.hide();
});

function editTask(index) {
  const task = tasks[index];
  taskDesc.value = task.description;
  taskResp.value = task.responsible;
  taskTime.value = task.time;
  editIndex.value = index;
  taskModal.show();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Initial call
renderTasks();
