// Existing quiz functionality
document.getElementById("submitButton").addEventListener("click", function () {
    let isValid = true;
    let score = 0; // Initialize score
    const totalQuestions = 5;

    // Correct answers configuration
    const correctAnswers = {
        question1: "Varg",
        question2: "Karlstad",
        question3: ["Selma Lagerlöf", "Gustaf Fröding"],
        question4: ["Färjestad BK", "Degerfors IF"],
        question5: "any text"
    };

    // Reset previous error messages
    document.querySelectorAll(".error-message").forEach((msg) => msg.style.display = "none");
    document.getElementById("successMessage").style.display = "none";

    // Visitor Information Validation
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validate first and last names, and email
    if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
        document.getElementById("firstNameError").textContent = "Please enter a valid first name (letters only).";
        document.getElementById("firstNameError").style.display = "block";
        isValid = false;
    }
    if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
        document.getElementById("lastNameError").textContent = "Please enter a valid last name (letters only).";
        document.getElementById("lastNameError").style.display = "block";
        isValid = false;
    }
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    }

    // Validate quiz answers and calculate score
    const question1 = document.querySelector('input[name="question1"]:checked');
    if (!question1) {
        document.getElementById("question1Error").textContent = "Please select an answer for Question 1.";
        document.getElementById("question1Error").style.display = "block";
        isValid = false;
    } else if (question1.value === correctAnswers.question1) score++;

    const question2 = document.querySelector('input[name="question2"]:checked');
    if (!question2) {
        document.getElementById("question2Error").textContent = "Please select an answer for Question 2.";
        document.getElementById("question2Error").style.display = "block";
        isValid = false;
    } else if (question2.value === correctAnswers.question2) score++;

    const question3Options = Array.from(document.querySelectorAll('input[name="question3"]:checked')).map(opt => opt.value);
    if (question3Options.length > 0 && question3Options.every(opt => correctAnswers.question3.includes(opt))) score++;

    const question4Options = Array.from(document.querySelectorAll('input[name="question4"]:checked')).map(opt => opt.value);
    if (question4Options.length > 0 && question4Options.every(opt => correctAnswers.question4.includes(opt))) score++;

    const question5 = document.getElementById("question5").value.trim();
    if (!question5) {
        document.getElementById("question5Error").textContent = "Please enter an answer for Question 5.";
        document.getElementById("question5Error").style.display = "block";
        isValid = false;
    } else score++;

    if (isValid) {
        document.getElementById("successMessage").textContent = `You scored ${score} out of ${totalQuestions}!`;
        document.getElementById("successMessage").style.display = "block";
    }
});

// Custom quiz creation functionality
const customQuiz = [];

document.getElementById("addQuestionBtn").addEventListener("click", function () {
    const questionText = document.getElementById("customQuestionText").value;
    const answerType = document.querySelector('input[name="answerType"]:checked').value;

    const newQuestion = {
        questionText,
        answerType,
        options: [],
        correctAnswers: []
    };

    // Capture options for multiple choice or radio button types
    if (answerType === "radio" || answerType === "checkbox") {
        document.querySelectorAll(".customOptionInput").forEach(input => {
            if (input.value) {
                newQuestion.options.push(input.value);
                if (input.checked) newQuestion.correctAnswers.push(input.value);
            }
        });
    } else {
        newQuestion.correctAnswers.push(document.getElementById("customTextAnswer").value);
    }

    customQuiz.push(newQuestion);
    document.getElementById("customQuestionText").value = "";
    document.querySelectorAll(".customOptionInput").forEach(input => input.value = "");

    alert("Question added to the custom quiz!");
});

// Save custom quiz to local storage
document.getElementById("saveQuizBtn").addEventListener("click", function () {
    localStorage.setItem("customQuiz", JSON.stringify(customQuiz));
    alert("Custom quiz saved!");
});

// Load custom quiz from local storage and display it
document.getElementById("loadQuizBtn").addEventListener("click", function () {
    const loadedQuiz = JSON.parse(localStorage.getItem("customQuiz"));
    if (!loadedQuiz) {
        alert("No quiz found in storage!");
        return;
    }

    const quizContainer = document.getElementById("customQuizContainer");
    quizContainer.innerHTML = "";

    loadedQuiz.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const questionTitle = document.createElement("p");
        questionTitle.textContent = `${index + 1}. ${question.questionText}`;
        questionElement.appendChild(questionTitle);

        if (question.answerType === "radio") {
            question.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = option;
                label.appendChild(input);
                label.append(option);
                questionElement.appendChild(label);
            });
        } else if (question.answerType === "checkbox") {
            question.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "checkbox";
                input.name = `question${index}`;
                input.value = option;
                label.appendChild(input);
                label.append(option);
                questionElement.appendChild(label);
            });
        } else {
            const input = document.createElement("textarea");
            input.rows = 2;
            input.name = `question${index}`;
            questionElement.appendChild(input);
        }

        quizContainer.appendChild(questionElement);
    });
});
document.getElementById("submitCustomQuizBtn").addEventListener("click", function() {
    const customQuizData = [];

    // Retrieve all questions from the custom quiz container
    const questions = document.querySelectorAll('.custom-quiz-question');
    questions.forEach(question => {
        const questionText = question.querySelector('.question-text').value;
        const answerInputs = question.querySelectorAll('.answer-input');
        const correctAnswers = [];

        answerInputs.forEach(input => {
            if (input.checked) {
                correctAnswers.push(input.value);
            }
        });

        customQuizData.push({
            question: questionText,
            correctAnswers: correctAnswers
        });
    });

    // Store the quiz data in localStorage
    localStorage.setItem('customQuiz', JSON.stringify(customQuizData));

    // Display success message
    const successMessage = document.getElementById("customQuizSuccessMessage");
    successMessage.style.display = "block";

    // Optionally hide the success message after a few seconds
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 5000); // Hide after 5 seconds
});
