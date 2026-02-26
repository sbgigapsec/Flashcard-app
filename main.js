var flashcards = [
    { question: "What is capital of India?", answer: "Delhi" },
    { question: "Who is current prime minister of India?", answer: "Narendra Modi" }
];
var currentCardIndex = 0;
var isFlipped = false;
var flashcardElement = document.getElementById("flashcard");
var progressElement = document.getElementById("progress");
var questionInput = document.getElementById("questionInput");
var answerInput = document.getElementById("answerInput");
var addBtn = document.getElementById("addBtn");
var nextBtn = document.getElementById("nextBtn");
var prevBtn = document.getElementById("prevBtn");
var deleteBtn = document.getElementById("deleteBtn");
function updateDisplay() {
    if (flashcards.length === 0) {
        flashcardElement.innerHTML = "No flashcards. Add one to get started!";
        flashcardElement.className = "flashcard";
        progressElement.innerHTML = "Card 0 / 0";
        return;
    }
    var card = flashcards[currentCardIndex];
    var displayText = isFlipped ? card.answer : card.question;
    flashcardElement.innerHTML = displayText;
    flashcardElement.className = isFlipped ? "flashcard back" : "flashcard";
    progressElement.innerHTML = "Card ".concat(currentCardIndex + 1, " / ").concat(flashcards.length);
}
function nextCard() {
    if (flashcards.length === 0)
        return;
    isFlipped = false;
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    updateDisplay();
}
function prevCard() {
    if (flashcards.length === 0)
        return;
    isFlipped = false;
    currentCardIndex = currentCardIndex === 0 ? flashcards.length - 1 : currentCardIndex - 1;
    updateDisplay();
}
function deleteCard() {
    if (flashcards.length === 0)
        return;
    flashcards.splice(currentCardIndex, 1);
    if (currentCardIndex >= flashcards.length && currentCardIndex > 0) {
        currentCardIndex--;
    }
    isFlipped = false;
    updateDisplay();
}
function addCard() {
    var question = questionInput.value.trim();
    var answer = answerInput.value.trim();
    if (question && answer) {
        flashcards.push({ question: question, answer: answer });
        questionInput.value = "";
        answerInput.value = "";
        currentCardIndex = flashcards.length - 1;
        isFlipped = false;
        updateDisplay();
    }
}
flashcardElement === null || flashcardElement === void 0 ? void 0 : flashcardElement.addEventListener("click", function () {
    if (flashcards.length > 0) {
        isFlipped = !isFlipped;
        updateDisplay();
    }
});
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", nextCard);
prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener("click", prevCard);
deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener("click", deleteCard);
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", addCard);
questionInput === null || questionInput === void 0 ? void 0 : questionInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter")
        answerInput.focus();
});
answerInput === null || answerInput === void 0 ? void 0 : answerInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter")
        addCard();
});
updateDisplay();
