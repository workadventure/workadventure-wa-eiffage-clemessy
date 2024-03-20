/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let popupHopital: any;
let popupBuilding: any;
//let link: any;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    WA.room.onEnterLayer("roofZone").subscribe(() => {
        WA.room.hideLayer("Roof/roof1");
        WA.room.hideLayer("Roof/roof2");
    });

    WA.room.onLeaveLayer("roofZone").subscribe(() => {
        WA.room.showLayer("Roof/roof1");
        WA.room.showLayer("Roof/roof2");
    });

    if ('Entry' in WA.room.hashParameters) {
        WA.room.hideLayer("Roof/roof1");
        WA.room.hideLayer("Roof/roof2");
    }

    WA.room.area.onEnter("zonePopupHopital").subscribe(() => {
        if(popupHopital) return;
        popupHopital = WA.ui.openPopup("popupHopital", WA.state.txt_popup_hopital as string, [{
            label: "Fermer",
            className: "primary",
            callback: () => {
                popupHopital?.close();
                popupHopital = null;
            }
        }]);
    });

    WA.room.area.onEnter("zoneBuilding").subscribe(() => {
        if(popupBuilding) return;
        popupBuilding = WA.ui.openPopup("popupBuilding", WA.state.txt_popup_building as string, [{
            label: "Fermer",
            className: "primary",
            callback: () => {
//                link = WA.state.lnk_building;
//                WA.nav.openCoWebSite(link);
                popupBuilding?.close();
                popupBuilding = null;
            }
        }]);
    });

    WA.ui.actionBar.addButton({
        id: 'help-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://svgur.com/i/10Sh.svg',
        toolTip: 'Aide',
        callback: () => {
            WA.nav.openCoWebSite("https://hugoaverty.github.io/eiffage-UI/src/help.pdf");
        }
    });
    WA.player.state.tutorialDone = true;
    WA.ui.modal.closeModal();
    setTimeout(() => {
        WA.ui.modal.closeModal();
        WA.ui.modal.openModal({
            src: "https://hugoaverty.github.io/eiffage-UI/src/",
            allow: "fullscreen",
            title: "Bienvenue",
            allowApi: true,
            position: "center",
        });
    }, 1000);
    WA.room.area.onLeave("zoneIntro").subscribe(() => {
        WA.ui.modal.closeModal();
    });

    WA.room.area.onLeave("zoneBuilding").subscribe(() => {
        popupBuilding?.close();
        popupBuilding = null;
    });
    WA.room.area.onLeave("zonePopupHopital").subscribe(() => {
        popupHopital?.close();
        popupHopital = null;        
    });
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
