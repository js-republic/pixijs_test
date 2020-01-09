import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  backgroundColor: 0xffffff
});
document.body.appendChild(app.view);

class Line extends PIXI.Graphics {
  constructor(points, lineSize, lineColor) {
    super();

    var s = (this.lineWidth = lineSize || 5);
    var c = (this.lineColor = lineColor || "0x000000");

    this.points = points;

    this.lineStyle(s, c);

    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }

  updatePoints(p) {
    var points = (this.points = p.map(
      (val, index) => val || this.points[index]
    ));

    var s = this.lineWidth,
      c = this.lineColor;

    this.clear();
    this.lineStyle(s, c);
    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }
}

const firstPoint = [300, 300];
const secondPoint = [280, 310];
const thirdPoint = [150, 230];
const fourthPoint = [150, 100];
const fifthPoint = [280, 20];
const sixthPoint = [410, 100];
const seventhPoint = [410, 200];

const lines = [
  new Line(firstPoint.concat(secondPoint).flat()),
  new Line(secondPoint.concat(thirdPoint).flat()),
  new Line(thirdPoint.concat(fourthPoint).flat()),
  new Line(fourthPoint.concat(fifthPoint).flat()),
  new Line(fifthPoint.concat(sixthPoint).flat()),
  new Line(sixthPoint.concat(seventhPoint).flat())
];

setup();

function setup() {
  const JS = new PIXI.Text("JS", {
    font: "Montserrat",
    align: "center",
    fontSize: 130,
    fontWeight: "bold"
  });

  JS.position.set(200, 80);

  app.stage.addChild(JS);

  setupDrawing();
}

function setupDrawing() {
  const interval = setInterval(() => {
    if (lines.length > 0) {
      app.stage.addChild(lines.shift());
    } else {
      clearInterval(interval);
      setupRepublic();
    }
  }, 200);
}

let textLength, textString, style, displayText, count;

function setupRepublic() {
  //Create a javascript string object with input text
  textString = String("REPUBLIC");

  //Get the string length
  textLength = textString.length;

  style = {
    font: "Montserrat",
    align: "center",
    fontWeight: "bold"
  };

  displayText = new PIXI.Text("", style);
  displayText.anchor.set(1, 0);
  displayText.position.set(420, 230);

  count = 0;
  animateRepublic();
}

function animateRepublic() {
  //Update display text length
  let length = (textLength * count) / 60;

  //Grab a a substring of the input text beginning with the first character
  let string = textString.substr(0, length);

  //Set the text of displayText object equal to the substring above
  displayText.text = string;

  //Add the displayText to the stage and render
  app.stage.addChild(displayText);
  app.renderer.render(app.stage);

  requestAnimationFrame(animateRepublic);

  count++;
}
