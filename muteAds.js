(function() {
    'use strict';

    const adrunning = () => {
        const adImgElement = document.querySelectorAll('[class*="adTag"]');
        return adImgElement.length > 0;
    };

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async function run(){
        console.log('Mute Ads Script Running')
        let muted = true;
        while(true){
            // check if ad is running
            if(adrunning()){
                // store the volume so that we can restore it afterwards
                let video = document.querySelector('video');
                if(video){
                    video.muted=true;
                    // now sleep for 10 seconds. cuz sometimes the ad logo appears late. so we don't want to unmute the video before the newer ad starts
                    console.log(`Ad is running, Muting `);
                } 
                await sleep(10000);
            }
            else{
                // if ad is not running, restore the volume
                let video = document.querySelector('video');
                if (video) {
                    video.muted = false;
                    console.log(`Ad is not running, unmuting`);
                }
                await sleep(1000);
            }
        }
    };
    run();
})();
