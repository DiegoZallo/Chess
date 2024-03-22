let board = [
  'WT', 'WH', 'WA', 'WQ', 'WK', 'WA', 'WH', 'WT',
  'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 
  'BT', 'BH', 'BA', 'BK', 'BQ', 'BA', 'BH', 'BT'
];
let rows = {
  row1: [0,1,2,3,4,5,6,7],
  row2: [8,9,10,11,12,13,14,15],
  row3: [16,17,18,19,20,21,22,23],
  row4: [24,25,26,27,28,29,30,31],
  row5: [32,33,34,35,36,37,38,39],
  row6: [40,41,42,43,44,45,46,47],
  row7: [48,49,50,51,52,53,54,55],
  row8: [56,57,58,59,60,61,62,63]
};
let cols = {
  col1: [0,8,16,24,32,40,48,56],
  col2: [1,9,17,25,33,41,49,57],
  col3: [2,10,18,26,34,42,50,58],
  col4: [3,11,19,27,35,43,51,59],
  col5: [4,12,20,28,36,44,52,60],
  col6: [5,13,21,29,37,45,53,61],
  col7: [6,14,22,30,38,46,54,62],
  col8: [7,15,23,31,39,47,55,63]
}
let currentPlayer = 'W';
let gameActive = true;
let firstClick = true;
var selectedCell = "";
var targetCell = "";
var makeMove = true;
// Set board color
var cell = document.querySelectorAll('.cell');
var change = true;
var count = 0;
for (var i = 0; i < cell.length; i++) {
  if(count>7){
    change = !change;
    count=0;
  }
  if(change){
    cell[i].style.backgroundColor = 'grey';
    change=false;
  }else{
    change=true;
  }
  count++;
}
/////////////////////////////////////////////////////////////////////////////////////

// Handle cell click
function handleCellClick(index) {
  if(board[index][0]===currentPlayer && firstClick){
    selectedCell = "cell" + index;
    changeStyle(selectedCell, "2px solid #f5e615", "bold");
    firstClick = false;
  } else 
    if(!firstClick) {
      targetCell = "cell"+index;
      //dactivate selected cell
      if (selectedCell === targetCell || board[index][0]===currentPlayer){
        changeStyle(selectedCell, "1px solid #ccc", "normal")
        firstClick=true;
      } else{
        //Moves the piece to destination, if applies   
        checkMove(index);
        changeStyle(selectedCell, "1px solid #ccc", "normal");
        firstClick = true;
      }
    }
}


// Highlight selected piece
function changeStyle(cellId, bwith, font) {
  var divElement = document.getElementById(cellId);   
  // Change border
  divElement.style.border = bwith; 
  // Make text bold
  divElement.style.fontWeight = font;
}

//Make piece movement
function checkMove(index){
  var selected = Number(selectedCell.replace("cell", ''));
  var target = Number(targetCell.replace("cell", ''));
  console.log('Selected: '+selected+'   Target: '+target);
  console.log('board selected: '+board[selected]);
  switch (board[selected]) {
    case "WP":
        // white Peon Moves
        console.log("white peon moves");
        whitePeonMoves(selected, target);
        break;
    case "BP":
        // Black Peon Moves
        console.log("Black peon moves");
        blackPeonMoves(selected, target);
        break;
    case "WT":
    case "BT":
        // TOWER Moves
        console.log("Tower moves");
        towerMoves(selected, target);
        break;
    case "WA":
    case "BA":
        // ALFIL Moves
        console.log("Alfil moves");
        alfilMoves(selected, target);
        break;
    case "WH":
    case "BH":
        //HORSE Moves
        console.log('Horse moves');
        horseMoves(selected, target);  
        break; 
    case "WQ":
    case "BQ":
        //QUEEN Moves
        console.log('Queen moves');
        queenMoves(selected, target);
        break;
    case "WK":
    case "BK":
        //KING Moves
        console.log('King moves');
        kingMoves(selected, target);
        break;
    default:
  }
  console.log(board) //test text
}

