function showPassword() {
  var input = document.getElementById("password");
  var eye = document.getElementById("eye");
  if (input.type === "password") {
    input.type = "text";
    eye.classList.remove('bi-eye-slash-fill');
    eye.classList.add('bi-eye-fill');
  } else {
    input.type = "password";
    eye.classList.remove('bi-eye-fill');
    eye.classList.add('bi-eye-slash-fill');
  }
}