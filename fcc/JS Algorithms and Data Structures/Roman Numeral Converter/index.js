function convertToRoman(num) {
  const roman = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"].reverse();
  const decimal = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000].reverse();
  let res = "";
  while (num > 0) {
    let ind = decimal.findIndex((x) => num / x >= 1);
    while (num / decimal[ind] >= 1) {
      num -= decimal[ind];
      res += roman[ind];
    }
  }
  return res;
}

console.log(convertToRoman(1)); // prints I
console.log(convertToRoman(2)); // prints II
console.log(convertToRoman(3)); // prints III
console.log(convertToRoman(45)); // prints VX
console.log(convertToRoman(97)); // prints XCVII
console.log(convertToRoman(99)); // prints XCIX
console.log(convertToRoman(400)); // prints CD
console.log(convertToRoman(600)); // prints DC
console.log(convertToRoman(1023)); // prints MXXIII
console.log(convertToRoman(3999)); // prints MMMCMXCIX
