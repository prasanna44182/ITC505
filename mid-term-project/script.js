const storyStages = {
    start: {
        text: "You are standing at the edge of Vanshika forest. The villagers have warned you about the spirits that protect it, but there’s something about the forest that pulls you in. Do you go in or turn back to the village?",
        choices: ["Enter the Forest", "Turn Back to the Village"],
        consequence: ["enterForest", "turnBack"],
        image: "forest_entrance.jpeg"
    },
    enterForest: {
        text: "You step into the forest, and a strange silence falls. You feel like you’re being watched. Soon, you come across a large stone with strange carvings. Do you examine the stone or just keep walking?",
        choices: ["Examine the Stone", "Keep Walking"],
        consequence: ["examineStone", "walkAhead"],
        image: "carved_stone.jpeg"
    },
    turnBack: {
        text: "You decide to turn back. The forest seems too mysterious, and you don’t want to risk it. You leave without exploring. Maybe some things are better left untouched.",
        choices: [],
        image: "exit.jpeg"
    },
    examineStone: {
        text: "You notice that the stone is covered in ancient carvings. It looks like a map, showing paths to the 'Shrine of Devi' and the 'Lost Lake'. Which one do you choose to explore?",
        choices: ["Go to Shrine", "Go to Lake"],
        consequence: ["goToShrine", "goToLake"],
        image: "map.jpeg"
    },
    walkAhead: {
        text: "You decide to ignore the stone and keep walking. After a while, you reach a fork in the path. One path leads to a clearing, the other to a narrow, dark trail. Which one do you choose?",
        choices: ["Go to Clearing", "Enter the Narrow Path"],
        consequence: ["goToClearing", "enterNarrowPath"],
        image: "split_path.jpeg"
    },
    goToShrine: {
        text: "You follow the path from the map and reach a hidden shrine. There’s a beautiful lotus flower in a pond nearby. Do you pluck the lotus or leave it alone?",
        choices: ["Pluck the Lotus", "Leave the Lotus"],
        consequence: ["pluckLotus", "leaveLotus"],
        image: "shrine.jpeg"
    },
    goToLake: {
        text: "You make your way to the Lost Lake, its waters clear and still. As you approach the shore, you spot a strange creature sitting by the water. Do you approach it or stay hidden?",
        choices: ["Approach the Creature", "Stay Hidden"],
        consequence: ["approachCreature", "stayHidden"],
        image: "lake.jpeg"
    },
    goToClearing: {
        text: "You enter a peaceful clearing and notice a langur sitting nearby, looking at you with intelligent eyes. The langur gestures as if asking you to follow. Do you follow it or explore the area on your own?",
        choices: ["Follow Langur", "Explore Alone"],
        consequence: ["followLangur", "exploreAlone"],
        image: "clearing.jpeg"
    },
    enterNarrowPath: {
        text: "You take the narrow path and soon find yourself standing before a cave with a treasure chest inside. Do you open the chest or leave it alone?",
        choices: ["Open the Chest", "Leave the Chest"],
        consequence: ["openChest", "leaveChest"],
        image: "narrow_path.jpeg"
    },
    pluckLotus: {
        text: "You pluck the lotus and the world around you seems to shift. You feel a rush of knowledge and wisdom. Maybe you’ve found the secret of the forest.",
        choices: [],
        image: "lotus_pond.jpeg"
    },
    leaveLotus: {
        text: "You leave the lotus, deciding it’s best not to take it. The peaceful beauty of the pond fills you with calm. Maybe some things are meant to remain untouched.",
        choices: [],
        image: "lotus_pond.jpeg"
    },
    approachCreature: {
        text: "You approach the creature slowly. It turns out to be a langur who looks at you with wise eyes. It gestures for you to follow. Do you follow the langur or continue exploring the lake?",
        choices: ["Follow the Langur", "Continue Exploring the Lake"],
        consequence: ["followLangur", "exploreLake"],
        image: "langur.jpeg"
    },
    stayHidden: {
        text: "You decide to stay hidden and watch the creature. After a while, it moves on, leaving behind a small satchel. Do you take the satchel or leave it alone?",
        choices: ["Take the Satchel", "Leave the Satchel"],
        consequence: ["takeSatchel", "leaveSatchel"],
        image: "satchel.jpeg"
    },
    followLangur: {
        text: "You follow the langur as it leads you through the forest. Soon, you find yourself standing before a mystical pond. The langur gestures for you to take something from the pond. What do you do?",
        choices: ["Take the Lotus", "Admire the Lotus"],
        consequence: ["pluckLotus", "leaveLotus"],
        image: "pond.jpeg"
    },
    exploreAlone: {
        text: "You decide to explore the clearing on your own. You find a hidden path leading deeper into the forest. Do you venture down it or head back to the village?",
        choices: ["Venture Deeper", "Head Back to Village"],
        consequence: ["ventureDeeper", "headBack"],
        image: "forest_clearing.jpeg"
    },
    openChest: {
        text: "You open the chest to find an ancient artifact. As you pick it up, you feel a strange energy. The chest has unlocked something more than just treasure.",
        choices: [],
        image: "treasure_chest.jpeg"
    },
    leaveChest: {
        text: "You leave the chest unopened. Something tells you that it’s better not to disturb what’s hidden inside. You leave the cave, wondering what could have been.",
        choices: [],
        image: "empty_cave.jpeg"
    }
};

let currentStage = "start";

function startGame() {
    currentStage = "start";
    updatePage();
}

function updatePage() {
    const stage = storyStages[currentStage];
    document.getElementById("storyText").textContent = stage.text;
    document.getElementById("storyImage").src = stage.image;
    document.getElementById("storyImage").style.display = "block";

    const choicesArea = document.getElementById("choices");
    choicesArea.innerHTML = "";

    stage.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => {
            currentStage = stage.consequence[index];
            updatePage();
        });
        choicesArea.appendChild(button);
    });

    // Show Restart Button if it's not the start
    const restartBtn = document.getElementById("restartBtn");
    if (currentStage !== "start") {
        restartBtn.style.display = "inline-block";
        restartBtn.addEventListener("click", () => {
            startGame();
            restartBtn.style.display = "none";
        });
    } else {
        restartBtn.style.display = "none";
    }
}

startGame();
