class Line {
  constructor(screen, x, y) {
    this.width = 1;
    this.height = Math.floor(Math.random() * screen.height);
    this.x = x;
    this.y = y;
    this.color = "white";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let running = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function race(slow) {
  if (!running) {
    visualiseSelectionSort(
      document.getElementById("compareSelectionSort"),
      slow
    );
    visualiseBubbleSort(document.getElementById("compareBubbleSort"), slow);
    visualiseRadixSort(document.getElementById("compareRadixSort"));
    running = true;
  }
}

async function visualiseBubbleSort(screen, slow) {
  const ctx = screen.getContext("2d");
  let lineArray = [];

  for (let i = 0; i < screen.width; i++) {
    lineArray.push(new Line(screen, i, 0));
  }

  let sorted = false;
  while (!sorted) {
    sorted = true;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, screen.width, screen.height);

    for (let i = 0; i < lineArray.length; i++) {
      lineArray[i].draw(ctx);
    }

    for (let i = lineArray.length - 1; i > 0; i--) {
      if (slow) {
        await sleep(1);
      }

      if (lineArray[i].height < lineArray[i - 1].height) {
        sorted = false;
        [lineArray[i].height, lineArray[i - 1].height] = [
          lineArray[i - 1].height,
          lineArray[i].height,
        ];
      }
    }
    if (!slow) {
      await sleep(10);
    }
  }
}

async function visualiseSelectionSort(screen, slow) {
  const ctx = screen.getContext("2d");
  let lineArray = [];

  for (let i = 0; i < screen.width; i++) {
    lineArray.push(new Line(screen, i, 0));
  }

  for (let i = 0; i < lineArray.length; i++) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, screen.width, screen.height);

    let maxIndex = i;

    for (let j = 0; j < lineArray.length; j++) {
      lineArray[j].draw(ctx);
    }

    for (let j = 0; j < lineArray.length; j++) {
      if (j != 0) {
        lineArray[j - 1].draw(ctx);
      }

      //lineArray[j].color = "red";

      lineArray[j].draw(ctx);
      lineArray[j].color = "white";
      if (slow) {
        await sleep(1);
      }

      if (lineArray[maxIndex].height > lineArray[j].height && i < j) {
        maxIndex = j;
      }
    }

    [lineArray[maxIndex].height, lineArray[i].height] = [
      lineArray[i].height,
      lineArray[maxIndex].height,
    ];

    if (!slow) {
      await sleep(10);
    }
  }
  running = false;
}

function maxNumber(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

async function countingSort(arr, d) {
  let helpingArr = [];

  for (let i = 0; i < arr.length; i++) {
    helpingArr[i] = Math.floor((arr[i].height / Math.pow(10, d)) % 10);
  }

  let sortedArr = [];
  let p_length = maxNumber(helpingArr) + 1;
  let p = [];
  let currentIndex = 0;
  for (let i = 0; i < p_length; i++) {
    p[i] = 0;
    await sleep(10);
  }
  await sleep(10);
  for (let i = 0; i < helpingArr.length; i++) {
    p[helpingArr[i]]++;
  }
  await sleep(10);

  for (let i = 0; i < p_length; i++) {
    currentIndex += p[i];
    p[i] = currentIndex;
    await sleep(1);
  }
  await sleep(10);
  for (let i = helpingArr.length - 1; i >= 0; i--) {
    sortedArr[p[helpingArr[i]] - 1] = arr[i];
    p[helpingArr[i]]--;
    if (i % 3 == 0) {
      await sleep(1);
    }
  }
  await sleep(10);
  for (let i = 0; i < sortedArr.length; i++) {
    sortedArr[i].x = i;
  }

  return sortedArr;
}

async function visualiseRadixSort(screen) {
  const ctx = screen.getContext("2d");
  let lineArray = [];

  for (let i = 0; i < screen.width; i++) {
    lineArray.push(new Line(screen, i, 0));
  }
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, screen.width, screen.height);

  for (let j = 0; j < lineArray.length; j++) {
    lineArray[j].draw(ctx);
  }

  for (let i = 0; i <= 2; i++) {
    lineArray = await countingSort(lineArray, i);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, screen.width, screen.height);
    for (let j = 0; j < lineArray.length; j++) {
      lineArray[j].draw(ctx);
    }
  }
  await sleep(10);
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, screen.width, screen.height);
  for (let j = 0; j < lineArray.length; j++) {
    lineArray[j].draw(ctx);
  }
}
