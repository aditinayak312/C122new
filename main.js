x = 0;
y= 0;
screen_width=0;
screen_height=0;
to_number=0;
draw_apple="";
speak_apple="";
speak_data="";
apple="";

function preload(){
    apple=loadImage("apple.png");
}

speechRecognition=window.webkitSpeechRecognition;
recognition= new speechRecognition();

function start(){
    document.getElementById("status").innerHTML= "SYSTEM IS LISTENING PLEASE SPEAK";
    recognition.start();
}
recognition.onresult=function (event){
    console.log(event);
    content=event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "SPEECH HAS BEEN RECOGNISED  " + content;
    to_number=Number(content);
    if (Number.isInteger(to_number)){
        document.getElementById("status").innerHTML="STARTED DRAWING APPLE";
        draw_apple="set";
    }
    else{
        document.getElementById("status").innerHTML="SPEECH HAS NOT BEEN RECOGNISED AS A NUMBER";
    }
}
function setup(){
    screen_width=window.innerWidth;
    screen_height=window.innerHeight;
    canvas=createCanvas(screen_width,screen_height-150);
    canvas.position(0,150);
}

function draw(){
    if(draw_apple=="set"){
        for(var i=1;i<=to_number;i++){
            x=Math.floor(Math.random()*700);
            y=Math.floor(Math.random()*400);
            image(apple,x,y,50,50);
        }
        document.getElementById("status").innerHTML=to_number+"APPLES DRAWN";
        speak_data=to_number+"APPLES DRAWN";
        speak();
        draw_apple="";
    }
}

function speak(){
    synth=window.speechSynthesis;
    utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak();
    speak_data="";
}