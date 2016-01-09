$(document).ready(init);

var state = "Select difficulty level"; 
var $state; 
var $hold; 
var $grabbedTower; 
var numberDisks; 
var $tower0, $tower1, $tower2; 
var $moves; 
var moves = 0; 
var $reset; 

function init () {    
  $state = $('#state');
  $hold = $('#hold');
  $tower0 = $('#tower0');
  $tower1 = $('#tower1');
  $tower2 = $('#tower2');
  $moves = $('#moves'); 
  $reset = $('#reset');
  $('.difficulty').click(difficultyClicked);
  $('.tower').click(towerClicked);
  $('#reset').click(resetClicked); 
};

function towerClicked(event){
  if (state === 'grab') {
    $grabbedTower = $(this);
    var number = $grabbedTower.index()+1;
    var $topDisk = $($(this).children().eq(0));
    var text = $topDisk.text();
    $hold.text(text);
    state = 'hold'; 
    $state.text(state); 
  } else if(state === 'hold'){
    var number = $(this).index()+1;
    if ($grabbedTower.index() === number-1) {
      $hold.text(''); 
      state = 'grab'; 
    } else {
      var $temp = $( $grabbedTower.children().eq(0) ); 
      if ( parseInt($hold.text()) > parseInt($(this).children().eq(0).text() ) ) {
        alert("can't put bigger disk on smaller disk!");
        $hold.text(''); 
        state = 'grab';
      } else {
        $grabbedTower.children().eq(0).remove();
        $(this).prepend($temp);
        moves++; 
        $moves.text(moves);
        if ($tower2.children().length === numberDisks) {
          state = 'YOU WIN'; 
          alert('You win!!!')
        } else {
          state = 'grab'; 
        }        
      }


    }
    $state.text(state);

  }
}

function difficultyClicked(event){
  if (state === 'Select difficulty level') {
    var difficulty = $(this).text(); 
    if (difficulty === 'casual') { 
      numberDisks = 3; 
    };
    if (difficulty === 'normal') { 
      numberDisks = 4; 
    };
    if (difficulty === 'hard') { 
      numberDisks = 5; 
    };
    if (difficulty === 'brutal') { 
      numberDisks = 6;       
    };
    createDisks(difficulty)
    state = 'grab'; 
    $state.text(state);
    $moves.text(moves)
  };
}

function resetClicked(event){
  removeAllDisks(); 
  state = "Select difficulty level"; 
  $state.text(state);
  moves = 0; 
  $moves.text('');
  $hold.text('');
}

function createDisks(difficulty){
  var $disk = $('<div>').addClass('disk');
  var $disk0 = $disk.clone().text('0');
  var $disk1 = $disk.clone().text('1');
  var $disk2 = $disk.clone().text('2');
  if (difficulty === 'casual') {
    $tower0.append($disk0, $disk1, $disk2); 
    return; 
  } else {
    var $disk3 = $disk.clone().text('3');
  }

  if (difficulty === 'normal') {
    $("#tower0").append($disk0, $disk1, $disk2, $disk3); 
    return; 
  } else {
    var $disk4 = $disk.clone().text('4');
  }

  if (difficulty === 'hard') {
    $("#tower0").append($disk0, $disk1, $disk2, $disk3, $disk4); 
    return; 
  } else {
    var $disk5 = $disk.clone().text('5');
    $("#tower0").append($disk0, $disk1, $disk2, $disk3, $disk4, $disk5); 
  }

}

function removeAllDisks(){
  while($tower0.children().length !== 0){
    $tower0.children().eq(0).remove();
  }
  while($tower1.children().length !== 0){
    $tower1.children().eq(0).remove();
  }
  while($tower2.children().length !== 0){
    $tower2.children().eq(0).remove();
  }
}