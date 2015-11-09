
var lengthofobject = Object(data.quizcontent).length;
var curPage = 0, numOfCorrect = 0;
var myAnswers = [];

var newimage = document.getElementById("quizimage");
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var btnPrevious = document.getElementById("btnPrevious");
var btnNext = document.getElementById("btnNext");
var btnFinish = document.getElementById("finishQuiz");

checkPage();

btnPrevious.addEventListener("click",moveBack);
btnNext.addEventListener("click",moveNext);
btnFinish.addEventListener("click",endQuiz);

for(var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click',myAnswer, false);
}

function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    // check for correct answer
    
    myAnswers[curPage] = idAnswer;
    if(data.quizcontent[curPage].correct == idAnswer) {
        console.log('Corect Answer');
    }
    else {
        console.log('Wrong Answer');
    }
    addBox();
} 

function addBox() {
    for(var i=0; i<myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        if(myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        }
        else {
            curNode.classList.remove("selAnswer");
        }
    }
}

function moveNext() {
    // check if an answer has been made
    
    if(myAnswers[curPage]) {
        console.log('okay to proceed');
        if(curPage < (lengthofobject - 1)) {
            curPage++;
            checkPage(curPage);
        }
        else {
            //check if quiz is completed
            console.log(curPage + ' ' + lengthofobject);
            if(lengthofobject >= curPage) {
                endQuiz();
            }
            else {
              console.log('end of quiz Page ' + curPage);  
            }
        }
    }
    else {
        console.log('not answered');
    }
}

function endQuiz() {
    if(myAnswers[lengthofobject-1]) {
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for( var i = 0; i< myAnswers.length; i++) {
            if(data.quizcontent[i].correct == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                numOfCorrect++;
            }
            else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden = "true"></span>';
            }
            output = output + '<p>Question '+ (i+1) + ' ' + questionResult + '</p> ';
        }
        output = output + '<p>You scored ' + numOfCorrect + ' out of ' +lengthofobject + '</p> </div> ';
        document.getElementById("quizContent").innerHTML = output;
    }
    else  {
        console.log('not answered');
    }
}

function checkPage(i) {
   // add remove disabled buttons if there are no more questions in que
   
   if(curPage==0) {
       btnPrevious.classList.add("hide");
   }
   else {
       btnPrevious.classList.remove("hide");
   }
   
   if((curPage+1) < (lengthofobject)) {
       btnNext.classList.remove("hide");
   }
   else {
       btnNext.classList.add("hide");
       btnFinish.classList.remove("hide");
   }
   
   myHeader.innerHTML = data.quizcontent[curPage].question;
   newimage.src = data.quizcontent[curPage].image;
   for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        curNode.childNodes[1].innerHTML = capitalise(data.quizcontent[curPage]["a"+(i+1)]);
        // check if answered already
        
        if(myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        }
        else {
            curNode.classList.remove("selAnswer");
        }
   }
   //update progress bar
  
   var increment = Math.ceil((curPage+1)/(lengthofobject)*100);
   progressBar.style.width = (increment)+'%';
   progressBar.innerHTML = (increment)+'%';
}

function moveBack() {
    if(curPage > 0) {
        curPage--;
        checkPage(curPage);
    }
    else {
        console.log('end of quiz Page ' + curPage);
    }
}

function capitalise(str) {
    return str.substr(0,1).toUpperCase() + str.substr(1);
}
