peter_pan_song = "";
harry_potter_theme_song="";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftwrist=0;
song_peter_pan="";
scorerightwrist=0;
song_harry_potter="";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function draw(){
    image(video, 0, 0 , 600, 530);

    fill("red");
    stroke("red");

    song_peter_pan=peter_pan_song.isPlaying();
    console.log("Peter Pan Song = "+song_peter_pan);

song_harry_potter=harry_potter_theme_song.isPlaying();
    console.log("Harry Potter Theme Song"+song_harry_potter);

    if(scoreleftwrist>0.2){
        circle(leftWristx, leftWristy, 20);
        harry_potter_theme_song.stop();
        if(song_peter_pan == false){
            peter_pan_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song";
        }
    }

    if(scorerightwrist>0.2){
        circle(rightWristx, rightWristy, 20);
        peter_pan_song.stop();
        if(song_harry_potter == false){
            harry_potter_theme_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML="Song Name: Harry Potter Theme Song";
        }
    }
}
function preload(){
    peter_pan_song=loadSound("music2.mp3");
    harry_potter_theme_song=loadSound("music.mp3")
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if(results.length >0){
        console.log(results);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("LeftWrist_Score"+scoreleftwrist);

        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("RightWrist_Score"+scorerightwrist);

        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("left Wrist X = "+leftWristx+"Left Wrist Y = "+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristx+"Right Wrist Y = "+rightWristy);
    }
}