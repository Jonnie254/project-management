const profileTextDiv = document.querySelector(
  ".profile-text"
) as HTMLDivElement;

interface User {
  id: string;
  name: string;
  email: string;
  role: "user";
}
interface Project {
  id?: string;
  name: string;
  description: string;
  end_date: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

let userDetails: User;

const showPopup = (title: string, message: string) => {
  const popup = document.getElementById("pop-up") as HTMLDivElement;
  const popupTitle = document.getElementById(
    "popup-title"
  ) as HTMLHeadingElement;
  const popupMessage = document.getElementById(
    "popup-message"
  ) as HTMLParagraphElement;

  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.classList.add("show");

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
};
//log out the user
const logOutButton = document.getElementById(
  "log-out-btn"
) as HTMLButtonElement;
logOutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
//visit the dashboard
const dashboardButton = document.getElementById(
  "dashboard-btn"
) as HTMLDivElement;
dashboardButton.addEventListener("click", () => {
  manBody.classList.remove("hide");
  profileSection.classList.remove("show");
  projectSection.style.display = "none";
  dashboardButton.classList.add("active");
});
//visit the profile page
const manBody = document.querySelector(".main-body") as HTMLDivElement;
const profileSection = document.querySelector(".container") as HTMLDivElement;
const profileButton = document.getElementById("profile-btn") as HTMLDivElement;
profileButton.addEventListener("click", () => {
  profileSection.classList.add("show");
  showProfile();
  manBody.classList.add("hide");
  projectSection.style.display = "none";
  dashboardButton.classList.remove("active");
});
//visit the project page
const projectSectionBtn = document.getElementById(
  "project-sections-btn"
) as HTMLDivElement;
const projectSection = document.getElementById(
  "project-section"
) as HTMLDivElement;
projectSectionBtn.addEventListener("click", () => {
  projectSection.style.display = "block";
  profileSection.classList.remove("show");
  manBody.classList.add("hide");
  dashboardButton.classList.remove("active");
  profileButton.classList.remove("active");
  fetchAssignedProject();
});
const fetchUserDetails = async (): Promise<boolean> => {
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
    if (!result.success && result.message === "Invalid token") {
      window.location.href = "login.html";
    }
    userDetails = result.data;
    if (profileTextDiv.firstElementChild) {
      profileTextDiv.firstElementChild.textContent = userDetails.name;
    }
    return true;
  } catch (error) {
    console.error("Error fetching details:", error);
    return false;
  }
};
fetchUserDetails();
const fetchAssignedProject = async (): Promise<Project | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/user/project", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.data[0];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};
const updateProjectTable = async (): Promise<void> => {
  const projectTableBody = document.querySelector("#project-user tbody");

  if (!projectTableBody) {
    console.error("Project table body not found");
    return;
  }

  try {
    const project: Project | null = await fetchAssignedProject();
    projectTableBody.innerHTML = "";
    if (!project) {
      const p = document.createElement("p");
      p.textContent = "No project assigned";
      projectTableBody.appendChild(p);
      return;
    }
    console.log(project);

    // Add rows for each project
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const deadlineCell = document.createElement("td");

    nameCell.textContent = project.name;
    descriptionCell.textContent = project.description; // Replace 'description' with the appropriate field
    deadlineCell.textContent = project.end_date; // Replace 'deadline' with the appropriate field

    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(deadlineCell);

    projectTableBody.appendChild(row);
  } catch (error) {
    console.error("Error updating project table:", error);
  }
};

// Call the function to update the project table
updateProjectTable();

const updateProjectCard = async (): Promise<void> => {
  const projectCountElement = document.getElementById("project-count");

  if (!projectCountElement) {
    console.error("Project count element not found");
    return;
  }

  try {
    const projects = await fetchAssignedProject();

    if (projects === null) {
      console.error("Projects array is null");
      projectCountElement.textContent = "0";
      return;
    }

    // const projectCount = projects.length;
    // projectCountElement.textContent = projectCount.toString();
  } catch (error) {
    console.error("Error fetching projects:", error);
    projectCountElement.textContent = "0";
  }
};

