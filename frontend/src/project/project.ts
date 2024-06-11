interface Project {
  id?: string;
  name: string;
  description: string;
  end_date: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Arrays to store projects and users
let projects: Project[] = [];
let users: User[] = [];
let unassignedUsers: User[] = [];
let assignedUsers: User[] = [];
let user: User;

// DOM elements
const backIcon = document.querySelector(".back-icon") as HTMLButtonElement;
const projectLink = document.querySelector(".project-link") as HTMLLIElement;
const mainBody = document.querySelector(".main-body") as HTMLDivElement;
const createIcon = document.querySelector(".icon") as HTMLButtonElement;
const modalOverlay = document.querySelector(".modal-overlay") as HTMLDivElement;
const nameInput = document.querySelector("#nameInput") as HTMLInputElement;
const descriptionInput = document.querySelector(
  "#descriptionInput"
) as HTMLTextAreaElement;
const endDateInput = document.querySelector(
  "#endDateInput"
) as HTMLInputElement;

const fetchDetails = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/user/details", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      const userName = document.querySelector(
        ".user-name"
      ) as HTMLParagraphElement;
      if (userName) {
        userName.textContent = result.data.name;
      }
      return true;
    } else {
      handleFetchError(result.message);
      return false;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return false;
  }
};
fetchDetails();

const fetchUnassignedUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/users/unassigned", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      unassignedUsers = result.data;
      return result.data;
    } else {
      handleFetchError(result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const fetchUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/users/all", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      users = result.data;
      return users;
    } else {
      handleFetchError(result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const handleFetchError = (message: string): void => {
  if (message === "Access denied. You do not have sufficient privileges.") {
    window.location.href = "user.dashboard.html";
  } else if (message === "Invalid token") {
    window.location.href = "login.html";
  } else {
    console.error("Error fetching users:", message);
  }
};
//show success message
const showSuccess = (message: string) => {
  const msgText = document.createElement("p") as HTMLParagraphElement;
  msgText.className = "success";
  modalOverlay.appendChild(msgText);
  msgText.textContent = message;
};
// Create a project
const addProject = async (newProject: Project): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/projects/create", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    let result = await response.json();
    if (result.success) {
      showSuccess(result.message);
      await fetchProjects();
      renderProjects();
    } else {
      throw new Error("Failed to add project");
    }
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

// Fetch projects from the server
const fetchProjects = async (): Promise<Project[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/projects/all", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!result.success) {
      return [];
    }
    projects = result.data;
    return projects;
  } catch (error) {
    return [];
  }
};

// Delete project
const deleteProject = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3002/projects/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete project with id: ${id}`);
    }

    projects = projects.filter((project) => project.id !== id);
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

// Show confirmation modal
const showDeleteConfirmation = (projectId: string): void => {
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modalItems">
        <p>Are you sure you want to delete this project?</p>
        <button id="confirmDelete">Yes</button>
        <button id="cancelDelete">No</button>
      </div>
    </div>
  `;
  modalOverlay.style.display = "block";

  const confirmDeleteBtn = document.querySelector(
    "#confirmDelete"
  ) as HTMLButtonElement;
  const cancelDeleteBtn = document.querySelector(
    "#cancelDelete"
  ) as HTMLButtonElement;

  confirmDeleteBtn.addEventListener("click", async () => {
    try {
      await deleteProject(projectId);
      await fetchProjects();
      renderProjects();
      modalOverlay.style.display = "none";
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  });

  cancelDeleteBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });
};

// Update project
const updateProject = async (id: string, project: Project): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3002/projects/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(project),
      }
    );
    let result = await response.json();

    if (result.success) {
      showSuccess(result.message);
      await fetchProjects();
    } else {
      throw new Error(`Failed to update project with id ${id}`);
    }

    // const index = projects.findIndex((project) => project.id === id);

    // if (index !== -1) {
    //   projects[index] = { ...projects[index], ...project };
    // }
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

// Populate the assign user dropdown with fetched users
const populateUsersDropdown = async (): Promise<void> => {
  try {
    const assignUserInput = document.querySelector(
      "#assignUser"
    ) as HTMLSelectElement;
    const users = await fetchUnassignedUsers();

    assignUserInput.innerHTML = ""; // Clear existing options
    users.forEach((user: User) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      assignUserInput.appendChild(option);
    });
  } catch (error) {
    console.error("Error populating users dropdown:", error);
  }
};

