song="";
lwx=0;
lwy=0;
rwx=0;
rwy=0;
slwy=0;
srwy=0;
function setup(){
    video=createCapture(VIDEO);
    canvas=createCanvas(600,500);
    canvas.center();
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if (srwy > 0.2) {  
    
    circle(rwx,rwy,20);
    if (rwy > 0 && rwy<=100) {
        document.getElementById("tolateacher").innerHTML="Speed= 0.5x";
        song.rate(0.5);
    }
    else if(rwy > 100 && rwy<=200){
        document.getElementById("tolateacher").innerHTML="Speed= 1x";
        song.rate(1);
    }    
    else if(rwy > 200 && rwy<=300){
        document.getElementById("tolateacher").innerHTML="Speed= 1.5x";
        song.rate(1.5);
    }    
    else if(rwy > 300 && rwy<=400){
        document.getElementById("tolateacher").innerHTML="Speed= 2x";
        song.rate(2);
    }    
    else if(rwy > 400 && rwy<=500){
        document.getElementById("tolateacher").innerHTML="Speed= 2.5x";
        song.rate(2.5);
    }
 }   
        if (slwy>0.2) {
    circle(lwx,lwy,20);
    Nly=Number(lwy);
    blindteacher=floor(Nly);
    volume=blindteacher/500;
    document.getElementById("blindteacher").innerHTML="Volume="+volume;
    song.setVolume(volume);
 }
}
function modelLoaded(){
console.log("posenet is initialized");
}

function preload(){
song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if (results.length > 0) {
    console.log(results);
    lwx=results[0].pose.leftWrist.x;
    lwy=results[0].pose.leftWrist.y;
    console.log("LeftWrist X="+lwx+"LeftWrist Y="+lwy);
    rwx=results[0].pose.rightWrist.x;
    rwy=results[0].pose.rightWrist.y;
    console.log("RightWrist X="+rwx+"Rightrist Y="+rwy);
    slwy=results[0].pose.keypoints[9].score;  
    srwy=results[0].pose.keypoints[10].score;
    console.log("Right writ score is="+srwy +"Left wrist score is="+slwy);
    }
}