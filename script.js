// Get DOM Elements
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const motivationQuote = document.getElementById("motivationQuote");
const tabs = document.querySelectorAll(".tab-button");

let tasks = [];

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = taskPriority.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    text: taskText,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  updateProgress();
  taskInput.value = ""; // Clear input after adding
});

// Render Tasks based on Tab Selection
function renderTasks() {
  const activeTab = document.querySelector(".tab-button.active").dataset.category;
  taskList.innerHTML = ""; // Clear current task list

  let filteredTasks = tasks;
  if (activeTab !== "all") {
    filteredTasks = tasks.filter(task => task.priority === activeTab);
  }

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item", task.priority);
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    taskItem.innerHTML = `
      <span>${task.text}</span>
      <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // Complete Task
    taskItem.querySelector(".complete-btn").addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
      updateProgress();
    });

    // Edit Task
    taskItem.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText) {
        task.text = newText;
        renderTasks();
      }
    });

    // Delete Task
    taskItem.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t !== task);
      renderTasks();
      updateProgress();
    });

    taskList.appendChild(taskItem);
  });
}

// Switch Tabs
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab-button.active").classList.remove("active");
    tab.classList.add("active");
    renderTasks();
  });
});

// Update Progress Bar
function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / totalTasks) * 100;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}% Complete`;
}

// Fetch Random Motivational Quote
function getRandomQuote() {
  const quotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Success is not the key to happiness. Happiness is the key to success." - Albert Schweitzer',
    '"Do not wait to strike till the iron is hot, but make it hot by striking." - William Butler Yeats',
    '"Believe you can and you\'re halfway there." - Theodore Roosevelt'
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  motivationQuote.textContent = randomQuote;
}

// Auto-change Quote every 10 seconds
setInterval(getRandomQuote, 10000);

renderTasks();
updateProgress();