// Render the project form modal
const renderProjectFormModal = (project?: Project): void => {
  modalOverlay.innerHTML = "";
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeIcon = document.createElement("ion-icon");
  closeIcon.setAttribute("name", "close-circle-outline");
  closeIcon.className = "close";
  closeIcon.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  const projectForm = document.createElement("form");
  projectForm.className = "projectForm";

  // Name input
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name");
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "nameInput";
  nameInput.placeholder = "Name here ..";
  nameInput.value = project ? project.name : "";
  const nameError = document.createElement("p");
  nameError.className = "error";
  nameError.id = "nameError";
  nameLabel.appendChild(nameInput);
  nameLabel.appendChild(nameError);

  // Description input
  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "descriptionInput";
  descriptionInput.cols = 30;
  descriptionInput.rows = 5;
  descriptionInput.value = project ? project.description : "";
  const descriptionError = document.createElement("p");
  descriptionError.className = "error";
  descriptionError.id = "descriptionError";
  descriptionLabel.appendChild(descriptionInput);
  descriptionLabel.appendChild(descriptionError);

  // End date input
  const endDateLabel = document.createElement("label");
  endDateLabel.setAttribute("for", "endDate");
  endDateLabel.textContent = "End Date";
  const endDateInput = document.createElement("input");
  endDateInput.type = "date";
  endDateInput.id = "endDateInput";
  endDateInput.placeholder = "End date here ..";
  endDateInput.value = project ? project.end_date : "";
  const endDateError = document.createElement("p");
  endDateError.className = "error";
  endDateError.id = "endDateError";
  endDateLabel.appendChild(endDateInput);
  endDateLabel.appendChild(endDateError);

  // Assign user dropdown
  const assignUserLabel = document.createElement("label");
  assignUserLabel.setAttribute("for", "assignUser");
  assignUserLabel.textContent = "Assign User";
  const assignUserSelect = document.createElement("select");
  assignUserSelect.id = "assignUser";
  const assignUserError = document.createElement("p");
  assignUserError.className = "error";
  assignUserError.id = "assignUserError";
  assignUserLabel.appendChild(assignUserSelect);
  assignUserLabel.appendChild(assignUserError);

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "submitbtn";
  submitButton.textContent = project ? "Update Project" : "Create Project";

  // Success message
  const successMessage = document.createElement("p");
  successMessage.className = "success";
  successMessage.id = "successMessage";

  // Append elements to form
  projectForm.appendChild(successMessage);
  projectForm.appendChild(nameLabel);
  projectForm.appendChild(descriptionLabel);
  projectForm.appendChild(endDateLabel);
  projectForm.appendChild(assignUserLabel);
  projectForm.appendChild(submitButton);

  // Append elements to modal content
  modalContent.appendChild(closeIcon);
  modalContent.appendChild(projectForm);

  // Append modal content to overlay
  modalOverlay.appendChild(modalContent);

  modalOverlay.style.display = "block";

  // Populate users dropdown
  populateUsersDropdown();

  // Handle form submission
  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const endDateValue = endDateInput.value.trim();
    const assignedUserValue = assignUserSelect.value;

    // Validate form data
    let isValid = true;

    if (!nameValue) {
      nameError.textContent = "Name is required";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    if (!descriptionValue) {
      descriptionError.textContent = "Description is required";
      isValid = false;
    } else {
      descriptionError.textContent = "";
    }

    if (!endDateValue) {
      endDateError.textContent = "End date is required";
      isValid = false;
    } else if (new Date(endDateValue) < new Date()) {
      // Check if end date is before current date
      endDateError.textContent = "End date cannot be before the current date";
      isValid = false;
    } else {
      endDateError.textContent = "";
    }

    if (!assignedUserValue) {
      assignUserError.textContent = "User assignment is required";
      isValid = false;
    } else {
      assignUserError.textContent = "";
    }

    if (isValid) {
      const newProject: Project = {
        name: nameValue,
        description: descriptionValue,
        end_date: endDateValue,
        user_id: assignedUserValue,
        created_at: "",
        updated_at: "",
      };

      try {
        if (project && project.id) {
          successMessage.style.display = "block";
          successMessage.textContent = "Project updated successfully!";
        } else {
          successMessage.style.display = "block";
          successMessage.textContent = "Project created successfully!";
        }
      } catch (error) {
        console.error("Error creating/updating project:", error);
      }

      // Clear form fields
      nameInput.value = "";
      descriptionInput.value = "";
      endDateInput.value = "";
      assignUserSelect.value = "";

      setTimeout(() => {
        successMessage.textContent = "";
        modalOverlay.style.display = "none";
      }, 2000);
    }
  });
};

// Event listener for the create project icon
createIcon.addEventListener("click", () => {
  renderProjectFormModal();
});

