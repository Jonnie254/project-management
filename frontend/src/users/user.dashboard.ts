const logOutButton = document.getElementById(
  "log-out-btn"
) as HTMLButtonElement;
logOutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