updateProjectCard();
const showProfile = async () => {
  await fetchUserDetails();
  const fullNameInput = document.querySelector(
    "#full-name"
  ) as HTMLInputElement;
  const emailInput = document.querySelector("#email") as HTMLInputElement;
  fullNameInput.defaultValue = userDetails.name;
  emailInput.defaultValue = userDetails.email;
};

const settingsTab = document.getElementById("settings-tab") as HTMLDivElement;
const changePasswordTab = document.getElementById(
  "change-password-tab"
) as HTMLDivElement;
const settingsContent = document.getElementById(
  "settings-content"
) as HTMLDivElement;
const changePasswordContent = document.getElementById(
  "change-password-content"
) as HTMLDivElement;
const line = document.getElementById("line") as HTMLHRElement;
changePasswordTab.addEventListener("click", () => {
  settingsContent.style.display = "none";
  changePasswordContent.style.display = "block";
  line.style.marginLeft = "50%";
});
settingsTab.addEventListener("click", () => {
  settingsContent.style.display = "block";
  changePasswordContent.style.display = "none";
  line.style.marginLeft = "0";
});

//display to change password
function displayChangePasswordError(
  elementId: string,
  show: any,
  message = ""
) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = show ? "block" : "none";
    element.textContent = show ? message : "";
  }
}
//the change password form
const changePasswordForm = document.getElementById(
  "change-password-form"
) as HTMLFormElement;
changePasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const currentPasswordInput = document.getElementById(
    "current-password"
  ) as HTMLInputElement;
  const newPasswordInput = document.getElementById(
    "new-password"
  ) as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    "confirm-password"
  ) as HTMLInputElement;

  const oldPassword = currentPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Reset error messages
  displayChangePasswordError("current-password-error", false);
  displayChangePasswordError("new-password-error", false);
  displayChangePasswordError("confirm-password-error", false);

  // Validate current password
  if (!oldPassword) {
    displayChangePasswordError(
      "current-password-error",
      true,
      "Please enter your current password."
    );
    return;
  }

  // Validate new password
  if (!newPassword) {
    displayChangePasswordError(
      "new-password-error",
      true,
      "Please enter a new password."
    );
    return;
  }

  // Validate confirm password
  if (!confirmPassword) {
    displayChangePasswordError(
      "confirm-password-error",
      true,
      "Please confirm your new password."
    );
    return;
  }
  if (newPassword !== confirmPassword) {
    displayChangePasswordError(
      "confirm-password-error",
      true,
      "Passwords do not match."
    );
    return;
  }

  try {
    const response = await fetch("http://localhost:3002/auth/update-password", {
      method: "PUT",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userDetails.id,
        oldPassword,
        password: newPassword,
      }),
    });
    const result = await response.json();
    if (result.success) {
      displayChangePasswordError("change-password-error", false);
      currentPasswordInput.value = "";
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
      showPopup("Success", result.message);
    } else {
      showPopup("Error", result.message);
    }
  } catch (error) {
    showPopup("Error", "An error occurred while changing the password");
  }
});

//update name and email
const settingsForm = document.getElementById(
  "settings-form"
) as HTMLFormElement;
settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("full-name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  const newname = nameInput.value;
  const newemail = emailInput.value;

  try {
    const response = await fetch("http://localhost:3002/auth/update", {
      method: "PUT",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userDetails.id,
        email: newemail,
        name: newname,
      }),
    });
    const result = await response.json();
    if (result.success) {
      showPopup("Success", result.message);
      fetchUserDetails();
    } else {
      showPopup("Error", result.message);
    }
  } catch (error) {
    showPopup("Error", "An error occurred while updating the settings");
  }
});
