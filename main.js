video = ""
objects = []
function preload(){
    video = createCapture(VIDEO);
    video.hide();
}

function setup(){
    canvas = createCanvas(600,450);
    canvas.position(650,300)


}

function gotResult(error,results){
  if(error){
    console.log(error)
  }
  console.log(results)
  

  objects = results
}

function draw(){
    image(video,0,0,600,450);  
    if (status != ""){
        objectDetector.detect(video,gotResult)
 
        for(i = 0; i < objects.length; i++){

            
            fill("#498bf5")

            percent = Math.floor(objects[i].confidence * 100)+"%"

            text(objects[i].label +" "+percent+" "  ,objects[i].x + 15,objects[i].y + 15)

            noFill()
            stroke("#498bf5")

            rect(objects[i].x - 15,objects[i].y,objects[i].width,objects[i].height);
            object_input = document.getElementById("object_input").innerHTML 
            if(objects[i].label == object_input){

                video.stop()
                objectDetector.detect(video,gotResult)

                document.getElementById("object_status").innerHTML =  object_input+" was found"
                speak_data = object_input+" was found"
                console.log("object found")
                speak()


            }
            else{
                document.getElementById("object_status").innerHTML = ""

            }


        }

    }
    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modeLoaded);
    document.getElementById("status").innerHTML = "STATUS: Model Loading..."
    document.getElementById("object_input").innerHTML = "Mentioned Object Found"
}

function modeLoaded(){
    console.log("Model Loaded")
    document.getElementById("status").innerHTML = "STATUS: Model Loaded! "
    status = true;
  
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}