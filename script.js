let quoteArr=[];
let iterator=0;
let txtarea=document.getElementById('inp');
let quote=document.getElementById('quote');
let score=0;
let timestamp=[];
let timer=0;
let timerId;
let timerSpan=document.getElementById('timer');

let startTestBtn=document.getElementById("startBtn");
startTestBtn.addEventListener("click",()=>{
  startTestBtn.style.display='none';
  get_API_DATA("https://type.fit/api/quotes").then(res=>console.log("API data fetched")).catch(err=>alert('something went wrong :'+err.message))
}
);
async function get_API_DATA(url){
    let response=await fetch(url);
    const data=await response.json();
    quoteArr=selectRandomElements(data,10);
    if(quoteArr.length==10){
        let x=document.getElementById('center');
        x.style.display='block';
        updateQuote();
        timerId=setInterval(() => {
          ++timer;
          timerSpan.innerHTML=timer;
        }, 1000);
    }
}
function selectRandomElements(array, numberOfElements) {
    let randomElements = [];
    for (let i = 0; i < numberOfElements; i++) {
      let randomIndex = Math.floor(Math.random() * array.length);
      randomElements.push(array[randomIndex]);
    }
    return randomElements;
  }
  function updateQuote(){
    // console.log(iterator);
    if(iterator==10){
      alert("TEST COMPLETED");
      clearInterval(timerId);
      txtarea.style.display='none';
      quote.innerHTML="TEST COMPLETED : "+score+"/10 Score "+"average time : "+timer/10;
      localStorage.setItem('score',score);
      localStorage.setItem('avgTime',timer/10);
    }
    else{
      quote.innerHTML=quoteArr[iterator++].text;
    }
  }
  function compareText(){
    return txtarea.value.toLowerCase()===quoteArr[iterator-1].text.toLowerCase();
  }

  txtarea.addEventListener("keypress",(event)=>{
    let centerDiv=document.getElementById('center');
    if(event.key==="Enter"){
        if(compareText()){
            alert("correct");
            ++score;
            centerDiv.style.borderColor="Green";
        }
        else{
            alert('incorrect');
            centerDiv.style.borderColor="Red";
        }
        setTimeout(() => {
          updateQuote();
          timestamp.push(timer);
        }, 1000);
    }
  })

