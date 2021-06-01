class Bird extends BaseClass {
  //construction of bird using matter.js
  constructor(xInput, yInput) {
    super(xInput, yInput, 50, 50);
    this.image = loadImage("images/bird.png");

    this.trajectory = [];//empty array which will store position of bird as long as it flying
    this.smokeImage = loadImage("images/smoke.png");
  

    /* //sample array
     var sample = [65, 324436, "AVANI", [555, 777], 34, 980, "uttara"];

     //push(): Add items to the end of an array
     sample.push(999);
     
     //pop(): Remove an item from the end of an array
     sample.pop()

     //unshift(): Add items to the beginning of an array
     sample.unshift(999);

     //shift(): Remove an item from the beginning of an array
     sample.shift();

     console.log(sample);
     */
  
  }

};