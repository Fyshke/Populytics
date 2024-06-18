// Show sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

// Hide sidebar
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

// faq
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      item.classList.toggle("active");
    });
  });
});

// contacts
function clearFormFields() {
  const inputs = document.querySelectorAll('.card input[type="text"]');
  const textarea = document.querySelector(".card textarea");

  // Clear input field
  inputs.forEach((input) => {
    input.value = "";
  });

  // Clear textarea
  if (textarea) {
    textarea.value = "";
  }
}

document
  .querySelector('.card input[type="submit"]')
  .addEventListener("click", function (event) {
    event.preventDefault();
    clearFormFields();
  });
