//packages nodig voor de drone
var arDrone = require('ar-drone');
var keypress = require('keypress');

//Voor connectie met de drone
var client = arDrone.createClient();

//variable
let maxAltitide = 1000;
let delay = 1000;
let speed = 1;

//Zorgt voor updates die kijkt naar de acties die de drone moet uitvoeren en naar de user input
animate();
function animate()
{
  //opstijgen
  client.takeoff();
  client.config('control:altitude_max',maxAltitide);
  client
    .after(0, function() {
      console.log("console.log(\n Dit is wat je moet weten over het bestuuren van de drone\n De blauwe kant is de voor kant\n Dit zijn de bestuuringen van de drone:\n- W = naar voren\n- S= naar achter\n- A= naar rechts \n- D= naar links\n- Q= omhoog\n- E= omlaag\n- C= stoppen en calibreren\n- F= laten draaien\n- Y= heel hard naar voren laten vliegen\n- L= landen\n- T= opsteigen\n\ndit was alles wat je moet weten om de drone te bestuuren succes :D);");
      this.stop();
      //client.calibrate(0);
    })
    .after(2000, function() {
      this.stop();
    })
    .after(3000, function() {
      this.stop();
    })
  }

  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  // listen for the "keypress" event
  // User input word hier opgenomen 
  process.stdin.on('keypress', function (ch, key) {
    //console.log('got "keypress"', key);
    if(key.name == "t"){
      client.takeoff();
    };
    if(key.name == "l"){
      client.land();
        console.log("Land");
      };
      if(key.name == "w"){
        client.front(0.2);
          console.log("naar voren");
        };
        if(key.name == "y"){
          client.front(10);
            console.log("Yeet");
          };
        if(key.name == "s"){
          client.back(0.2);
            console.log("achter");
          };
          if(key.name == "a"){
            client.left(0.2);
              console.log("links");
            };
            if(key.name == "d"){
              client.right(0.2);
                console.log("rechts");
              };
              if(key.name == "x"){
                client.stop();
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
                    if(key.name == "b"){
                      client.animateLeds('blinkRed', 5, 2);
                        console.log("blink");
                      };
                  /*
                if(key.name == "ArrowLeft"){
                  client.counterclockwise(0.2);
                    console.log("hover");
                  };
                if(key.name == "ArrowRight"){
                  client.clockwise(0.2);
                    console.log("hover");
                  };*/
                if(key.name == "q"){
                  client.up(1);
                    console.log("omhoog");
                  };
                  if(key.name == "c"){
                    client.calibrate();
                      console.log("calibrate");
                    };
                  if(key.name == "e"){
                    client.down(1);
                      console.log("omlaag");
                    };
  });

  //Ook nodig voor het oppakken van de keys
  process.stdin.setRawMode(true);
  process.stdin.resume();
