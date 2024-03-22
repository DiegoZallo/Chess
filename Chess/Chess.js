let board = [];
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
let playerWhite = [];
let playerBlack = [];
let currentPlayer = 'W';
let firstClick = true;
var selectedCell = "";
var targetCell = "";
var makeMove = false;
var promotingPeon = false;

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
  if(promotingPeon !== true){
    if(board[index][0]===currentPlayer && firstClick){
      selectedCell = "cell" + index;
      changeStyle(selectedCell, "2px solid #f5e615", "bold");
      firstClick = false;
    } else if(!firstClick) {
        targetCell = "cell"+index;
        //dactivate selected cell
        if (selectedCell === targetCell || board[index][0]===currentPlayer){
          changeStyle(selectedCell, "1px solid #ccc", "normal")
          firstClick=true;
        } else{
          //Moves the piece to destination, if applies   
          var selected = Number(selectedCell.replace("cell", ''));
          var target = Number(targetCell.replace("cell", ''));
          if(check(selected, target)){;
            checkMove(selected, target);
            if(makeMove){
              confirm(selected, target);
              makeMove=false;
              for(var i = 0; i<8; i++){
                if(board[i]==='BP'){
                  promotingPeon = true;
                  showPromOption();
                }else if(board[(i+56)]==='WP'){
                  promotingPeon = true;
                  showPromOption();
                }
              }
            }
          }
          changeStyle(selectedCell, "1px solid #ccc", "normal");
          firstClick = true;
        }
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
function checkMove(selected, target){
  switch (board[selected]) {
    case "WP":
        // white Peon Moves
        whitePeonMoves(selected, target);
        break;
    case "BP":
        // Black Peon Moves
        blackPeonMoves(selected, target);
        break;
    case "WT":
    case "BT":
        // TOWER Moves
        towerMoves(selected, target);
        break;
    case "WA":
    case "BA":
        // ALFIL Moves
        alfilMoves(selected, target);
        break;
    case "WH":
    case "BH":
        //HORSE Moves
        horseMoves(selected, target);  
        break; 
    case "WQ":
    case "BQ":
        //QUEEN Moves
        queenMoves(selected, target);
        break;
    case "WK":
    case "BK":
        //KING Moves
        kingMoves(selected, target);
        break;
    default:
  }
}

// Moves WHITE PEON
function whitePeonMoves(selected, target){
  //If peon is located in the starting area
  if(rows.row2.includes(selected) && board[target]==='' && board[(selected+8)]==='' && (target === (selected+8) || target === (selected+16))){
    //is the target a correct location, is it blank?
    makeMove=true;
  }else{ //not starting area
    //is the target a correct location, is it blank?
    if(target === (selected+8)){
      if(board[target]===''){
        makeMove=true;
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
            && board[target][0]!=='W'){
            makeMove=true;
          }
        }
      }
    }
  }
}

// Moves BLACK PEON
function blackPeonMoves(selected, target){
  //If peon is located in the starting area
  if(rows.row7.includes(selected) && board[target]==='' && board[(selected-8)]==='' ){
    //is the target a correct location, is it blank?
      if(target === (selected-8) || target === (selected-16)){
        makeMove=true;
      }
  }else{ //not starting area
    //is the target a correct location, is it blank?
    if(target === (selected-8)){
      if(board[target]===''){
        makeMove=true;
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
            && board[target][0]!=='B'){
            makeMove=true;
          }
        }
      }
    }
  }
}

// Move Towers
function towerMoves(selected, target){
    makeMove = false;
    var diff = selected - target;
    console.log('areNumbersInSameRow(selected, target): '+areNumbersInSameRow(selected, target));
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
        if(count===0 && line === target){
          makeMove=true;
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
        if(count===0 && line === target){
          makeMove=true;
        }
      }
    }else if(areNumbersInSameCol(selected, target)){
      //Vertical move
      if(selected < target){
        var count = 0;
        var line = target;
        for(var i = (selected+8); i<target;i+=8){
          if(board[i]!==''){
            count += 1;
          } 
          line = i+8;
        }
        if(count===0 && line === target){
          makeMove=true;
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
        if(count===0 && line === target){
          makeMove=true;
        }
      }
  }
}

