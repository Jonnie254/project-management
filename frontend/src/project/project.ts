interface Project {
  id?: string;
  name: string;
  description: string;
  end_date: string;
  user_id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Arrays to store projects and users
let projects: Project[] = [];
let users: User[] = [];

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

const fetchUnassignedUsers = async () => {
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
    console.log(result);

    if (result.success) {
      console.log(result.data);

      return result.data;
    } else if (
      !result.success &&
      result.message === "Access denied. You do not have sufficient privileges."
    ) {
      window.location.href = "user.dashboard.html";
    } else if (!result.success && result.message === "Invalid token") {
      window.location.href = "login.html";
    } else {
      console.error("Error fetching users:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
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

    if (response.ok) {
      const project = await response.json();
      projects.push(project);
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
    const response = await fetch("http://localhost:3002/projects", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Delete project
const deleteProject = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3002/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project with id: ${id}`);
    }

    projects = projects.filter((project) => project.id !== id);
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

// Show confirmation modal
const showDeleteConfirmation = (projectId: string) => {
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
const updateProject = async (
  id: string,
  updatedFields: Partial<Project>
): Promise<void> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3002/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    throw new Error(`Failed to update project with id ${id}`);
  }

  const index = projects.findIndex((project) => project.id === id);

  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedFields };
  }
};

// Populate the assign user dropdown with fetched users
const populateUsersDropdown = async () => {
  try {
    let assignUserInput = document.querySelector(
      "#assignUser"
    ) as HTMLSelectElement;

    let users = await fetchUnassignedUsers();

    console.log(users);

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
const renderProjectFormModal = (project?: Project) => {
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
      };

      try {
        if (project && project.id) {
          await updateProject(project.id, newProject);
          successMessage.textContent = "Project updated successfully!";
        } else {
          await addProject(newProject);
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

// Event listener for the project link
projectLink.addEventListener("click", async () => {
  try {
    const allProjects = await fetchProjects();
    console.log(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
});

// Event listener for the back icon
backIcon.addEventListener("click", () => {
  console.log("Back icon clicked");
});
