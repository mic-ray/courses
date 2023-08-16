function telephoneCheck(str) {
  var res = false;
  var regEx = /^1? ?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/g;
  var paranthesesCount = str.match(/[\(\)]/g);
  if (regEx.test(str) && (paranthesesCount ? paranthesesCount.length % 2 == 0 : true)) res = true;
  return res;
}

console.log(telephoneCheck("555-555-5555")); // prints true
console.log(telephoneCheck("(555)555-5555")); // prints true
console.log(telephoneCheck("1(555)555-5555")); // prints true
console.log(telephoneCheck("5555555")); // prints false
console.log(telephoneCheck("123**&!!asdf#")); // prints false
console.log(telephoneCheck("2 (757) 622-7382")); // prints false
