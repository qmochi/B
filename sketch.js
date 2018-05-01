let h1, div, canvas;
let container, container3d;
let cWidth;
let button, slider, satSlider, briSlider, dropdown, checkbox, randomButton;
let sliderWidth;
let hue;
let x = 0;
let y = 0;
let likes = 0;
let words = ["smashed", "hit", "clicc'd", "mashed", "slammed", "bashed", "beat", "destroyed", "fisted", "tapped"];
let letters = ["B", "Ｂ", "b", "ｂ", "🅱", "β", "ɓ", "ᛒ"];
let Bx, By;
let rnh;
let secret;
let img, layer, textLayer, cube;

function setup() {
  canvasSize();
  
  h1 = createElement("h1", "wus poppin 🐝"); // HTML element, contents of tag
  
  container = createDiv("");
  container.addClass("container");
  
  // create canvases
  canvas = createCanvas(cWidth, cWidth);
  canvas.addClass("canvasStyle");
  canvas.parent(container);
  
  container3d
  layer = createGraphics(width, height, WEBGL);
  textLayer = createGraphics(width, height);
  
  colorMode(HSB);
  layer.colorMode(HSB);
  textLayer.colorMode(HSB);
  
  // create sliders box
  div = createDiv("");
  div.addClass("uiStyle"); // can also go div.style(css style, value);
  div.parent(container);

    // dropdown menu
    dropdown = createSelect(); // dropdown menu
    for (let i=0; i<letters.length; i++) {
      dropdown.option(letters[i]);
    }
    dropdown.value(random(letters));

    // sliders
    slider = createSlider(0, 359, random(359)); // minimum, maximum, starting value
    satSlider = createSlider(1, 100, random(100));
    briSlider = createSlider(0, 100, random(100));
    sliderSize();

    // checkbox
    checkbox = createCheckbox(" dimensional break", false);
    checkbox.changed(check);
  
    // randomize button
    randomButton = createButton("make a random B");
    randomButton.size(160,40);
    randomButton.mousePressed(randomize);

    div.child(createP("Letter:"));
    div.child(dropdown);

    div.child(createP("🅱olor:"));
    div.child(slider);

    div.child(createP("🅱aturation:"));
    div.child(satSlider);

    div.child(createP("🅱rightness:"));
    div.child(briSlider);
  
    div.child(createP(""));
    div.child(randomButton);
    div.child(createP(""));

    div.child(createP(""));
    div.child(checkbox);
    div.child(createP(""));
  
  // smash dat like button
  likeText = createElement("h2", "smash dat like button if u 🅱oolin");
  likeText.addClass("headline");

  button = createButton("--> mf like button <--");
    button.size(200,50); // size of the button
    button.mousePressed(smashLike);
  createP("");

  // footer
  createElement("hr");
  createA("https://qmochi.github.io/myHTML/works.html", "Clicc here for more fun web thingies"); // URL link, text
  
  createP("");
  let nicoIcon = createImg("nico1.png");
  let anchor = createA("https://qmochi.github.io/myHTML/works.html", "");
  nicoIcon.parent(anchor)
  
  footer = createElement("h6", "© Corbs 2018");
}

function draw() {
  if (!secret) {
    background(slider.value(), satSlider.value(), briSlider.value());

    fill(0,0,100);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(width);
    B = text(dropdown.value(), Bx, By);
    
    Bx = width/2 + x;
    By = height/2 + y;

    if (slider.value() == 359  && satSlider.value() == 100 && briSlider.value() == 100 && dropdown.value() == letters[0]) {
      rnh = true;
    } else rnh = false;

    if (rnh) {  // shaking letter effect
      let maxWig = (width * 0.05);
      let rand = random(maxWig);
      x += random(-rand,rand);
      y += random(-rand,rand);
    } else {
      x = 0;
      y = 0;
    }
  } else { // 3D spinning box
    // text texture
    textLayer.background(slider.value(), satSlider.value(), briSlider.value());
    textLayer.textAlign(CENTER, CENTER);
    textLayer.textStyle(BOLD);
    textLayer.textSize(width);
    textLayer.fill(0,0,100);
    textLayer.text(dropdown.value(), layer.width/2, layer.height/2);
    
    // cube
    layer.background(frameCount % 360, 50, 100);
    layer.box(width/2, width/2, width/2);
    layer.rotateX(0.01);
    layer.rotateZ(0.01);
    layer.texture(textLayer);
    
    image(layer,0,0);
  }
}

function smashLike() {
  likes++;
  if (likes == 1) {
    likeText.html("u " + random(words) + " dat mf like button " + likes + " time!!!!!");
  } else if (likes == 69) {
      likeText.html("u " + random(words) + " dat mf like button " + likes + " timez!!!!! NICE!!!!!!!!!!!!!!!!!!");
    } else likeText.html("u " + random(words) + " dat mf like button " + likes + " timez!!!!!");
}

function canvasSize() {
  cWidth = (windowWidth * 0.4);
}

function sliderSize() {
  sliderWidth = (width*0.75);
  slider.size(sliderWidth);
  satSlider.size(sliderWidth);
  briSlider.size(sliderWidth);
}

function windowResized() { 
  resizeCanvas(cWidth, cWidth);
  canvasSize();
  sliderSize();
}

function check() {
  if (checkbox.checked()) {
    secret = true;
  } else {
    secret = false;
  }
}

function randomize() {
  dropdown.value(random(letters));
  slider.value(random(359));
  satSlider.value(random(100));
  briSlider.value(random(100));
}
