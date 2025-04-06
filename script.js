document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Scholarship Filter Range Output
  const amountRange = document.getElementById("amount");
  if (amountRange) {
    const amountOutput = document.querySelector('output[for="amount"]');
    amountRange.addEventListener("input", function () {
      amountOutput.textContent = "$" + this.value;
    });
  }

  // Scholarship Filter Form
  const scholarshipFilter = document.getElementById("scholarship-filter");
  if (scholarshipFilter) {
    scholarshipFilter.addEventListener("submit", (e) => {
      e.preventDefault();
      filterScholarships();
    });
  }

  // Donation Amount Buttons
  const amountBtns = document.querySelectorAll(".amount-btn");
  const customAmountInput = document.querySelector(".custom-amount-input");

  if (amountBtns.length > 0) {
    amountBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        amountBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Show/hide custom amount input
        if (this.classList.contains("custom-amount")) {
          customAmountInput.style.display = "block";
        } else {
          customAmountInput.style.display = "none";
        }
      });
    });
  }

  // Success Story Modal
  const storyModal = document.getElementById("story-modal");
  const storyBtn = document.getElementById("share-story-btn");
  const closeModal = document.querySelector(".close-modal");

  if (storyBtn && storyModal && closeModal) {
    storyBtn.addEventListener("click", () => {
      storyModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      storyModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === storyModal) {
        storyModal.style.display = "none";
      }
    });
  }

  // Form Submissions with Basic Validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic form validation
      let isValid = true;
      const requiredFields = form.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "var(--danger-color)";
        } else {
          field.style.borderColor = "var(--border-color)";
        }
      });

      if (isValid) {
        // In a real application, this would send data to a server
        // For this demo, we'll just show a success message
        showFormSuccess(form);
      }
    });
  });

  // Populate Scholarship List with Sample Data
  populateScholarships();
});

// Function to show form success message
function showFormSuccess(form) {
  // Clear the form
  form.reset();

  // Create success message
  const successMsg = document.createElement("div");
  successMsg.className = "success-message";
  successMsg.style.color = "var(--success-color)";
  successMsg.style.padding = "1rem";
  successMsg.style.marginTop = "1rem";
  successMsg.style.backgroundColor = "rgba(40, 167, 69, 0.1)";
  successMsg.style.borderRadius = "var(--border-radius)";
  successMsg.style.textAlign = "center";

  // Set appropriate message based on form ID
  if (form.id === "scholarship-filter") {
    successMsg.textContent = "Scholarships filtered successfully!";
  } else if (form.id === "mentor-form") {
    successMsg.textContent =
      "Mentor request submitted successfully! We will contact you soon.";
  } else if (form.id === "donate-form") {
    successMsg.textContent = "Thank you for your generous donation!";
  } else if (form.id === "newsletter-form") {
    successMsg.textContent = "You have been subscribed to our newsletter!";
  } else if (form.id === "story-form") {
    successMsg.textContent =
      "Thank you for sharing your story! It will be reviewed and published soon.";
    // Close the modal after submission
    setTimeout(() => {
      document.getElementById("story-modal").style.display = "none";
    }, 3000);
  }

  // Add success message to the form
  form.appendChild(successMsg);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 5000);
}

