var arDrone = require('ar-drone');
var keypress = require('keypress');
var client = arDrone.createClient();
let maxAltitide = 1000000;
let waypaoint = false;
let isInArray = false;
let isDone = false;
let waypointArray = [];
let timer = 3000;
let timerAddMS = 3000;
let beginTimer = 5000;
let animateTimer = 1000;
let speed = 0.2;
let manualcontrol = true;

let waypointOptions = ["up","down","left","right","forward","backwards","turn left","turn right","blink","dance","land"];
require('events').EventEmitter.defaultMaxListeners = 100000000000000000000000000000000000000000000000000000000000000000000000000000000;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


Menu();


function Menu(){
console.clear();
client.config('control:altitude_max',maxAltitide);
ClearInput();
readline.question(`\nWelcome with the drone control app made by Jordi and Lucas.\n\n\nYou can choose between manual flight or to create a flight path.\nPlease type: "manual" or "path".\n\n`, (name) =>
{
ClearInput();

  if(name == "path")
  {
    console.log(`\n${name} selected.`);
    console.log("\n Instructions to creating a flight path:\n You will make a custom pattern from the following options:\nEvery instruction will be each be executed in " + timer / 1000 + "seconds interval.\n\nType Done when ready!");
    for(let i=0; i< waypointOptions.length; i++)
    {
      console.log("- "+ waypointOptions[i]);
    }
    console.log("\nYou can now type in your instructions to the drone\nPlease take not of your surroundings, the drone might fly into something and damage property or people.\nJordi and Lucas are not responsible to any damages made by the end user.")
    waypoints = true;
    waypoint();
  }
  else if(name == "manual")
  {
    console.log(`\n${name} selected.`)
    manualcontrol = true;
    timer = 0;
    Manual();
  }
  else if(name == "disEmerg")
  {
    client.disableEmergency();
    Menu();
  }
  else
  {
    Menu();
    console.log("\nInput invalid, please try again.");
  }
});
}
function waypoint()
{
  readline.question(`Next instruction: `, (name) =>
  {
    isInArray = waypointOptions.includes(name);

    if(isInArray == true)
    {
      waypointArray.push(name);
      console.log(waypointArray);
    }
    else if(name.toLocaleLowerCase() == "done")
    {
      readline.question(`Are you certain? Y/N `, (answer) =>
      {
        if(answer.toLocaleLowerCase() == "y")
        {
          console.log("Executing instructions...");
          isDone = true;
          convertArrayToDrone();
        }
        else if(answer.toLocaleLowerCase()   == "n")
        {
          waypoint();
        }
        else
        {
          console.log("\nInput invalid, please try again.\n")
        }
      });
    }
    else
    {
      console.log("\nInput invalid, please try again.\n")
    }
    if(isDone == false)
    {
      waypoint();
    }
  });
}

function convertArrayToDrone()
{
  client.takeoff();
  client.stop();
  setTimeout(function()
  {
    for(let i = 0; i<waypointArray.length; i++)
    {
      if(i != 0)
      {
        timer = timer + timerAddMS;
      }
      client.stop();
      console.clear();

      switch (waypointArray[i])
      {

        case waypointOptions[0]:
        setTimeout(function(){
        console.log("Current instruction: Up");
        client.up(speed)},timer);
        break;

        case waypointOptions[1]:
        setTimeout(function(){
        console.log("Current instruction: Down");
        client.down(speed)},timer);
        break;

        case waypointOptions[2]:
        setTimeout(function(){
        console.log("Current instruction: Left");
        client.left(speed)},timer);
        break;

        case waypointOptions[3]:
        setTimeout(function(){
        console.log("Current instruction: Right");
        client.right(speed)},timer);
        break;

        case waypointOptions[4]:
        setTimeout(function(){
        console.log("Current instruction: Forward");
        client.front(speed)},timer);
        break;

        case waypointOptions[5]:
        setTimeout(function(){
        console.log("Current instruction: Backwards");
        client.back(speed)},timer);
        break;

        case waypointOptions[6]:
        setTimeout(function(){
        console.log("Turn Current instruction: Turn Left");
        client.animate('flipLeft', animateTimer)},timer);
        break;

        case waypointOptions[7]:
        setTimeout(function(){
        console.log("Current instruction: Turn Right");
        client.animate('yawShake', animateTimer)},timer);
        break;

        case waypointOptions[8]:
        setTimeout(function(){
        console.log("Current instruction: Blinking Lights");
        client.animateLeds('doubleMissile', 5, 2)},timer);
        break;

        case waypointOptions[9]:
        setTimeout(function(){
        console.log("Current instruction: Dancing");
        client.animate('vzDance', animateTimer)},timer);
        break;

        case waypointOptions[10]:
        setTimeout(function(){
        console.log("Commencing landing");
        client.land(callback())},timer);
        break;
      }
    }
  },beginTimer);
}

function Manual()
{

      keypress(process.stdin);
      process.stdin.on('keypress', function (ch, key){
        if(manualcontrol == true){
        console.clear();
        //client.stop();
          if(key.name == "t"){
            client.takeoff();
              console.log("takeoff");
          };
          if(key.name == "l"){
            readline.close();
            client.land(callback());
              console.log("Land");
              return;
            };
          if(key.name == "w"){
            client.front(speed);
              console.log("naar voren");
              };
          if(key.name == "y"){
            client.front(10);
              console.log("Yeet");
              };
          if(key.name == "s"){
            client.back(speed);
              console.log("achter");
            };
          if(key.name == "a"){
            client.left(speed);
              console.log("links");
            };
          if(key.name == "d"){
            client.right(speed);
              console.log("rechts");
            };
          if(key.name == "x"){
            ref.emergency = true;
              console.log("hover");
            };
          if(key.name == "f"){
            client.animate('yawShake', 40);
              console.log("shake");
            };
          if(key.name == "b"){
            client.animateLeds('blinkRed', 5, 2);
              console.log("blink");
            };
          if(key.name == "q"){
            client.up(1);
              console.log("omhoog");
            };
          if(key.name == "c"){
              client.stop();
               console.log("calibrate");
            };
          if(key.name == "e"){
              client.down(1);
                console.log("omlaag");
            };


            process.stdin.setRawMode(manualcontrol);
            process.stdin.resume();
          }
        })

};

function callback()
{
manualcontrol = false;
timer = timerAddMS;


setTimeout(function(){
waypointArray = [];
console.log("\n\nthe drone is now on the ground.\n u can now proceed with new commands");
Menu();
},timer);
}

function ClearInput()
{
  if(readline.input.value != "")
  {
    readline.input.value = "";
  }
}