// Moves WHITE PEON
function whitePeonMoves(selected, target){
  //If peon is located in the starting area
  if(rows.row2.includes(selected) && board[target]==='' && (target === (selected+8) || target === (selected+16))){
    //is the target a correct location, is it blank?
        confirm(selected, target);
  }else{ //not starting area
    //is the target a correct location, is it blank?
    if(target === (selected+8)){
      if(board[target]===''){
        confirm(selected, target);
      }
    }else{
      //here Peon will claim/eat another piece
      if(!(board[target]==='')){
        var selRowName = '';
        var tgtRowName = '';
        for(var i=2;i<8;i++){
          selRowName = 'row'+i;
          tgtRowName = 'row'+(i+1);
          if(rows[selRowName].includes(selected) && rows[tgtRowName].includes(target) 
            && (target === (selected+7) || target === (selected+9)) 
            && board[target][0]!==currentPlayer){
            console.log(selRowName + '--' + tgtRowName); //test
            confirm(selected, target);
          }
        }
      }
    }
  }
}

// Moves BLACK PEON
function blackPeonMoves(selected, target){
  //If peon is located in the starting area
  if(rows.row7.includes(selected) && board[target]===''){
    //is the target a correct location, is it blank?
      if(target === (selected-8) || target === (selected-16)){
        confirm(selected, target);
      }
  }else{ //not starting area
    //is the target a correct location, is it blank?
    if(target === (selected-8)){
      if(board[target]===''){
        confirm(selected, target);
      }
    }else{
      if(!(board[target]==='')){
        var selRowName = '';
        var tgtRowName = '';
        for(var i=7;i>1;i--){
          selRowName = 'row'+i;
          tgtRowName = 'row'+(i-1);
          if(rows[selRowName].includes(selected) && rows[tgtRowName].includes(target) 
            && (target === (selected-7) || target === (selected-9)) 
            && board[target][0]!==currentPlayer){
            console.log(selRowName + '--' + tgtRowName); //test
            confirm(selected, target);
          }
        }
      }
    }
  }
}

// Move Towers
function towerMoves(selected, target){
    var diff = selected - target;
    console.log('Diff: '+diff + ' Same row? : '+ areNumbersInSameRow(selected, target));
    if (areNumbersInSameRow(selected, target)){
      //Horizontal move
      if(selected < target){
        var count = 0;
        var line = target;
        for(var i = (selected+1); i<target;i++){
          if(board[i]!==''){
            count += 1;
          } 
          line = i + 1;
        }
        console.log('Count: '+count+'   line: '+line+ '   Target: '+target);
        if(count===0 && line === target){
          confirm(selected, target);
        }
      }else{
        var count = 0;
        var line = target;
        for(var i = (selected-1); i>target;i--){
          if(board[i]!==''){
            count += 1;
          } 
          line = i - 1;
        }
        console.log('Count: '+count+'   line: '+line+ '   Target: '+target);
        if(count===0 && line === target){
          confirm(selected, target);
        }
      }
    }else{
      //Vertical move
      if(selected < target){
        var count = 0;
        var line = target;
        for(var i = (selected+8); i<target;i+=8){
          console.log('i: '+i);
          console.log('Target: '+target);
          if(board[i]!==''){
            count += 1;
          } 
          line = i+8;
        }
        console.log('%7 > 0 ---> Count: '+count+'   line: '+line+ '   Target: '+target);
        if(count===0 && line === target){
          confirm(selected, target);
        }
      }else{
        var count = 0;
        var line = target;
        for(var i = (selected-8); i>target;i-=8){
          if(board[i]!==''){
            count += 1;
          } 
          line = i-8;
        }
        console.log('%7 > 0 ---> Count: '+count+'   line: '+line+ '   Target: '+target);
        if(count===0 && line === target){
          confirm(selected, target);
        }
      }
  }
}

