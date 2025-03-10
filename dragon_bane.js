let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Paper Clip"];
let openedChest = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const currentWeaponText = document.querySelector("#weapon");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const imgElement = document.querySelector("#monsterImage");
const locationImage = document.querySelector("#locationImage");

const weapons = [
    { name: 'Paper Clip', power: 6 },
    { name: 'Stick', power: 10 },
    { name: 'Dagger', power: 26 },
    { name: 'Nunchucks', power: 34 },
    { name: 'Cross Bow', power: 40 },
    { name: 'Sword', power: 50 },
    { name: 'Halberd', power: 60 },
    { name: 'Battle Axe', power: 76 },
    { name: 'Lightsaber', power: 100 }
  ];

const monsters = [
    {
      name: "Slime",
      level: 2,
      health: 15,
      img: "https://i.ibb.co/kHMB3pC/Slime.jpg"
    },
    {
      name: "Giant Bat",
      level: 3,
      health: 25,
      img: "https://i.ibb.co/W2B173s/Giant-Bat.jpg"
    },
    {
      name: "Worm",
      level: 4,
      health: 30,
      img: "https://i.ibb.co/ZhVw7B8/Worm.jpg"
    },
    {
      name: "Shrek",
      level: 5,
      health: 35,
      img: "https://i.ibb.co/16RD2Z9/14.jpg"
    },
    {
      name: "Mutant Rooster",
      level: 5,
      health: 35,
      img: "https://i.ibb.co/30BDNGs/Mutant-Rooster.jpg"
    },
    {
      name: "Rabbit of Caerbannog",
      level: 6,
      health: 40,
      img: "https://i.ibb.co/DbkpkJ2/13.jpg"
    },
    {
      name: "Cave Spider",
      level: 7,
      health: 50,
      img: "https://i.ibb.co/yg7VNwP/Cave-Spider.jpg"
    },
    {
      name: "Cave Stalker",
      level: 8,
      health: 60,
      img: "https://i.ibb.co/YWVMmgD/Cave-Stalker.jpg"
    },
    {
      name: "Stone Golem",
      level: 9,
      health: 70,
      img: "https://i.ibb.co/CHrYyfy/Stone-Golem.jpg"
    },
    {
      name: "Cave Troll",
      level: 10,
      health: 80,
      img: "https://i.ibb.co/F5xHGs4/Cave-Troll.jpg"
    },
    {
      name: "Shadow Wraith",
      level: 12,
      health: 100,
      img: "https://i.ibb.co/bJtZ58k/11.jpg"
    },
    {
      name: "Stay Puft Marshmallow Man",
      level: 14,
      health: 110,
      img: "https://i.ibb.co/ZVvM9Jr/15.jpg"
    },
    {
      name: "Bloodshade",
      level: 15,
      health: 120,
      img: "https://i.ibb.co/k3tG09B/Bloodshade.jpg" 
    },
    {
      name: "Dragon",
      level: 20,
      health: 300,
      img: "https://i.ibb.co/HDKhnN8/10.jpg"
    },
    {
        name: "Mimic",
        level: 2,
        health: 15,
        img: "https://i.ibb.co/zH2Gfsx/12.jpg"
      }
  ];

