let h1;
let canvas;
let div;
let button;
let slider;
let satSlider;
let briSlider;
let sliderWidth;
let maxWig = 16;
let rand;
let dropdown;
let checkbox;
let hue;
let x = 0;
let y = 0;
let likes = 0;
let words = ["smashed", "hit", "clicc'd", "mashed", "slammed", "bashed", "beat", "destroyed", "fisted", "tapped"];
let letters = ["B", "Ｂ", "b", "ｂ", "🅱", "β", "ɓ", "ᛒ"];
let Bx, By;
let rnh;
let secret;
let img;
let layer;
let textLayer;

function setup() {
  h1 = createElement("h1", "wus poppin 🐝"); // HTML element, contents of tag
  
  canvas = createCanvas(windowWidth * 0.6, windowWidth * 0.6);
  canvas.addClass("canvasStyle");
  
  layer = createGraphics(width, height, WEBGL);
  textLayer = createGraphics(width, height);
  
  colorMode(HSB);
  layer.colorMode(HSB);
  textLayer.colorMode(HSB);
  
  div = createDiv("");
  div.addClass("uiStyle"); // can also go div.style(css style, value);
  
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
  checkbox = createCheckbox(" cool button", false);
  checkbox.changed(check);
  
  div.child(createP("Letter:"));
  div.child(dropdown);
  
  div.child(createP("🅱olor:"));
  div.child(slider);
  
  div.child(createP("🅱aturation:"));
  div.child(satSlider);
  
  div.child(createP("🅱rightness:"));
  div.child(briSlider);
  
  div.child(createP(""));
  div.child(checkbox);
  
  // smash dat like button
  likeText = createElement("h2", "smash dat like button if u 🅱oolin");
  likeText.addClass("headline");
  
  // button
  button = createButton("--> mf like button <--");
    button.size(200,50); // size of the button
    button.mousePressed(smashLike);
  createP("");

  // footer
  createElement("hr");
  createA("https://alpha.editor.p5js.org/full/BkELNWC_M", "Choose Your Waifu"); // URL link, text
  
  createP("");
  let nicoIcon = createImg("nico1.png");
  let anchor = createA("https://alpha.editor.p5js.org/full/BkELNWC_M", "");
  nicoIcon.parent(anchor)
}

function draw() {
  if (!secret) {
    background(slider.value(), satSlider.value(), briSlider.value());

    fill(0,0,100);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(width);
    B = text(dropdown.value(), Bx, By);

    if (slider.value() == 359  && satSlider.value() == 100 && briSlider.value() == 100 && dropdown.value() == letters[0]) {
      rnh = true;
    } else rnh = false;

    if (rnh) {
      rand = random(maxWig);
      x += random(-rand,rand);
      y += random(-rand,rand);
      Bx = width/2 + x;
      By = height/2 + y;
    } else {
      Bx = width/2;
      By = height/2;
    }
  } else { // 3D spinning box
    // text
    textLayer.background(slider.value(), satSlider.value(), briSlider.value());
    textLayer.textAlign(CENTER, CENTER);
    textLayer.textStyle(BOLD);
    textLayer.textSize(width);
    textLayer.fill(0,0,100);
    textLayer.text(dropdown.value(), width/2, height/2);
    
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

function windowResized() {
  resizeCanvas(windowWidth * 0.6, windowWidth * 0.6);
  sliderSize();
}

function sliderSize() {
  sliderWidth = (width*0.9);
  
  slider.size(sliderWidth);
  satSlider.size(sliderWidth);
  briSlider.size(sliderWidth);
}

function check() {
  if (checkbox.checked()) {
    secret = true;
  } else {
    secret = false;
  }
}