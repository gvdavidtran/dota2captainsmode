const heroesData =[];
const banned1 = [];
const banned2 = [];
const picked1 = [];
const picked2 = [];
let selected = '';
const order = ['1B','2B','1B','2B','1B','2B','1P','2P','2P','1P','1B','2B','1B','2B','2P','1P','2P','1P','2B','1B','1P','2P'];
let currentTurn = 0;

const heroesList = document.getElementById('heroes-list')

fetch('https://api.opendota.com/api/heroes')
.then(data => data.json())
.then((heroes) => {  
  //console.log(heroes)
  for(var hero of heroes) {
    var name = hero.localized_name;
    heroesData.push(name);
    heroesList.insertAdjacentHTML('beforeend', '<div class="card"><div class="card-body hero">' + name + '</div></div>')
  }
})

handleSubmit = () => {
  switch(order[currentTurn]) {
    case '1B':
      const banning1 = document.querySelector('.bannedArea1');
      banning1.insertAdjacentHTML('beforeend', '<p>' + selected + '</p');
      break;
    case '2B':
      const banning2 = document.querySelector('.bannedArea2');
      banning2.insertAdjacentHTML('beforeend', '<p>' + selected + '</p');
      break;
    case '1P':
      const picking1 = document.querySelector('.pickedArea1');
      picking1.insertAdjacentHTML('beforeend', '<p>' + selected + '</p');
      break;
    case '2P':
      const picking2 = document.querySelector('.pickedArea2');
      picking2.insertAdjacentHTML('beforeend', '<p>' + selected + '</p');
      break;

  } 
    
  if (currentTurn === '1B'|| currentTurn === "2B") {
    banned.push(selected)
  } else {
    
  }
  currentTurn++;
  // console.log(currentTurn)
};

displayCurrentTurn = () => {
  switch (order[currentTurn]) {
    case '1B': document.getElementById('current-turn').innerHTML = "First Player Ban";
      break;
    case '2B': document.getElementById('current-turn').innerHTML = "Second Player Ban";
      break;
    case '1P': document.getElementById('current-turn').innerHTML = "First Player Pick";
      break;
    case '2P': document.getElementById('current-turn').innerHTML = "Second Player Pick";
      break;
  }
}

// Everytime the Select button is clicked
document.getElementById('select-hero').onclick = function(){
  handleSubmit();
  displayCurrentTurn();
}

window.onload = function() {
  displayCurrentTurn();
}

// // Press Start to initialize the game only after the heroes have been loaded
// start.addEventListener('click', () => {
//   var eachHero = document.querySelectorAll('.hero');
//   // todo: disable all other heroes
//   for(i = 0 ; i < eachHero.length ; i++) {
//     eachHero[i].addEventListener('click', () => {
//       console.log('clicked!');
//       this.classList.add('selected');
//       selected = this.textContent;
//       console.log(selected);
//       //this.disabled = true;
//     });
//   }
// })

// Listen for all clicks on the document
start.addEventListener('click', () => {
  // console.log('started')
  document.addEventListener('click', () => {
    // console.log(event.target)
    // Bail if it's not a .nav-link
    if (!event.target.classList.contains('hero')) return;

    // Add the active class
    event.target.classList.add('selected');
    
    // Get all nav links
    let eachHero = document.querySelectorAll('.hero');

    // Loop through each link
    for (var i = 0; i < eachHero.length; i++) {

      // If the link is the one clicked, skip it
      if (eachHero[i] === event.target) continue;

      // Remove the .active class
      eachHero[i].classList.remove('selected');

    }
    selected = document.querySelector('.selected').textContent;
    console.log(selected);

  }, false);
});


// document.getElementById("app").innerHTML = `
// <h1 class='text-center'>Captain's mode</h1>
// <div class="row">
//   <div class="col-md-6">
//      <div id="heroes-list"></div>
//   </div>
//   <div class="col-md-6">
//     <button id='start'>Start</button>
//     <h2 id='current-turn'>Current Turn</h2> 
//     <button id='select-hero'>Select</button>
//     <div class='bannedArea'></div>
//     <div class="bannedArea2"></div>
    
//   </div>
// </div>
// `;