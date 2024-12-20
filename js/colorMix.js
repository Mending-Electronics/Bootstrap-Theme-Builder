function mixTwoColor(color1, color2, percent) {
    let red1 = parseInt(color1[1] + color1[2], 16);
    let green1 = parseInt(color1[3] + color1[4], 16);
    let blue1 = parseInt(color1[5] + color1[6], 16);
  
    let red2 = parseInt(color2[1] + color2[2], 16);
    let green2 = parseInt(color2[3] + color2[4], 16);
    let blue2 = parseInt(color2[5] + color2[6], 16);
  
    let red = Math.round(mix(red1, red2, percent));
    let green = Math.round(mix(green1, green2, percent));
    let blue = Math.round(mix(blue1, blue2, percent));
  
    return generateHex(red, green, blue);
  }
  
  function generateHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    // to address problem mentioned by Alexis Wilke:
    while (r.length < 2) { r = "0" + r; }
    while (g.length < 2) { g = "0" + g; }
    while (b.length < 2) { b = "0" + b; }
  
    return "#" + r + g + b;
  }
  
  function mix(start, end, percent) {
      return start + ((percent) * (end - start));
  }