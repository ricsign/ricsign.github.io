let score = 0;
let mistakes = 0;
let stoppingTime = 0;

// shuffle array function
let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};


// set up or reload game
let gameInit = () => {
    let tilesArray = [
        '<div class="hidden tile" pair="ab"></div>',
        '<div class="hidden tile" pair="ab"></div>',
        '<div class="hidden tile" pair="bc"></div>',
        '<div class="hidden tile" pair="bc"></div>',
        '<div class="hidden tile" pair="can"></div>',
        '<div class="hidden tile" pair="can"></div>',
        '<div class="hidden tile" pair="can2"></div>',
        '<div class="hidden tile" pair="can2"></div>',
        '<div class="hidden tile" pair="can3"></div>',
        '<div class="hidden tile" pair="can3"></div>',
        '<div class="hidden tile" pair="can4"></div>',
        '<div class="hidden tile" pair="can4"></div>',
        '<div class="hidden tile" pair="lab"></div>',
        '<div class="hidden tile" pair="lab"></div>',
        '<div class="hidden tile" pair="mb"></div>',
        '<div class="hidden tile" pair="mb"></div>',
        '<div class="hidden tile" pair="nb"></div>',
        '<div class="hidden tile" pair="nb"></div>',
        '<div class="hidden tile" pair="nl"></div>',
        '<div class="hidden tile" pair="nl"></div>',
        '<div class="hidden tile" pair="ns"></div>',
        '<div class="hidden tile" pair="ns"></div>',
        '<div class="hidden tile" pair="nu"></div>',
        '<div class="hidden tile" pair="nu"></div>',
        '<div class="hidden tile" pair="nw"></div>',
        '<div class="hidden tile" pair="nw"></div>',
        '<div class="hidden tile" pair="on"></div>',
        '<div class="hidden tile" pair="on"></div>',
        '<div class="hidden tile" pair="pe"></div>',
        '<div class="hidden tile" pair="pe"></div>',
        '<div class="hidden tile" pair="qc"></div>',
        '<div class="hidden tile" pair="qc"></div>',
        '<div class="hidden tile" pair="sk"></div>',
        '<div class="hidden tile" pair="sk"></div>',
        '<div class="hidden tile" pair="yk"></div>',
        '<div class="hidden tile" pair="yk"></div>',
    ];
    // set score and mistakes to 0
    score = 0;
    mistakes = 0;
    $(".score span").text(score);
    $(".mistakes span").text(mistakes);
    // shuffle array
    shuffleArray(tilesArray);
    // show on the web
    $(".tiles-area").empty();
    for (let t of tilesArray) {
        $(".tiles-area").append(t);
    }
    // initiate timer
    let currentTime = new Date().getTime();
    stoppingTime = new Date(currentTime + 3 * 60 * 1000).getTime(); // three minutes timer
    let interval = setInterval(function () {
        let currentTime = new Date().getTime();
        let distance = stoppingTime - currentTime;
        if (distance < 0) {
            clearInterval(interval);
            alert("Sorry, but the time is expired! Please try again!");
            window.location = window.location.pathname;
        }
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $(".timer span").text(minutes + "m " + seconds + "s ");
    }, 1000); // update every second
}

// setting up a new game
let newGame = () => {
    if(confirm("Are you sure you want to start a new game?")){
        gameInit();
    }
}


// when window is loaded
$(document).ready(function () {
    gameInit();
    // bind event listener when click happens (only the hidden one will respond)
    // note .tile.hidden must be added in the event binder, due to possible incomplete loading
    $(".tiles-area").on("click", ".tile.hidden", function (e) {
        // retrieve attribute
        let pairName = $(this).attr("pair");
        // remove the hidden state and add the corresponding class
        $(this).removeClass("hidden").addClass(pairName);
        // if the other half is matched (number of element = 2): great; otherwise, close both
        if ($(".hidden").length === 36 - score * 2 - 2) { // variable
            if ($(".tile." + pairName).length === 2) {
                ++score;
                // restart the game if score is 36/2
                if (score === 18) {
                    alert("Congratulations! You win the game :)");
                    window.location = window.location.pathname;
                }
                $(".tile." + pairName).addClass("matched");
            } else {
                // not good, close both tiles and disable clicking
                ++mistakes;
                if (mistakes === 7) {
                    alert("Sorry, too many mistakes were made. Let's try it again!");
                    window.location = window.location.pathname;
                }
                // $('body').css('cursor', 'none');
                document.getElementById('container').style.pointerEvents = 'none';
                setTimeout(function () {
                    $(".tile:not(.matched)").removeClass().addClass("hidden tile");
                    // $('body').css('cursor', 'pointer');
                    document.getElementById('container').style.pointerEvents = 'visible';
                }, 1000);
            }
        }

        $(".score span").text(score);
        $(".mistakes span").text(mistakes);
    });

});