//Move ALFILS
function alfilMoves(selected, target){
  var inLine = false;
  var diff = selected - target;

  for(i=0;i<8;i++){
    if(
    (colNumber(selected)+i === colNumber(target) && rowNumber(selected)+i === rowNumber(target)) ||
    (colNumber(selected)+i === colNumber(target) && rowNumber(selected)-i === rowNumber(target)) ||
    (colNumber(selected)-i === colNumber(target) && rowNumber(selected)+i === rowNumber(target)) ||
    (colNumber(selected)-i === colNumber(target) && rowNumber(selected)-i === rowNumber(target)) 
    ){
      inLine = true;
    }
  }
  //moves from bottom left to top right and viceversa
  if(Math.abs(diff) % 7 === 0){
    if(diff<0){
      var count = 0;
      
      for(var i = (selected+7); i<target;i+=7){
        if(board[i]!==''){
          count += 1;
        } 
      }
      if(count===0 && inLine){
        makeMove=true;
      }    
    }else{
      var count = 0;
      for(var i = (selected-7); i>target;i-=7){
        if(board[i]!==''){
          count += 1;
        } 
      }
      if(count===0 && inLine){
        makeMove=true;
      }
    }    
  }else {
    if(Math.abs(diff) % 9 === 0){
    //move from top left to right bottom and viceversa
      if(diff<0){
        var count = 0;
        for(var i = (selected+9); i<target;i+=9){
          if(board[i]!==''){
            count += 1;
          } 
        }
        if(count===0 && inLine){
          makeMove=true;
        }    
      }else{
        var count = 0;
        for(var i = (selected-9); i>target;i-=9){
          if(board[i]!==''){
            count += 1;
          } 
        }  
        if(count===0 && inLine){
          makeMove=true;
        }
      }
    }
  }

}

//Move HORSES
function horseMoves(selected, target){
  if(((rowNumber(selected)+2)===rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) ||
     ((rowNumber(selected)+2)===rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)+2)===colNumber(target)) ||
     ((rowNumber(selected)+1)===rowNumber(target) && (colNumber(selected)-2)===colNumber(target)) ||
     ((rowNumber(selected)-2)===rowNumber(target) && (colNumber(selected)+1)===colNumber(target)) ||
     ((rowNumber(selected)-2)===rowNumber(target) && (colNumber(selected)-1)===colNumber(target)) ||
     ((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)+2)===colNumber(target)) ||
     ((rowNumber(selected)-1)===rowNumber(target) && (colNumber(selected)-2)===colNumber(target)) ){
      makeMove=true;
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
    makeMove=true;
  }
}

//Checks KING standing. returns false if king is unprotected
function check(selected, target){
  // keep a pre version of the board
  var bkpBoard = board.slice();
  // update board to simulate the movemnt
  board[target] = board[selected];
  board[selected] = '';
  // check all posible movemets that has clear attack to your king
  var kingPos = getKingPosition(currentPlayer);
  for(var i=0; i<64; i++){
    if(board[i][0] !== currentPlayer){
      makeMove=false;
      console.log('board[i]: '+board[i] +'  i: '+i +' --- King Pos: '+kingPos);
      checkMove(i, kingPos);
      if(makeMove){ 
        makeMove = false;
        board = bkpBoard.slice();
        return false;
      }
    }
  }
  board = bkpBoard.slice();
  return true;
}

function checkMate(){
  var myKingTarget = getKingPosition(currentPlayer);
  for(var i = 0; i<64; i++){
    for(var x=0; x<64; x++){
      console.log('i: '+i+'   x: '+x);
      console.log('  board[i]: ' +board[i] + '  currentPlayer: ' + currentPlayer)
      console.log('board[x]: '+board[x] +  '   board[x][0]: '  + board[x][0])
      if(board[i][0] === currentPlayer && (board[x] === '' || board[x][0] !== currentPlayer)){
        checkMove(i, x);
        console.log('MakeMove: '+makeMove);
        if(makeMove && check(i, x)){
          // console.log('Selected: '+ board[i]+' position: '+i);
          // console.log('Target: '+ board[x]+' position: '+x);
          makeMove = false;
          return ('Suggested: Move your piece in Column '+colNumber(i) + ' and Row ' + rowNumber(i) + 
                  ' to column '+ colNumber(x) + ' and Row '+rowNumber(x)) 
        }
      }
    }
  }
  return 'CHECK MATE!  '
}

function showResultPopup() {
  const result = checkMate(); // Replace with your actual function call
  window.alert(result);
}