const locations = [
  {
    //location 0
    name: "town square",
    "button text": ["Go to store", "Visit cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".",
    img: "https://thenerdd.com/wp-content/uploads/2021/05/1.jpg?w=1200"
  },
  {
    //location 1
    name: "store",
    "button text": ["Buy healing potion (10 gold)", "Buy weapon (30 gold)", "Return to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
    img: "https://www.dndspeak.com/wp-content/uploads/2021/04/Shop-1.jpg"
  },
  {
    //location 2
    name: "cave",
    "button text": ["Fight monster", "Find treasure chest", "Return to town square"],
    "button functions": [fightRandomMonster, openTreasureChest, goTown],
    text: "You enter the cave. What would you like to do?",
    img: "https://t3.ftcdn.net/jpg/06/41/30/92/360_F_641309220_IfhzYNjdPVrVl4WIMSfxX2p0Yg4Jfnnn.jpg"
  },
  {
    //location 3
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, () => caveNav(Math.floor(Math.random() * 7) + 1)],
    text: "You are fighting a monster."
  },
  {
    //location 4
    name: "kill monster",
    "button text": ["Continue exploring cave"],
    "button functions": [() => caveNav(Math.floor(Math.random() * 7) + 1)],
    text: "You've defeated the monster! You gain experience points and gold."
  },
  {
    //location 5
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    //location 6
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    //location 7
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: "fight dragon",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  }
];

const caveLocations = [
    {
      //location 0
      name: "cave1",
      "button text": ["Go left", "Go straight", "Go right", "Return to town"],
      "button functions": [() => caveNav(1), () => caveNav(3), () => caveNav(2), goTown],
      text: "The cave entrance is dimly lit, with three dark tunnels ahead",
      img: "https://i.ibb.co/wzx7KdZ/Cave1.jpg"
    },
    {
      //location 1
        name: "cave2",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [() => caveNav(9), fightRandomMonster, () => caveNav(4)],
        text: "The walls are damp, and the air feels colder. A faint glimmer can be seen to the left.",
        img: "https://i.ibb.co/6DB6TnK/Cave2.jpg"
      },
      {
        //location 2
        name: "cave3",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [() => caveNav(5), () => caveNav(6), fightRandomMonster],
        text: "The tunnel widens slightly, with footprints visible on the ground.",
        img: "https://i.ibb.co/HhmkDM9/Cave-Misc1.jpg"
      },
      {
        //location 3
        name: "cave4",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [() => caveNav(7), () => caveNav(8), () => caveNav(9)],
        text: "Stalactites hang low, and the floor is uneven. You hear faint dripping sounds.",
        img: "https://i.ibb.co/kQPBHzF/Cave4.jpg"
      },
      {
        //location 4
        name: "cave6",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [fightRandomMonster, () => caveNav(8), () => caveNav(9)],
        text: "The tunnel is narrow, with loose rocks underfoot.",
        img: "https://i.ibb.co/TrzFHxS/Cave-Misc2.jpg"
      },
      {
        //location 5
        name: "cave8",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [() => caveNav(0), fightRandomMonster, () => caveNav(9)],
        text: "The tunnel is narrow, with loose rocks underfoot.",
        img: "https://i.ibb.co/jMvjF8p/Cave-Misc3.jpg"
      },
      {
        //location 6
        name: "cave10",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [() => caveNav(4), () => caveNav(8), () => caveNav(9)],
        text: "The walls are covered in glowing moss, illuminating your way.",
        img: "https://i.ibb.co/kgCNqW6/Cave10.jpg"
      },
      {
        //location 7
        name: "cave11",
        "button text": ["Go left", "Go straight", "Go right"],
        "button functions": [() => caveNav(9), () => caveNav(8), () => caveNav(4)],
        text: "Strange carvings depict an ancient story of dragons and treasure.",
        img: "https://i.ibb.co/86gdwF2/Cave11.jpg"
      },
      {
        //location 8
        name: "caveExit",
        "button text": ["Re-enter cave", "Return to town"],
        "button functions": [() => caveNav(Math.floor(Math.random() * 7) + 1), goTown],
        text: "You see the light of day and leave the cave safely.",
        img: "https://i.ibb.co/mXXkTpK/24.jpg"
      },
      {
        //location 9
        name: "treasure",
        "button text": ["Open chest", "Turn back", "Continue Exploring"],
        "button functions": [openTreasureChest, () => caveNav(Math.floor(Math.random() * 7) + 1), () => caveNav(Math.floor(Math.random() * 7) + 1)],
        text: "You've found a treasure chest! What would you like to do?",
        img: "https://i.ibb.co/Qk37z85/25.jpg"
      }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function caveNav(index) {
    update(caveLocations[index]);
    locationImage.src = caveLocations[index].img;
    locationImage.style.display = "block";
    openedChest = 0;
}

function update(location) {
  monsterStats.style.display = "none";
  const buttons = [button1, button2, button3, button4, button5];

    // // Reset button texts and visibility
    // buttons.forEach(button => {
    //   button.innerText = ""; // Clear text
    //   button.style.display = "none"; // Hide all buttons initially
    // });

  // Loop through the buttons and update based on location["button text"]
  buttons.forEach((button, index) => {
    if (index < location["button text"].length) {
      button.style.display = "inline-block"; // Show the button
      button.innerText = location["button text"][index]; // Set button text
      button.onclick = location["button functions"][index]; // Set button functionality
    } else {
      button.style.display = "none"; // Hide unused buttons
    }
  });

  // Update the "Buy Weapon" button only when you're in the store
  if (location.name === "store" && currentWeapon < weapons.length - 1) {
    const nextWeapon = weapons[currentWeapon + 1]; // Get the next weapon
    const nextWeaponCost = nextWeapon.power * 2.5; // Calculate the cost based on weapon power
    button2.innerText = "Buy " + nextWeapon.name + " (" + nextWeaponCost + " gold)"; // Update the button text with weapon name and cost
  }

  // Update location text
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
  locationImage.src = locations[0].img;
  locationImage.style.display = "block";

  // Hide the last two buttons
  button4.style.display = "none";
  button5.style.display = "none";
}

function goStore() {
  update(locations[1]);
  locationImage.src = locations[1].img;
}

function goCave() {
    update(caveLocations[0]);
    locationImage.src = caveLocations[0].img;
    locationImage.style.display = "block";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {

    // Calculate the next weapon's cost
    const nextWeapon = weapons[currentWeapon + 1];
    const nextWeaponCost = nextWeapon.power * 2.5;

    if (gold >= nextWeaponCost) {
      gold -= nextWeaponCost;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(" " + newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      weapon.innerText = weapons[currentWeapon].name;

      // Update the button text immediately after buying the weapon
      update(locations[1]); // Call update to refresh the button text and other UI elements

    } else {
      text.innerText = "You do not have enough gold to buy a new weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightMimic() {
    fighting = 14;
    goFight();
}

function fightRandomMonster() {
  const nonDragonMonsters = monsters.filter(
    monster => monster.name !== "Dragon" && monster.name !== "Mimic"
);
  const randomIndex = Math.floor(Math.random() * nonDragonMonsters.length);
  fighting = monsters.indexOf(nonDragonMonsters[randomIndex]);
  goFight();
}

function fightDragon() {
  fighting = 13;
  goFight();
}

function goFight() {
  // Check if the monster is a dragon
  const locationIndex = monsters[fighting].name.toLowerCase() === "dragon" ? 8 : 3;
  // Update the location based on the monster type
  update(locations[locationIndex]);  monsterStats.style.display = "block";
  locationImage.style.display = "none";
  if (fighting === 14) {
    text.innerHTML = "Oh no! It was a mimic disguised as a treasure chest!";
  } else {
    text.innerHTML = "You are fighting a monster.";
  }
  monsterHealth = monsters[fighting].health;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImage.src = monsters[fighting].img;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 13) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .05 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    currentWeaponText.innerText = weapons[currentWeapon].name;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * (Math.floor(Math.random() * 6)) - (Math.floor(Math.random() * xp)));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  const goldGained = Math.floor(monsters[fighting].level * 6.7);
  const xpGained = monsters[fighting].level;
  gold += goldGained;
  xp += xpGained;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  text.innerHTML += `<br><strong>XP:</strong> ${xpGained} &nbsp; <strong>Gold:</strong> ${goldGained}`;
  locationImage.style.display = "none";
}

function openTreasureChest() {
    const chance = Math.floor(Math.random() * 100) + 1;

    if (openedChest > 0){
      text.innerHTML = "You've opened the chest already, it's empty!";
    } else if (chance <= 50) {
        const goldGained = Math.floor(Math.random() * 25) + 1;
        gold += goldGained;
        goldText.innerText = gold;
        text.innerHTML = "You find " + goldGained + " gold!";
        locationImage.src = "https://i.ibb.co/pjytYk0/Untitled-2000-x-1000-px.jpg";
    } else if (chance < 80) {
        const healthGained = Math.floor(Math.random() * 25) + 1;
        health -= healthGained;
        healthText.innerText = health;
        text.innerHTML = "It was a trap! You lose " + healthGained + " health.";
        locationImage.src = "https://i.ibb.co/NSPk48W/26.jpg";
        text.innerHTML = "It was a trap! You lose " + healthGained + " health, AND ARE POISONED!";

        // Change the variable once every second (1000 milliseconds) 
        const intervalId = setInterval(poisonDamage, 1250); 
        // To stop the interval after a certain time (e.g., 10 seconds), you can use clearInterval 
        setTimeout(() => clearInterval(intervalId), 12500);

        if (health <= 0) {
          lose();
        }
    } else if (chance < 95) {
      fightMimic();
    }else {
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "YOU FOUND A NEW WEAPON!!!";
      inventory.push(" " + newWeapon);
      weapon.innerText = weapons[currentWeapon].name;
      locationImage.src = "https://i.ibb.co/CsqJqYh/Untitled-2000-x-1000-px-1.jpg";
    }
    openedChest ++;
}

function poisonDamage(){
  health -= 1;
  healthText.innerText = health;
}

function lose() {
  update(locations[5]);
  locationImage.style.display = "none";
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  currentWeaponText.innerText = weapons[currentWeapon].name;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}