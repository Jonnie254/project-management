interface User {
  name: string;
  email: string;
  password: string;
}

const container = document.getElementById("container") as HTMLElement;
const registerBtn = document.getElementById("register") as HTMLButtonElement;
const loginBtn = document.getElementById("login") as HTMLButtonElement;

registerBtn.addEventListener("click", () => {
  console.log("Register button clicked");
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  console.log("Login button clicked");
  container.classList.remove("active");
});

function validateName(name: string): boolean {
  return name.trim() !== "";
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password: string): boolean {
  return password.trim().length >= 6;
}

function validateConfirmPassword(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}

function displayError(
  elementId: string,
  show: boolean,
  message: string = ""
): void {
  const element = document.getElementById(elementId) as HTMLDivElement;
  if (element) {
    element.style.display = show ? "block" : "none";
    element.textContent = show ? message : "";
  }
}

const popUp = document.getElementById("pop-up") as HTMLDivElement;

const formRegister = document.getElementById(
  "form-register"
) as HTMLFormElement;
const formLogin = document.getElementById("form-login") as HTMLFormElement;

const openPopUp = (
  title: string,
  message: string,
  iconName: string,
  iconClass: string
) => {
  const popUpTitle = document.getElementById(
    "popup-title"
  ) as HTMLHeadingElement;
  const popUpMessage = document.getElementById(
    "popup-message"
  ) as HTMLParagraphElement;
  const popUpIcon = document.getElementById("popup-icon") as HTMLElement;

  popUpTitle.textContent = title;
  popUpMessage.textContent = message;
  popUpIcon.setAttribute("name", iconName);
  popUpIcon.className = `tick ${iconClass}`; // Update the class for color

  popUp.classList.add("show");
  setTimeout(() => {
    popUp.classList.remove("show");
  }, 2000);
};

if (formRegister) {
  formRegister.addEventListener("submit", async function (event: Event) {
    event.preventDefault();
    console.log("Register form submitted");

    const nameRegister = (
      document.getElementById("name-register") as HTMLInputElement
    ).value;
    const emailRegister = (
      document.getElementById("email-register") as HTMLInputElement
    ).value;
    const passwordRegister = (
      document.getElementById("password-register") as HTMLInputElement
    ).value;
    const confirmPassword = (
      document.getElementById("confirm-password") as HTMLInputElement
    ).value;

    // Reset error messages
    displayError("name-error", false);
    displayError("email-error", false);
    displayError("password-error", false);
    displayError("confirm-password-error", false);

    // Validate form inputs
    if (!validateName(nameRegister)) {
      displayError("name-error", true, "Name is required");
      return;
    }

    if (!validateEmail(emailRegister)) {
      displayError("email-error", true, "Invalid email format");
      return;
    }

    if (!validatePassword(passwordRegister)) {
      displayError(
        "password-error",
        true,
        "Password must be at least 6 characters"
      );
      return;
    }

    if (!validateConfirmPassword(passwordRegister, confirmPassword)) {
      displayError("confirm-password-error", true, "Passwords do not match");
      return;
    }

    // Register user
    try {
      const response = await fetch("http://localhost:3002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRegister,
          email: emailRegister,
          password: passwordRegister,
        }),
      });

      const result = await response.json();

      if (result.success) {
        openPopUp(
          "Thank you",
          "Account has been successfully created",
          "checkmark-circle-outline",
          "icon-success"
        );
        setTimeout(() => {
          navigateToLogin();
        }, 4000);
      } else if (result.message === "Email is in use") {
        openPopUp(
          "Error",
          "Email is already in use",
          "close-circle-outline",
          "icon-failure"
        );
      } else {
        openPopUp(
          "Error",
          "An error occurred while creating the account",
          "close-circle-outline",
          "icon-failure"
        );
      }
    } catch (error) {
      console.error("Error registering user:", error);
      openPopUp(
        "Error",
        "Network error. Please try again later.",
        "close-circle-outline",
        "icon-failure"
      );
    }
  });
}

function navigateToLogin() {
  window.location.href = "login.html";
}

if (formLogin) {
  formLogin.addEventListener("submit", async function (event: Event) {
    event.preventDefault();
    console.log("Login form submitted");

    const emailLogin = (
      document.getElementById("email-login") as HTMLInputElement
    ).value;
    const passwordLogin = (
      document.getElementById("password-login") as HTMLInputElement
    ).value;

    // Reset error messages
    displayError("email-error", false);
    displayError("password-error", false);

    // Validate form inputs
    if (!validateEmail(emailLogin)) {
      displayError("email-error", true, "Invalid email format");
      return;
    }

    if (!validatePassword(passwordLogin)) {
      displayError("password-error", true, "Password is required");
      return;
    }

    // Login user
    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailLogin,
          password: passwordLogin,
        }),
      });

      const result = await response.json();

      if (result.success) {
        openPopUp(
          "Success",
          "Login successful",
          "checkmark-circle-outline",
          "icon-success"
        );
        setTimeout(() => {
          window.location.href = "user.dashboard.html";
        }, 2000);
      } else {
        openPopUp(
          "Error",
          "Invalid email or password",
          "close-circle-outline",
          "icon-failure"
        );
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      openPopUp(
        "Error",
        "Network error. Please try again later.",
        "close-circle-outline",
        "icon-failure"
      );
    }
  });
}
