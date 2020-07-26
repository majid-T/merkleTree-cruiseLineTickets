const ethers = require("ethers");
const fs = require("fs");
let outPut = [];

let tickets01 = fs
  .readFileSync("tickets.txt", "utf-8")
  .split("\n")
  .map((a) => a.replace(/r/, "").trim())
  .filter((a) => a.length > 0);

tickets01.map((item) => {
  let itemAsList = item.split(",");
  let concatList = [];
  itemAsList.map((val) => {
    concatList.push(ethers.utils.toUtf8Bytes(val));
  });
  let concat = ethers.utils.concat(concatList);
  const ticketHash = ethers.utils.keccak256(concat);

  outPut.push(ticketHash);
});

var file = fs.createWriteStream("ticket-hashes.txt");
file.on("error", function (err) {
  console.log(err);
});
outPut.forEach(function (v) {
  file.write(v + "\n");
});
file.end();
