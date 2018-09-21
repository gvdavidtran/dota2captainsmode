let selected = '';
let selectedName = 'Name of Hero';
const order = ['1B','2B','1B','2B','1B','2B','1P','2P','2P','1P','1B','2B','1B','2B','2P','1P','2P','1P','2B','1B','1P','2P'];
let currentTurn = 0;
let currentPhase = '';

// Sorting function
function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

// Get a list of the heroes through API call
fetch('https://api.opendota.com/api/heroes')
.then(data => data.json())
.then((heroes) => {  
  // sort heroes alphabetically
  heroes.sort(dynamicSort('localized_name'));
  
  // Loop through each hero object to display the portrait
  for(var hero of heroes) {
    var heroDetails = {};
    var name = hero.localized_name;
    var portraitName = hero.name.replace('npc_dota_hero_','');
    var portraitUrl = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + portraitName + '_sb.png'
    if (hero.primary_attr === 'str') {
      strength.insertAdjacentHTML('beforeend', '<div class="hero"><img class="portrait" src="' + portraitUrl + '" /><div class="hidden">' + name + '</div></div>')
    } else if (hero.primary_attr === 'agi') {
      agility.insertAdjacentHTML('beforeend', '<div class="hero"><img class="portrait" src="' + portraitUrl + '" /><div class="hidden">' + name + '</div></div>')
    } else if (hero.primary_attr === 'int') {
      intelligence.insertAdjacentHTML('beforeend', '<div class="hero"><img class="portrait" src="' + portraitUrl + '" /><div class="hidden">' + name + '</div></div>')
    }
  }
})



// Function to describe behavior of the Submit button
handleSubmit = () => {
  switch(order[currentTurn]) {
    case '1B':
      const banning1 = document.querySelector('.bannedArea1');
      banning1.insertAdjacentHTML('beforeend', selected.outerHTML);
      selected.removeEventListener('click', handleSelect);
      selected.classList.add("disabled");
      selected = '';
      removeSelected();
      break;
    case '2B':
      const banning2 = document.querySelector('.bannedArea2');
      banning2.insertAdjacentHTML('beforeend', selected.outerHTML);
      selected.removeEventListener('click', handleSelect);
      selected.classList.add("disabled");
      selected = '';
      removeSelected();
      break;
    case '1P':
      const picking1 = document.querySelector('.pickedArea1');
      picking1.insertAdjacentHTML('beforeend', selected.outerHTML);
      selected.removeEventListener('click', handleSelect);
      selected.classList.add("disabled");
      selected = '';
      removeSelected();
      break;
    case '2P':
      const picking2 = document.querySelector('.pickedArea2');
      picking2.insertAdjacentHTML('beforeend', selected.outerHTML);
      selected.removeEventListener('click', handleSelect);
      selected.classList.add("disabled");
      selected = '';
      removeSelected();
      break;
  } 
  currentTurn++;
  // console.log(currentTurn)
};

// Function to display the current turn
displayCurrentTurn = () => {
  switch (order[currentTurn]) {
    case '1B': 
      currentPhase = 'Ban';
      document.getElementById('current-turn').innerHTML = "First Player Ban";
      document.getElementById('pick-or-ban').innerHTML = "Ban";
      break;
    case '2B': 
      currentPhase = 'Ban';
      document.getElementById('current-turn').innerHTML = "Second Player Ban";
      document.getElementById('pick-or-ban').innerHTML = "Ban";
      break;
    case '1P': 
      currentPhase = 'Pick';
      document.getElementById('current-turn').innerHTML = "First Player Pick";
      document.getElementById('pick-or-ban').innerHTML = "Pick";
      break;
    case '2P': 
      currentPhase = 'Pick';
      document.getElementById('current-turn').innerHTML = "Second Player Pick";
      document.getElementById('pick-or-ban').innerHTML = "Pick";
      break;
  }
}

// Function to remove .selected class from everthing
removeSelected = () => {
  // Get all .selected portrait
    let eachSelected = document.querySelectorAll('.selected');
    // Loop through each link
    for (let selected of eachSelected) {
      // Remove the .active class
      selected.classList.remove('selected');
    }
}


// Function to handle when player selects a hero
handleSelect = () => {
    removeSelected();
    // Add the .active class
    event.target.classList.add('selected');

    selected = document.querySelector('.selected');
    selectedName = document.querySelector('.selected').parentElement.textContent;
    // Change the Select button to reflect the name of hero
    document.getElementById('pick-or-ban').innerHTML = currentPhase + ' ' + selectedName;
}

// Everytime the Submit button is clicked
  document.getElementById('pick-or-ban').onclick = () => {
    if (selected) {
      handleSubmit();
      displayCurrentTurn();
    }
  }  
    
// Function to highlight the selected hero
// Listen for all clicks on the document
start.addEventListener('click', () => {
  document.getElementById('start').classList.add('hidden');
  displayCurrentTurn();
  document.getElementById('hero-select-area').classList.remove('hidden')
  let portraits = document.querySelectorAll('.portrait');
  for (let portrait of portraits) {
    portrait.addEventListener('click', handleSelect, false);
  }
});
