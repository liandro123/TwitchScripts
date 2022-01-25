// ==UserScript==
// @name         Twitch Channel Autoclaim
// @version      1
// @author       Liandro Feliz
// @match        https://www.twitch.tv/*
// @updateURL    https://github.com/liandro123/TwitchScripts/blob/main/TwitchRewardClaimer.js
// @run-at       document-end
// ==/UserScript==
//UserInput Object
const UserInput = {
    UserClick: (el) => {
        let timeMS = (Math.random() * (2-1)) + 1;
        setTimeout(() => {
            el.click();
        }, timeMS*1000);
    }
};

// Constants
const options = {childList: true, subtree: true};
const callback = (mutations) => {
    let RewardButton = document.querySelector(".claimable-bonus__icon");
    for (let temp of mutations) {
        if (RewardButton){
            UserInput.UserClick(RewardButton);
        }
    }
}
const observer = new MutationObserver(callback);
//Wait for Element and initate
var interval = setInterval(() => {
    let TargetNode = document.getElementsByClassName("GTGMR");
    if (TargetNode.length >= 1) {
        clearInterval(interval);
        observer.observe(TargetNode[0],options);
    }
},
1000);