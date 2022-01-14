//Reminders: Create button to change active stream page

//Globals
const ls = localStorage;
const urlDropStreams = "https://www.twitch.tv/directory/game/SMITE?sort=RECENT&tl=c2542d6d-cd10-4532-919b-3d19f30a768b";//Place the URL stream to the drops stream here
const [timeMax, timeMin] = [5,2];
const gameName = "SMITE";

//UserInput Object
class UserInput {
    constructor (max,min){
        this.timeMS = (Math.random() * (max-min)) + min;
        console.log("class created");
    }
    UserPageSwitch(url) {
        setTimeout(() => {
            console.log("changing site");
            window.location.assign(url);
        }, this.timeMS*1000);
    }
    UserClick (el) {
        console.log("clicking");
        setTimeout(() => {
            el.click();
        }, this.timeMS*1000);
    }
}

//Functions
async function WaitForLoad(el){
    await new Promise((resolve) => {
        let interval = setInterval(() => {
            console.log("Waiting for load");
            if (document.querySelector(el)) {
                clearInterval(interval);
                console.log("Loaded.");
                resolve();
            }
        },
        2000);
    });
}

function NewStream() {
    if (window.location != urlDropStreams) {
        console.log ("Not 'Drops' Page. Returning function");
        return;
    }
    let nodeName = "[data-target='directory-first-item']";
    WaitForLoad(nodeName).then(() => {
        let parent = document.querySelector("[data-target='directory-first-item']");
        let el = parent.querySelector("a");
        ls.setItem("goal", "viewstream");
        new UserInput(timeMax,timeMin).UserClick(el);
    });
}

function WatchStream() {
    //Livestream Mutation Observer Config
    const mutationOptions = {attributes:true, attributeOldValue:true, subtree:false, childList:false};
    const mutationOptionsGameName = {subtree: true , characterDataOldValue:true};
    const mutationCallback = (mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === "attributes" && mutation.oldValue === "Channel is Live") {
            console.log("Changed");
            ls.setItem("goal", "newstream");
            new UserInput(timeMax,timeMin).UserPageSwitch(urlDropStreams);
            }
        }
    };

    const mutationGameNameCallback = (mutations) => {
        for (let mutation of mutations) {
            if (mutation.oldValue === gameName) {
                console.log("Game Changed");
                ls.setItem("goal", "newstream");
                new UserInput(timeMax,timeMin).UserPageSwitch(urlDropStreams);
            }
        }
    };
    //Wait for Element and initate
    let nodeName = "[aria-label='Channel is Live']";
    const observerLivestream = new MutationObserver(mutationCallback);
    WaitForLoad(nodeName).then(() => {
        observerLivestream.observe(document.querySelector(nodeName),mutationOptions);
        console.log("Observing livestream status.");
    });

    let nodeName2 = "[data-a-target='stream-game-link'] span";
    const observerGameName = new MutationObserver(mutationGameNameCallback);
    WaitForLoad(nodeName2).then(() => {
        observerGameName.observe(document.querySelector(nodeName2),mutationOptionsGameName);
        console.log("Observing game name.");
    });

}


switch (ls.getItem("goal")) {
    case "newstream":
        NewStream();
        break;
    case "viewstream":
        WatchStream();
        break;
    default:
        WatchStream();
        break;
}