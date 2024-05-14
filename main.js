img = "";
status = "";
objects = [];


function setup() {


    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    }

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";

}

function preload(){
img = loadImage('dog_cat.jpg');
}

function draw () {
    image(video,0,0,380,380);
        if (status != "")
        {   
            r = random(225);
            g = random(225);
            b = random(225);

            objectDetector.detect(video,gotResult);
            for ( i = 0; i <  objects.length; i++)
            {
                document.getElementById("status").innerHTML = "status : objects detected";
                document.getElementById("number_of_objects").innerHTML = "number of objected are :"+ objects.length;

                
                fill("r,g,b");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " "+ percent + "%",objects[i].x+15, objects[i].y+15);
                noFill();
                stroke("r,g,b");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
             }
        }

   
}

function gotResult(error,results)
{
    if (error) {

        console.log(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded() {

    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video,gotResult);
}