//Move ALFILS
function alfilMoves(selected, target){
  var diff = selected - target;
  //moves from bottom left to top right and viceversa
  if(Math.abs(diff) % 7 === 0){
    if(diff<0){
      var count = 0;
      var line = target;
      for(var i = (selected+7); i>target;i+=7){
        if(board[i]!==''){
          count += 1;
        } 
        line = i + 7;
      }
      console.log('%7 < 0 ---> Count: '+count+'   line: '+line+ '   Target: '+target);
      if(count===0 && line === target){
        confirm(selected, target);
      }    
    }else{
      var count = 0;
      var line = target;
      for(var i = (selected-7); i>target;i-=7){
        if(board[i]!==''){
          count += 1;
        } 
        line = i - 7;
      }
      console.log('%7 > 0 ---> Count: '+count+'   line: '+line+ '   Target: '+target);
      if(count===0 && line===target){
        confirm(selected, target);
      }
    }    
  }else {
    if(Math.abs(diff) % 9 === 0){
    //move from top left to right bottom and viceversa
      if(diff<0){
        var count = 0;
        var line = target;
        for(var i = (selected+9); i>target;i+=9){
          if(board[i]!==''){
            count += 1;
          } 
          line = i + 9;
        }
        console.log('%9 < 0 ---> Count: '+count+'   line: '+line+ '   Target: '+target);
        if(count===0 && line === target){
          confirm(selected, target);
        }    
      }else{
        var count = 0;
        var line = target;
        for(var i = (selected-9); i>target;i-=9){
          if(board[i]!==''){
            count += 1;
          } 
          line = i - 9;
        }  
        console.log('%9 > 0 ---> Count: '+count+'   line: '+line+ '   Target: '+target);
        if(count===0 && line === target){
          confirm(selected, target);
        }
      }
    }
  }
}

//Move HORSES
function horseMoves(selected, target){
  console.log('Target rownumber: '+(rowNumber(selected)+2));
  if(((rowNumber(selected)+2)===rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) ||
     ((rowNumber(selected)+2)===rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)+2)===colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)-2)===colNumber(target)) ||
     ((rowNumber(selected)-2)===rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) ||
     ((rowNumber(selected)-2)===rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)+2)===colNumber(target)) ||
     ((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)-2)===colNumber(target)) ){
      confirm(selected, target);
     }
}

//Move QUEENS
function queenMoves(selected, target){
  if((rowNumber(selected)===rowNumber(target)) ||
     (colNumber(selected)===colNumber(target))){
      towerMoves(selected, target);
     }else{
      alfilMoves(selected, target);
     }
}

//Move KING
function kingMoves(selected, target){
  if(((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)) === colNumber(target)) ||
     ((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)) === colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) ||
     ((rowNumber(selected)) === rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)) === rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) 
  ){
      confirm(selected, target);
     }
}

//Checks KING standing
function check(){


}
// returns the row
function rowNumber(num1){
  var i = 0;
  for (let row in rows) {
    i++;
    if (rows[row].includes(num1)) {
        return i; 
    }
  }
}
// returns the column
function colNumber(num1){
  var i = 0;
  for (let col in cols) {
    i++;
    if (cols[col].includes(num1)) {
        return i; 
    }
  }
}

// check if two numbers are in the sabe row
function areNumbersInSameRow(num1, num2) {
  for (let row in rows) {
      if (rows[row].includes(num1) && rows[row].includes(num2)) {
          return true; // Numbers are in the same row
      }
  }
  return false; // Numbers are in different rows
}

// Confirm moves
function confirm(selected, target){
    board[target] = board[selected];
    board[selected] = '';
    var cellSelected = document.getElementById("cell"+selected);
    var cellTarget = document.getElementById("cell"+target);
    currentPlayer = currentPlayer === 'W' ? 'B' : 'W';  
    console.log("xxxxxxxxxxxxxxxxx");
    setImages();
}





// Reset the board
function resetBoard() {
  board = [
  'WT', 'WH', 'WA', 'WQ', 'WK', 'WA', 'WH', 'WT',
  'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 
  'BT', 'BH', 'BA', 'BK', 'BQ', 'BA', 'BH', 'BT'
  ];
  currentPlayer = 'W';
  gameActive = true;
  const cells = document.getElementsByClassName('cell');
  setImages();
}

//Update the images based on board information
function setImages(){
  for(var i=0; i<64;i++){
    var cell = document.getElementById('cell'+i);
    var imagePath = './Images/' + board[i] + '.png'; // Replace with your image path
    cell.style.backgroundImage = "url('" + imagePath + "')";
  }

}

// Initialize the board
resetBoard();

