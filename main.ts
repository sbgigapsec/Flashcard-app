interface Flashcard {
    question: string;
    answer: string;
}

var flashcards : Flashcard[] = [
    { question: "What is capital of India?", answer: "Delhi"},
    { question: "Who is current prime minister of India?", answer: "Narendra Modi"}
]

var currentCardIndex: number = 0;
var isFlipped: boolean = false;

var flashcardElement = document.getElementById("flashcard");
var progressElement = document.getElementById("progress");
var questionInput = document.getElementById("questionInput") as HTMLInputElement;
var answerInput = document.getElementById("answerInput") as HTMLInputElement;
var addBtn = document.getElementById("addBtn");
var nextBtn = document.getElementById("nextBtn");
var prevBtn = document.getElementById("prevBtn");
var deleteBtn = document.getElementById("deleteBtn");

function updateDisplay(): void {
    if (flashcards.length === 0) {
        flashcardElement!.innerHTML = "No flashcards. Add one to get started!";
        flashcardElement!.className = "flashcard";
        progressElement!.innerHTML = "Card 0 / 0";
        return;
    } 

    const card = flashcards[currentCardIndex];
    const displayText = isFlipped ? card.answer : card.question;
    
    flashcardElement!.innerHTML = displayText;
    flashcardElement!.className = isFlipped ? "flashcard back" : "flashcard";
    progressElement!.innerHTML = `Card ${currentCardIndex + 1} / ${flashcards.length}`;
}

function nextCard(): void {
    if (flashcards.length === 0) return;
    isFlipped = false;
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    updateDisplay();
}

function prevCard(): void {
    if (flashcards.length === 0) return;
    isFlipped = false;
    currentCardIndex = currentCardIndex === 0 ? flashcards.length - 1 : currentCardIndex - 1;
    updateDisplay();
}

function deleteCard(): void {
    if (flashcards.length === 0) return;
    flashcards.splice(currentCardIndex, 1);
    if (currentCardIndex >= flashcards.length && currentCardIndex > 0) {
        currentCardIndex--;
    }
    isFlipped = false;
    updateDisplay();
}

function addCard(): void {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    
    if (question && answer) {
        flashcards.push({ question, answer });
        questionInput.value = "";
        answerInput.value = "";
        currentCardIndex = flashcards.length - 1;
        isFlipped = false;
        updateDisplay();
    }
}

flashcardElement?.addEventListener("click", () => {
    if (flashcards.length > 0) {
        isFlipped = !isFlipped;
        updateDisplay();
    }
});

nextBtn?.addEventListener("click", nextCard);
prevBtn?.addEventListener("click", prevCard);
deleteBtn?.addEventListener("click", deleteCard);
addBtn?.addEventListener("click", addCard);

questionInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") answerInput.focus();
});

answerInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addCard();
});

updateDisplay();
