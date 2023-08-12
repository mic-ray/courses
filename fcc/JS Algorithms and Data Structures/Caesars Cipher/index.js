function rot13(str) {
  str = str.replace(/\w/g, (m) => {
    if (m.charCodeAt(0) - 13 < 65) {
      const dif = 65 - (m.charCodeAt(0) - 13);
      const code = 91 - dif;
      return String.fromCharCode(code);
    }
    return String.fromCharCode(m.charCodeAt(0) - 13);
  });
  return str;
}

console.log(rot13("SERR PBQR PNZC")); // prints FREE CODE CAMP
console.log(rot13("SERR CVMMN!")); // prints FREE PIZZA!
console.log(rot13("SERR YBIR?")); // prints FREE LOVE?
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")); // prints THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
