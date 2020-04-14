var arDrone = require('ar-drone');
var keypress = require('keypress');
var client = arDrone.createClient();

let maxAltitide = 1000;

animate();
function animate()
{
  console.log("ja");
  client.takeoff();
  client.config('control:altitude_max',maxAltitide);
  client
    .after(0, function() {
      console.log("het werkt");
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

  process.stdin.setRawMode(true);
  process.stdin.resume();
