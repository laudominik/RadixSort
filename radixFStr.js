function max(str) {
  let maxChar = str[0];
  for (let i = 1; i < str.length; i++) {
    if (str[i] > maxChar) {
      maxChar = str[i];
    }
  }
  return maxChar;
}

function transformToNumbers(str) {
  dict = {
    0: 0,
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };
  numberArr = [];
  for (let i = 0; i < str.length; i++) {
    numberArr.push(dict[str[i]]);
  }
  return numberArr;
}

function transformToString(arr) {
  dict = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  outputWord = [];
  for (let i = 0; i < arr.length; i++) {
    outputWord.push(dict[arr[i] - 1]);
  }
  return outputWord.join("");
}

function sd(strArr) {
  let maxLen = strArr[0].length;
  for (let str of strArr) {
    if (str.length > maxLen) {
      maxLen = str.length;
    }
  }
  return maxLen;
}

function d() {}

function counting(arr, d) {
  let helpingArr = [];
  let sdOut = sd(arr);
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    if (word.length != sdOut) {
      for (let i = 0; i < sdOut - word.length; i++) {
        word += "0";
      }
    }
    arr[i] = word;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][arr[i].length - 1 - d]) {
      helpingArr[i] = arr[i][arr[i].length - 1 - d];
    } else {
      helpingArr[i] = 0;
    }
  }

  helpingArr = transformToNumbers(helpingArr);
  let sortedArr = [];
  let p_length = max(helpingArr) + 1;
  let p = [];
  let currentIndex = 0;
  for (let i = 0; i < p_length; i++) {
    p[i] = 0;
  }
  for (let i = 0; i < helpingArr.length; i++) {
    p[helpingArr[i]]++;
  }
  for (let i = 0; i < p_length; i++) {
    currentIndex += p[i];
    p[i] = currentIndex;
  }

  for (let i = helpingArr.length - 1; i >= 0; i--) {
    sortedArr[p[helpingArr[i]] - 1] = arr[i];
    p[helpingArr[i]]--;
  }

  return sortedArr;
}

function radix(arr) {
  for (let i = 0; i <= sd(arr); i++) {
    arr = counting(arr, i);
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i]
      .split("")
      .filter((char) => char != "0")
      .join("");
  }
  return arr;
}

function runStringRadix() {
  let words = document.getElementById("wordBox").innerHTML;
  words = radix(
    words.split(" ").map((word) => word.trim().toLocaleLowerCase())
  );
  document.getElementById("wordBox").innerHTML = words.join(" ");
}

function addWord() {
  let inputWord = document.getElementById("newWord").value;
  document.getElementById("wordBox").innerHTML += ` ${inputWord}`;
}

//console.log(radix(["zxba", "zxce", "hjki", "kek", "ab", "abg"]));