// Sample scholarship data
const scholarships = [
  {
    title: "Future Leaders Scholarship",
    provider: "National Education Foundation",
    amount: 5000,
    deadline: "2025-06-15",
    level: "undergraduate",
    field: "business",
    description:
      "For students demonstrating leadership potential and academic excellence in business studies.",
  },
  {
    title: "STEM Excellence Award",
    provider: "Tech Innovation Alliance",
    amount: 7500,
    deadline: "2025-05-30",
    level: "undergraduate",
    field: "stem",
    description:
      "Supporting underrepresented students pursuing degrees in Science, Technology, Engineering, or Mathematics.",
  },
  {
    title: "Creative Arts Grant",
    provider: "Arts Foundation",
    amount: 3000,
    deadline: "2025-07-10",
    level: "undergraduate",
    field: "arts",
    description:
      "For talented students pursuing visual arts, music, theater, or other creative disciplines.",
  },
  {
    title: "Healthcare Heroes Scholarship",
    provider: "Medical Association",
    amount: 6000,
    deadline: "2025-06-01",
    level: "undergraduate",
    field: "healthcare",
    description:
      "Supporting students committed to careers in healthcare and medical services.",
  },
  {
    title: "First Generation College Fund",
    provider: "Education Access Initiative",
    amount: 4000,
    deadline: "2025-05-15",
    level: "undergraduate",
    field: "",
    description:
      "For first-generation college students from low-income backgrounds.",
  },
  {
    title: "Graduate Research Fellowship",
    provider: "Advanced Studies Institute",
    amount: 10000,
    deadline: "2025-04-30",
    level: "graduate",
    field: "stem",
    description:
      "Supporting graduate students conducting innovative research in STEM fields.",
  },
  {
    title: "Vocational Training Grant",
    provider: "Workforce Development Council",
    amount: 2500,
    deadline: "2025-06-30",
    level: "vocational",
    field: "",
    description:
      "For students pursuing vocational training in high-demand trades and technical fields.",
  },
  {
    title: "High School Achievement Award",
    provider: "Community Foundation",
    amount: 1500,
    deadline: "2025-05-20",
    level: "high-school",
    field: "",
    description:
      "Recognizing academic excellence and community involvement among high school seniors.",
  },
];

// Function to populate scholarship list
function populateScholarships(filtered = null) {
  const scholarshipList = document.getElementById("scholarship-list");
  if (!scholarshipList) return;

  // Clear existing scholarships
  scholarshipList.innerHTML = "";

  // Use either filtered scholarships or all scholarships
  const scholarshipsToShow = filtered || scholarships;

  if (scholarshipsToShow.length === 0) {
    scholarshipList.innerHTML =
      '<p class="no-results">No scholarships match your criteria. Try adjusting your filters.</p>';
    return;
  }

  // Add each scholarship to the list
  scholarshipsToShow.forEach((scholarship) => {
    const scholarshipCard = document.createElement("div");
    scholarshipCard.className = "scholarship-card";

    // Format deadline date
    const deadlineDate = new Date(scholarship.deadline);
    const formattedDeadline = deadlineDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    scholarshipCard.innerHTML = `
              <h3>${scholarship.title}</h3>
              <div class="scholarship-meta">
                  <span>Provider: ${scholarship.provider}</span>
                  <span>Deadline: ${formattedDeadline}</span>
              </div>
              <p class="scholarship-description">${scholarship.description}</p>
              <div class="scholarship-footer">
                  <span class="scholarship-amount">$${scholarship.amount.toLocaleString()}</span>
                  <a href="#" class="btn primary-btn">Apply Now</a>
              </div>
          `;

    scholarshipList.appendChild(scholarshipCard);
  });
}

// Function to filter scholarships
function filterScholarships() {
  const educationLevel = document.getElementById("education-level").value;
  const fieldOfStudy = document.getElementById("field-of-study").value;
  const amount = Number.parseInt(document.getElementById("amount").value);
  const deadline = document.getElementById("deadline").value;

  // Filter scholarships based on criteria
  const filteredScholarships = scholarships.filter((scholarship) => {
    // Check education level
    if (educationLevel && scholarship.level !== educationLevel) {
      return false;
    }

    // Check field of study
    if (fieldOfStudy && scholarship.field !== fieldOfStudy) {
      return false;
    }

    // Check minimum amount
    if (amount && scholarship.amount < amount) {
      return false;
    }

    // Check deadline
    if (deadline) {
      const scholarshipDeadline = new Date(scholarship.deadline);
      const selectedDeadline = new Date(deadline);
      if (scholarshipDeadline < selectedDeadline) {
        return false;
      }
    }

    return true;
  });

  // Update scholarship list with filtered results
  populateScholarships(filteredScholarships);
}
