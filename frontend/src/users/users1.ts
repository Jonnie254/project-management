function validateName(name: string): boolean {
  return name.trim() !== "";
}

function validateEmail(email: string): boolean {
  return email.trim() !== "";
}

function validatePassword(password: string): boolean {
  return password.trim() !== "";
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
  element.style.display = show ? "block" : "none";
  if (message) element.textContent = message;
}

// Your other TypeScript code goes here (e.g., form event listeners, API calls)

interface User {
  user_id: string;
  fname: string;
  email: string;
  password: string;
}
const popUp = document.getElementById("pop-up") as HTMLDivElement;

const formRegister = document.getElementById(
  "form-register"
) as HTMLFormElement;
const formLogin = document.getElementById("form-login") as HTMLFormElement;
const openPopUp = () => {
  popUp.classList.add("show");
  setTimeout(() => {
    popUp.classList.remove("show");
  }, 20000);
};

if (formRegister) {
  formRegister.addEventListener("submit", async function (event: Event) {
    event.preventDefault();

    const nameRegister = (
      document.getElementById("name-register") as HTMLInputElement
    ).value;
    const emailRegister = (
      document.getElementById("email-login") as HTMLInputElement
    ).value;
    const passwordRegister = (
      document.getElementById("password-login") as HTMLInputElement
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
      displayError("email-error", true, "Email is required");
      return;
    }

    if (!validatePassword(passwordRegister)) {
      displayError("password-error", true, "Password is required");
      return;
    }

    if (!validateConfirmPassword(passwordRegister, confirmPassword)) {
      displayError("confirm-password-error", true, "Passwords do not match");
      return;
    }

    // Register user
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: Date.now().toString(),
        fname: nameRegister,
        email: emailRegister,
        password: passwordRegister,
      }),
    });

    if (response.ok) {
      openPopUp();
      // formRegister.reset();
    } else {
      const result = await response.json();
      alert("Error: " + result.message);
    }
  });
}
if (formLogin) {
  formLogin.addEventListener("submit", async function (event: Event) {
    event.preventDefault();

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
      displayError("email-error", true, "Email is required");
      return;
    }

    if (!validatePassword(passwordLogin)) {
      displayError("password-error", true, "Password is required");
      return;
    }

    // Login user
    const response = await fetch(
      `http://localhost:3001/users?email=${emailLogin}&password=${passwordLogin}`
    );
    const users: User[] = await response.json();

    if (users.length === 0) {
      alert("Invalid email or password");
    } else {
      // Check if the email and password match the user in the database
      const user = users.find(
        (u) => u.email === emailLogin && u.password === passwordLogin
      );

      if (user) {
        // Redirect to user.dashboard.html
        window.location.href = "user.dashboard.html";
      } else {
        alert("Invalid email or password");
      }
    }
  });
}
