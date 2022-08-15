song1=""
song2=""
leftWristX=0
rightWristX=0
leftWristY=0
rightWristY=0
leftScore=0
rightScore=0
function setup(){
    canvas=createCanvas(650,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}
function draw(){
    image(video, 0, 0, 650, 500)


    fill("red")
    stroke("blue")
    circle(rightWristX, rightWristY, 20)
    if(rightScore>0.2){
       song2.stop()
       song1.play()
    }
    circle(leftWristX, leftWristY, 20)
    if(leftScore>0.2){
       song1.stop()
       song2.play()
    }
}
function preload(){
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}
function start(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
function stop(){
    song.stop()
}
function modelLoaded(){
    console.log("PoseNet has loaded!")
}
function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results)
        rightScore=results[0].pose.keypoints[10].score
        leftScore=results[0].pose.keypoints[9].score
        leftWristX=results[0].pose.leftWrist.x
        rightWristX=results[0].pose.rightWrist.x
        leftWristY=results[0].pose.leftWrist.y
        rightWristY=results[0].pose.rightWrist.y
        console.log("leftX:",leftWristX,"leftY:", leftWristY)
        console.log("rightX:",rightWristX,"rightY:", rightWristY)
    }
}

