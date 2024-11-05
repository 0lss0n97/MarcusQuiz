document.getElementById("submitButton").addEventListener("click", function() {
    let isValid = true;
    let score = 0;  // Initialize score
    const totalQuestions = 5; // Update this if you add more questions

    // Correct answers configuration
    const correctAnswers = {
        question1: "Varg",
        question2: "Karlstad",
        question3: ["Selma Lagerlöf", "Gustaf Fröding"], // Multiple correct answers for checkboxes
        question4: ["Färjestad BK", "Degerfors IF"], // Multiple correct answers for checkboxes
        question5: "any text" // Open-ended, no fixed correct answer
    };

    // Reset previous error messages and hide the success message
    document.querySelectorAll(".error-message").forEach((msg) => msg.style.display = "none");
    document.getElementById("successMessage").style.display = "none";

    // Visitor Information Validation
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();

    // First Name Validation
    if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
        document.getElementById("firstNameError").textContent = "Please enter a valid first name (letters only).";
        document.getElementById("firstNameError").style.display = "block";
        isValid = false;
    }

    // Last Name Validation
    if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
        document.getElementById("lastNameError").textContent = "Please enter a valid last name (letters only).";
        document.getElementById("lastNameError").style.display = "block";
        isValid = false;
    }

    // Email Validation
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    }

    // Quiz Questions Validation and Scoring
    // Question 1 (Single-choice, Required)
    const question1 = document.querySelector('input[name="question1"]:checked');
    if (!question1) {
        document.getElementById("question1Error").textContent = "Please select an answer for Question 1.";
        document.getElementById("question1Error").style.display = "block";
        isValid = false;
    } else if (question1.value === correctAnswers.question1) {
        score++; // Increment score if correct
    }

    // Question 2 (Single-choice, Required)
    const question2 = document.querySelector('input[name="question2"]:checked');
    if (!question2) {
        document.getElementById("question2Error").textContent = "Please select an answer for Question 2.";
        document.getElementById("question2Error").style.display = "block";
        isValid = false;
    } else if (question2.value === correctAnswers.question2) {
        score++; // Increment score if correct
    }

    // Question 3 (Multiple-choice, Optional)
    const question3Options = Array.from(document.querySelectorAll('input[name="question3"]:checked')).map(opt => opt.value);
    if (question3Options.length > 0 && question3Options.every(opt => correctAnswers.question3.includes(opt))) {
        score++; // Increment score if all selected answers are correct
    }

    // Question 4 (Multiple-choice, Optional)
    const question4Options = Array.from(document.querySelectorAll('input[name="question4"]:checked')).map(opt => opt.value);
    if (question4Options.length > 0 && question4Options.every(opt => correctAnswers.question4.includes(opt))) {
        score++; // Increment score if all selected answers are correct
    }

    // Question 5 (Open-ended, Required)
    const question5 = document.getElementById("question5").value.trim();
    if (!question5) {
        document.getElementById("question5Error").textContent = "Please enter an answer for Question 5.";
        document.getElementById("question5Error").style.display = "block";
        isValid = false;
    } else {
        score++; // Increment score for any answer in open-ended question
    }

    // Display Correct Answers and Total Score if all fields are valid
    if (isValid) {
        // Display score message
        document.getElementById("successMessage").textContent = `You scored ${score} out of ${totalQuestions}!`;
        document.getElementById("successMessage").style.display = "block";

        // Show correct answers for each question
        if (question1 && question1.value !== correctAnswers.question1) {
            document.getElementById("question1Error").textContent = `Correct answer: ${correctAnswers.question1}`;
            document.getElementById("question1Error").style.display = "block";
        }
        if (question2 && question2.value !== correctAnswers.question2) {
            document.getElementById("question2Error").textContent = `Correct answer: ${correctAnswers.question2}`;
            document.getElementById("question2Error").style.display = "block";
        }
        if (question3Options.length > 0 && !question3Options.every(opt => correctAnswers.question3.includes(opt))) {
            document.getElementById("question3Error").textContent = `Correct answers: ${correctAnswers.question3.join(", ")}`;
            document.getElementById("question3Error").style.display = "block";
        }
        if (question4Options.length > 0 && !question4Options.every(opt => correctAnswers.question4.includes(opt))) {
            document.getElementById("question4Error").textContent = `Correct answers: ${correctAnswers.question4.join(", ")}`;
            document.getElementById("question4Error").style.display = "block";
        }
    }
});