//Gives Back kings position
function getKingPosition(player){
  for(var i=0; i<63; i++){
    if(board[i]===(player+'K')){
      return i;
    }
  }
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

// check if two numbers are in the same row
function areNumbersInSameRow(num1, num2) {
  for (let row in rows) {
      if (rows[row].includes(num1) && rows[row].includes(num2)) {
          return true; // Numbers are in the same row
      }
  }
  return false; // Numbers are in different rows
}

// check if two numbers are in the same col
function areNumbersInSameCol(num1, num2) {
  for (let col in cols) {
      if (cols[col].includes(num1) && cols[col].includes(num2)) {
          return true; // Numbers are in the same row
      }
  }
  return false; // Numbers are in different rows
}
// Confirm moves
function confirm(selected, target){
  if(board[target] !== ''){
    if(currentPlayer==='W'){
        playerBlack.push(board[target]);    
    }else{
        playerWhite.push(board[target]);
    }
  }
    board[target] = board[selected];
    board[selected] = '';
    var cellSelected = document.getElementById("cell"+selected);
    var cellTarget = document.getElementById("cell"+target);
    currentPlayer = currentPlayer === 'W' ? 'B' : 'W';  
    setImages();
}

// Reset the board
function resetBoard() {
  board = [
  'WT', 'WH', 'WA', 'WK', 'WQ', 'WA', 'WH', 'WT',
  'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', 
  'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 
  'BT', 'BH', 'BA', 'BK', 'BQ', 'BA', 'BH', 'BT'
  ];
  currentPlayer = 'W';
  const cells = document.getElementsByClassName('cell');
  playerWhite = [];
  playerBlack = [];
  setImages();

  //removes all the claimed pieces so it could be write againg, if any
  const whiteCells = document.getElementById('wcells');
  while (whiteCells.firstChild) {
    whiteCells.removeChild(whiteCells.firstChild);    
  };
  const blackCells = document.getElementById('bcells');
  while (blackCells.firstChild) {
    blackCells.removeChild(blackCells.firstChild);    
  };
}

//Update the images based on board information
function setImages(){
  for(var i=0; i<64;i++){
    var cell = document.getElementById('cell'+i);
    var imagePath = './Images/' + board[i] + '.png'; 
    cell.style.backgroundImage = "url('" + imagePath + "')";
  }
  
  //controls the claimed pieces
  const whiteCells = document.getElementById('wcells');
  while (whiteCells.firstChild) {
    whiteCells.removeChild(whiteCells.firstChild);    
  };

  for(i=0; i<playerWhite.length;i++){
    var cellw = document.createElement('div');
    cellw.className = 'wcell';
    cellw.id = 'w'+i;
    var imagePath = './Images/' + playerWhite[i] + '.png'; 
    cellw.style.backgroundImage = "url('" + imagePath + "')";
    whiteCells.appendChild(cellw);
  }

  const blackCells = document.getElementById('bcells');
  while (blackCells.firstChild) {
    blackCells.removeChild(blackCells.firstChild);    
  };

  for(i=0; i<playerBlack.length;i++){
    var cellb = document.createElement('div');
    cellb.className = 'wcell';
    cellb.id = 'w'+i;
    var imagePath = './Images/' + playerBlack[i] + '.png'; 
    cellb.style.backgroundImage = "url('" + imagePath + "')";
    blackCells.appendChild(cellb);
  }

  //Manage the current player activation indicator
  var wPlay = document.getElementById('pwhite');
  var bPlay = document.getElementById('pblack');
  
  if (currentPlayer === 'W') { 
      wPlay.style.backgroundColor = "rgb(39, 252, 85)";
      bPlay.style.backgroundColor = "";  
      resizeText(wPlay);
      resetText(bPlay);
      wPlay.classList.add('fade-out'); // Apply fade-out animation
      setTimeout(function() {
        wPlay.textContent = "♔ White Turn"; // Update the text content
        wPlay.classList.remove('fade-out');
        wPlay.classList.add('fade-in'); // Apply fade-in animation
        bPlay.textContent = "♚ Black"; // Update the text content
        bPlay.classList.remove('fade-out');
        bPlay.classList.add('fade-in'); // Apply fade-in animation
      }, 200); // Adjust the delay as needed
      
  } else {
      wPlay.style.backgroundColor = "";  
      bPlay.style.backgroundColor = "rgb(39, 252, 85)"; 
      resizeText(bPlay);
      resetText(wPlay);
      bPlay.classList.add('fade-out'); // Apply fade-out animation
      setTimeout(function() {
        bPlay.textContent = "♚ Black Turn"; // Update the text content
        bPlay.classList.remove('fade-out');
        bPlay.classList.add('fade-in'); // Apply fade-in animation
        wPlay.textContent = "♔ White"; // Update the text content
        wPlay.classList.remove('fade-out');
        wPlay.classList.add('fade-in'); // Apply fade-in animation
      }, 200); // Adjust the delay as needed
  }

}

function resizeText(element) {
  element.classList.add('player-text'); // Apply the CSS class for the transition
  element.style.fontSize = '18px'; // Set the desired font size  
}

function resetText(element) {
  element.classList.remove('player-text'); // Remove the transition class
  element.style.fontSize = ''; // Reset the font size
}



// Function to show the modal
function showPromOption() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Function to handle option selection
function selectOption() {
  var selectionList = document.getElementById("selectionList");
  var selectedOption = selectionList.value;
  for(var i = 0; i<8; i++){
    if(board[i]==='BP'){
      promotingPeon = false;
      board[i]=("B"+selectedOption);
    }else if(board[(i+56)]==='WP'){
      promotingPeon = false;
      board[(i+56)]=("W"+selectedOption);
    }
  }
  // Close the modal
  closeModal();
  setImages();
}

// Close modal when clicking the close button
document.getElementById("closeModal").addEventListener("click", closeModal);

// Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    closeModal();
  }
});







// Initialize the board
resetBoard();

