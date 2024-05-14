let textarea = document.getElementById("textarea");
let timerDisplay = document.getElementById("timer");
let resetBtn = document.getElementById("reset");
let content = document.getElementById("content");
let content_array=[
    "In the heart of the bustling city, there was a quaint little coffee shop that had become my sanctuary.",
    "The aroma of freshly ground coffee beans wafted through the air.",
    "As I pushed open the glass door, the soft hum of conversation and the clinking of ceramic mugs.",
    "I found an empty seat by the window, where I could watch the world go by.",
    "As I sipped my coffee, I felt a sense of peace envelop me, a stark contrast to the chaos outside.",
    "In the heart of the bustling city, there was a quaint little coffee shop that had become my sanctuary.",
    "The baristas, with their warm smiles and friendly banter adding a personal touch to every cup they brewed."
];

let contentNo=0;
content.innerHTML= content_array[contentNo];
var errorCount = 0;
let totalErrorCount = 0;
let totalCharactersTyped = 0;

let time = 60;
let interval;
let start = false;

textarea.addEventListener('input', function() {
    if(start){
        return;
    }
    start=true;
    interval = setInterval(function() {
        content.innerHTML= content_array[contentNo];
        time--;
        timerDisplay.innerText = "00: " + time ;
        if(time === 0){
            clearInterval(interval);
            timerDisplay.innerText = "00:00";
            calculateTypingSpeed();
            textarea.disabled=true;
            return;
        }
    }, 1000); //1000miliseconds time delay, 1000ms=1s
});

textarea.addEventListener('keyup', function(event) {
    totalCharactersTyped++; // Increment totalCharactersTyped for every key press
    if (event.code === 'Space') {
        compareContent(); // Call compareContent whenever space bar is pressed
    } 
});


function compareContent() {
    var typedText = textarea.value.trim();
    var originalText = content_array[contentNo].trim();
    var typedWords = typedText.split(/\s+/);
    var originalWords = originalText.split(/\s+/);

    errorCount = 0;

    for (var i = 0; i < Math.min(typedWords.length, originalWords.length); i++) {
        if (typedWords[i] !== originalWords[i]) {
            errorCount++; 
            console.log("Typed : " +  typedWords[i] + " Original : " + originalWords[i]);
        }
    }

    if (timer==0 || typedText.trim().length >= originalText.trim().length) {
        totalErrorCount = totalErrorCount +  errorCount;
        contentNo++;
        if (contentNo < content_array.length) {
            content.innerHTML = content_array[contentNo];
            textarea.value = ""; 
        }
    }
    console.log("Total characters in this line : " + totalCharactersTyped);
    console.log("Local Error: " + errorCount + "\nTotal Error : " + totalErrorCount);

}

function calculateTypingSpeed() {
    var wpm = document.getElementById("wpm");
    var accu = document.getElementById("accuracy");
    var errors = document.getElementById("error");

    console.log("TotalCharactersTyped : " + totalCharactersTyped + "TotalErrors : " +  totalErrorCount);
    var totalWords = totalCharactersTyped/5;
    var wordsPerMinute = totalCharactersTyped / 5; // Assuming an average word length of 5 characters

    if(totalErrorCount==0){
        var accuracy = ((totalWords - errorCount) / totalWords) * 100;
        wpm.innerText= wordsPerMinute.toFixed(2) + "WPM";
        accu.innerText= "Accuracy : " +  accuracy.toFixed(2) + "%";
        errors.innerText= errorCount + "errors";

        results.innerText = "Your typing speed is: \n " + wordsPerMinute.toFixed(2) + " words per minute!\nAccuracy: " + accuracy.toFixed(2) + "%\nErrors: " + errorCount;

    }else{
        var accuracy = ((totalWords - totalErrorCount) / totalWords) * 100; 
        wpm.innerText= wordsPerMinute.toFixed(2) + "WPM";
        accu.innerText= "Accuracy : " +  accuracy.toFixed(2) + "%";
        errors.innerText= totalErrorCount + "errors";
        results.innerText = "Your typing speed is: \n " + wordsPerMinute.toFixed(2) + " words per minute!\nAccuracy: " + accuracy.toFixed(2) + "%\nErrors: " + totalErrorCount;

    }
}

resetBtn.addEventListener('click', function(){
    textarea.value="";
    contentNo=0;
    timerDisplay.innerText=":60";
    time=60;
    clearInterval(interval);
    errorCount=0;
    totalErrorCount=0;
    totalCharactersTyped = 0;
    start = false;
});