// ==UserScript==
// @name         Twitch Drop AutoClaimer
// @version      0.1
// @description  Auto-claim items on 'Drops' page of Twitch.tv
// @author       Liandro Feliz
// @match        https://www.twitch.tv/drops/inventory
// @updateURL    https://github.com/liandro123/TwitchScripts/blob/main/TwitchInventoryAutoClaim.js
// ==/UserScript==
// Purpose: Auto-claim items on 'Drops' page of Twitch.tv
//Constants
const TargetQuery = "[data-test-selector=DropsCampaignInProgressRewardPresentation-claim-button]";
//UserInput Object
const UserInput = {
    UserClick: (el) => {
        let timeMS = (Math.random() * (2-1)) + 1;
        setTimeout(() => {
            el.click();
        }, timeMS*2000);
    }
};
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



//Entry Point
WaitForLoad(TargetQuery).then( () => {
if (document.querySelectorAll(TargetQuery).length > 0) {
        let QueryList = document.querySelectorAll(TargetQuery);
        for (let claimable of QueryList) {
            UserInput.UserClick(claimable);
        }
    }
});
setTimeout(() => {
    location.reload();
},
    15 * 60 *1000);