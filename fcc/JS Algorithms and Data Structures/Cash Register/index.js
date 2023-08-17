function checkCashRegister(price, cash, cid) {
  let res = { status: "INSUFFICIENT_FUNDS", change: [] };
  const worth = {
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };

  let change = cash - price;
  let sumCid = cid.reduce((acc, x) => acc + x[1], 0).toFixed(2);

  if (change > sumCid) return res;
  if (change == sumCid) {
    res.status = "CLOSED";
    res.change = cid;
    return res;
  }

  for (let i = 0; i < Object.keys(worth).length; i++) {
    let currBill = Object.keys(worth)[i];
    let currWorth = worth[currBill];
    let currCid = cid.find((x) => x[0] == currBill);
    if (change / currWorth > 1 && currCid[1] > 0) {
      let p = 0;
      while (change > 0 && currCid[1] > 0 && change / currWorth >= 1) {
        change -= currWorth;
        change = change.toFixed(2);
        currCid[1] -= currWorth;
        p += currWorth;
      }
      res.change.push([currBill, p]);
    }
  }

  if (change > 0) {
    res.change = [];
    return res;
  }
  res.status = "OPEN";

  return res;
}

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
); // prints {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
); // prints { status: 'INSUFFICIENT_FUNDS', change: [] }

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
); // prints {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
