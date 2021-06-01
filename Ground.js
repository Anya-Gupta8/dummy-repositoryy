/*
class file is created with the name ground it has the construnttor
 that shows the x,y,width and height. isStatic is used 

*/
class Ground {
  constructor(xInput, yInput, widthInput, heightInput) {
    //construction of ground using matter.js
    var options = {
      isStatic: true,
    };
    this.width = widthInput;
    this.height = heightInput;
    this.body = Bodies.rectangle(
      xInput,
      yInput,
      widthInput,
      heightInput,
      options
    );
    World.add(userWorld, this.body);
    console.log(this.body);
  }
  display() {
    //display of ground using matter.js
    var pos = this.body.position;
    rectMode(CENTER);
    fill("brown");
    rect(pos.x, pos.y, this.width, this.height);
  }
}
