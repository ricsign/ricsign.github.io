let numCards = 8;
let cardList = [];

class Card {
    constructor(index, val) {
        this.index = index;
        this.val = val;
    }

    htmlElement() {
        return "<div class='cardd col-sm-12 col-md-4 col-lg-2 m-3' id='card" + this.index + "'><div class='cardd-text invisible'>" + this.val + "</div></div>";
    }
}

let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let handleClick = (id) => {
    id = "#" + id;
    let idNum = parseInt(id.substring(5)); // 5 is the length of "#card"
    let childText = $(id).children().eq(0);
    let neighborCard = idNum % 2 === 0 ? $("#card" + (idNum + 1)) : $("#card" + (idNum - 1));
    if (childText.hasClass("invisible")) {
        childText.removeClass("invisible");
    } else{
        return;
    }

    if (!(neighborCard.children().eq(0).hasClass("invisible"))) {
        if (!($(id).hasClass("discovered"))) $(id).addClass("discovered");
        if (!(neighborCard.hasClass("discovered"))) neighborCard.addClass("discovered");
        $("#g-score").html(parseInt($("#g-score").html())+10);
    } else {
        // count how many invisible cards in total
        // when visible card > 1, all cards should be invisible
        // when visibile card == 1, all cards except card should be invisible

        for (let i = 0; i < numCards; ++i) {
            if (i === idNum) continue;
            if (!($("#card" + i).hasClass("discovered")) && !($("#card" + i).children().eq(0).hasClass("invisible"))) {
                $("#cards").css("pointer-events", "none");
                $("#card" + i).addClass("bg-danger text-light");
                $(id).addClass("bg-danger text-light");
                setTimeout(function() {
                    $("#card" + i).children().eq(0).addClass("invisible");
                    $(id).children().eq(0).addClass("invisible");
                    $("#card" + i).removeClass("bg-danger text-light");
                    $(id).removeClass("bg-danger text-light");
                    $("#cards").css("pointer-events", "auto");
                }, 500);

            }
        }
    }

    $("#click").html(parseInt($("#click").html())+1);
    $("#n-score").html(parseInt($("#g-score").html())-parseInt($("#click").html()));

    // winning
    if(parseInt($("#g-score").html()) === 5*numCards){
        setTimeout(function(){
            alert("Congratulations, you win! Your net score is "+parseInt($("#n-score").html()));
            location.reload();
        },1000);   
    }
}

let setupGame = () => {
    let numPairs = parseInt(prompt("Number of pairs:"));
    while(isNaN(numPairs) || numPairs <= 0){
        numPairs = parseInt(prompt("Number of pairs:"));
    }
    numCards = numPairs*2;
    for (let i = 0; i < numCards; ++i) {
        cardList.push(new Card(i, Math.floor(i / 2)));
    }
    cardList = shuffleArray(cardList);
    for (let i = 0; i < numCards; ++i) {
        $("#cards").append(cardList[i].htmlElement());
    }
}


$(document).ready(function() {
    setupGame();

    $(".cardd").on("click", function(e) {
        handleClick(e.target.id);
    })
});