// Render the dashboard section
const renderDashboard = async () => {
  await Promise.all([fetchProjects(), fetchUsers(), fetchUnassignedUsers()]);
  mainBody.innerHTML = `
    <div class="dashboard-wrapper">
      <div class="card1">
        <ion-icon name="card-outline" class="card-icon"></ion-icon>
        <p>Projects</p>
        <h2>${projects.length}</h2>
      </div>
      <div class="card2">
        <ion-icon name="people-outline" class="card-icon"></ion-icon>
        <p>Users</p>
        <h2>${users.length}</h2>
      </div>
      <div class="card3">
        <ion-icon name="timer-outline" class="card-icon"></ion-icon>
        <p>Assigned Users</p>
        <h2>30</h2>
      </div>
      <div class="analytics">
        <!-- Add canvas element for pie chart -->
        <canvas id="userPieChart" width="400" height="400"></canvas>
      </div>
    </div>`;
};

const displayProjects = async (
  table: HTMLTableElement,
  tblResponsive: HTMLDivElement
) => {
  mainBody.innerHTML = "";
  while (tblResponsive.firstElementChild) {
    tblResponsive.removeChild(tblResponsive.firstElementChild);
  }
  projects = await fetchProjects();

  projects.forEach((project: Project) => {
    const row = document.createElement("tr") as HTMLTableRowElement;

    row.innerHTML = `
        <td>${project.name}</td>
        <td>${project.description}</td>
        <td>${project.end_date}</td>
        <td>${project.user_email}</td>
        <td>
            <div class="actions">
                <ion-icon name="create-outline" class="editBtn" data-id="${project.id}"></ion-icon>
                <ion-icon name="trash-outline" class="deleteBtn" data-id="${project.id}"></ion-icon>
            </div>
        </td>
    `;
    table.appendChild(row);
  });
  tblResponsive.appendChild(table);
  mainBody.appendChild(tblResponsive);

  // Add event listeners for edit and delete buttons
  const editButtons = document.querySelectorAll(
    ".editBtn"
  ) as NodeListOf<HTMLButtonElement>;

  const deleteButtons = document.querySelectorAll(
    ".deleteBtn"
  ) as NodeListOf<HTMLButtonElement>;

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", async () => {
      const id = editButton.dataset.id;
      if (!id) {
        return;
      }
      const project = projects.find((proj) => proj.id === id);
      if (!project) {
        return;
      }
      renderProjectFormModal(project);
      project.name = nameInput.value;
      project.description = descriptionInput.value;
      project.end_date = endDateInput.value;
      await updateProject(id, project);
      renderProjects();
    });
  });

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async () => {
      const id = deleteButton.dataset.id;
      if (id) {
        try {
          showDeleteConfirmation(id);
          // Re-render projects after deletion
        } catch (error) {
          console.error("Error deleting project:", error);
        }
      }
    });
  });
};

//Render the projects section
const renderProjects = () => {
  mainBody.innerHTML = "";

  const tblResponsive = document.createElement("div") as HTMLDivElement;
  tblResponsive.className = "table-responsive";
  const table: HTMLTableElement = document.createElement("table");
  table.className = "displayTable";

  const headerRow = document.createElement("tr");
  ["Name", "Description", "End Date", "Assigned User", "Actions"].forEach(
    (header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    }
  );

  table.appendChild(headerRow);
  displayProjects(table, tblResponsive);
  tblResponsive.appendChild(table);
  mainBody.appendChild(tblResponsive);
};
// Render the users section
const renderUsers = async () => {
  users = await fetchUsers();

  mainBody.innerHTML = " ";

  const table = document.createElement("table") as HTMLTableElement;
  table.className = "displayTable";

  const headerRow = document.createElement("tr");
  ["Name", "Email"].forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);
  users.forEach((user) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    row.innerHTML = `
     
     <td>${user.name}</td>
      <td>${user.email}</td>
  
     `;
    table.appendChild(row);
  });
  mainBody.appendChild(table);
};

//logout
const logout = async () => {
  window.location.href = "/frontend/html/login.html";
};

/// Event listeners for sidebar links
const links = document.querySelectorAll(".links ul li");
links.forEach((li) => {
  const link = li.querySelector("a");
  const icon = li.querySelector("ion-icon");

  const clickHandler = (event: Event) => {
    event.preventDefault();
    const target = (event.currentTarget as HTMLElement).dataset.target;
    switch (target) {
      case "dashboard":
        renderDashboard();

        break;
      case "projects":
        renderProjects();

        break;
      case "users":
        renderUsers();

        break;
      case "logout":
        logout();

        break;
      default:
        renderDashboard();

        break;
    }
  };

  if (link) {
    link.addEventListener("click", clickHandler);
  }
  if (icon) {
    icon.addEventListener("click", clickHandler);
  }
});

// Set default content to Dashboard on page load
renderDashboard();
