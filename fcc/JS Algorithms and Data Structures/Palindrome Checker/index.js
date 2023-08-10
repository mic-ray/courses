function palindrome(str) {
  // To turn word into same case and remove  all non-alphanumeric characters
  str = str.toLowerCase().replace(/\W|_/g, "");
  if (str.length < 2) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return palindrome(str.substr(1, str.length - 2));
}

console.log(palindrome("eye")); // prints true
console.log(palindrome("_eye")); // prints true
console.log(palindrome("race car")); // prints true
console.log(palindrome("never odd or even")); // prints true
console.log(palindrome("0_0 (: /- :) 0-0")); // prints true
console.log(palindrome("eyes")); // prints false
console.log(palindrome("palindrome")); // prints false
console.log(palindrome("five|_/|four")); // prints false

// For more info see: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker
