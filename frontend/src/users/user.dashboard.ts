interface User {
  id: string;
  name: string;
  email: string;
  role: "user";
}

let userDetails: User;

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
  profileSection.classList.add("active");
  fetchAssignedProject();
});
const fetchUserDetails = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    const response = await fetch("http://localhost:3002/user/details", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!result.success && result.message === "Invalid token") {
      // window.location.href = "login.html";
    }
    userDetails = result.data;
    console.log(result);
    return true;
  } catch (error) {
    console.error("Error fetching details:", error);
    return false;
  }
};
fetchUserDetails();
const fetchAssignedProject = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3002/projects/", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
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

  console.log(localStorage.getItem("token"));
  try {
    const response = await fetch("http://localhost:3002/auth/update-password", {
      method: "PUT",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      displayChangePasswordError("change-password-error", false);
      currentPasswordInput.value = "";
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
      alert(result.message);
    } else {
      displayChangePasswordError("change-password-error", true, result.message);
    }
  } catch (error) {
    displayChangePasswordError(
      "change-password-error",
      true,
      "An error occurred"
    );
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
        name: newname,
        email: newemail,
      }),
    });
    const result = await response.json();
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("An error occurred");
  }
});
