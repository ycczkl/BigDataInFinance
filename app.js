var csv = require("csv"),
  fs = require("fs"),
  path = require("path");

var count = 0;
var id = 0;
var arr = [];
var used = new Array(26);
for (var i = 0; i < used.length; ++i) {
  used[i] = false;
  arr[i] = 0;
}

function returnIndex(time) {
  var timeArr = time.split(':').map(Number);
  if (timeArr[0] < 9 || timeArr[0] >= 16) {
    return -1;
  }
  if (timeArr[0] - 9 === 0) {
    if (timeArr[1] < 30) {
      return -1;
    } else if (timeArr[1] >= 30 && timeArr[1] < 45) {
      return 0;
    } else {
      return 1;
    }
  } else {
    var tmp1 = timeArr[0] - 10;
    var tmp2 = timeArr[1];
    return tmp1 * 4 + 1 + parseInt(tmp2 / 15, 10) + 1;
  }
}

function getTime(index) {
  var hour = parseInt(index * 15 / 60, 10) + 9;
  var min = index * 15 % 60 + 30;
  if (min == 60) {
    hour += 1;
    min = "00";
  } else if (min == 75) {
    hour += 1;
    min = 15;
  }
  return hour + ':' + min
}
csv.fromPath("SPY_May_2012.csv", {
    headers: true
  })
  .transform(function(row) {
    if (row.Type == "Trade" && returnIndex(row["Time[G]"]) !== -1 && !isNaN(parseInt(row["Volume"]))) {
      console.log(row["Volume"]);
      var dateArr = row["Date[G]"].split('-').map(Number);
      var index = parseInt(returnIndex(row["Time[G]"]), 10);
      if (dateArr[0] > 0 && dateArr[0] <= 20) {
        arr[index] = parseInt(arr[index], 10) + parseInt(row["Volume"], 10);
      } else if (dateArr[0] == 21) {
        if (!used[index]) {
          var excu = row["Price"];
          var avePrice = parseInt(arr[index]/20, 10);
          var timeInterval = getTime(index);
          used[index] = true;
          return {
            time: timeInterval,
            ave_price: avePrice,
            excute_price: excu
          };
        }
      }
      else {
       process.exit();
      }
    }

  })
  .pipe(csv.createWriteStream({
    headers: true
  }))
  .pipe(fs.createWriteStream("outputs.csv", {
    encoding: "utf8"
  }));
