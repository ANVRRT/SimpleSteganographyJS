var principalImg = null;
var hiddingImg = null;
var imgcanvas;
window.onload = function() {

    imgcanvas = document.getElementById("fimage");
}

function PrepareHiddingPixel(value){
  return (parseInt(value/16)*16);
}

function PreparePrincipalImg(id){
  for(var pixel of principalImg.values()){
    pixel.setRed(PrepareHiddingPixel(pixel.getRed()));
    pixel.setGreen(PrepareHiddingPixel(pixel.getGreen()));
    pixel.setBlue(PrepareHiddingPixel(pixel.getBlue()));
  }
  
}

function PrepareHiddingImg(){
  for(var pixel of hiddingImg.values()){
    pixel.setRed(pixel.getRed()/16);
    pixel.setGreen(pixel.getGreen()/16);
    pixel.setBlue(pixel.getBlue()/16);
  }
}

function Merge(){
  for(var pixel of principalImg.values()){
    
    var hiddingPixel = hiddingImg.getPixel(pixel.getX(),pixel.getY());
    pixel.setRed(pixel.getRed() + hiddingPixel.getRed());
    pixel.setGreen(pixel.getGreen() + hiddingPixel.getGreen());
    pixel.setBlue(pixel.getBlue() + hiddingPixel.getBlue());
  }
  principalImg.drawTo(imgcanvas);
}

function HiddingProcess(){
  PreparePrincipalImg();
  PrepareHiddingImg();
  Merge();
}

function UnHiddingProcess(){
  
  for(var pixel of principalImg.values()){
    pixel.setRed((pixel.getRed() % 16)*16);
    pixel.setGreen((pixel.getGreen() % 16)*16);
    pixel.setBlue((pixel.getBlue() % 16)*16);
  }
  principalImg.drawTo(imgcanvas);
}

function Upload(id){
  if(id == "principalImg"){
    principalImg = new SimpleImage(document.getElementById(id));
  }
  if(id == "hideImg"){
    hiddingImg = new SimpleImage(document.getElementById(id));
  }
}

function download(){
  var img = imgcanvas.toDataURL("image/png");
  document.write('<img src="'+img+'"/>');
}