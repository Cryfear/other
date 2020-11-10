function chessBoard(height, width) {
  let sharpStart = false;

  let chessBoardArr = [];

  for(let arrHeight = 0; arrHeight < height; arrHeight++) {
    let string = sharpStart ? '#' : ' ';

    let switchMode = sharpStart;

    // начинается с 1, т.к. в string изначально есть символ
    for(let line = 1; line < width; line++, switchMode = !switchMode) {
      if(switchMode) {
        string += ' ';
      }
      else {
        string += '#';
      }
    }

    chessBoardArr.push(string);
    sharpStart = !sharpStart;
  }

  return chessBoardArr;
}

// console.log(chessBoard(8, 8));