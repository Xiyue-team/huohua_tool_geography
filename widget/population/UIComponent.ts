
export class UIComponent {

    worldBtn:HTMLButtonElement;
    asiaBtn:HTMLButtonElement;
    chinaBtn:HTMLButtonElement;
    earthBtn:HTMLButtonElement;
    switchBtn:HTMLButtonElement;

    constructor() {
        document.getElementById('mapTool').style.display ='block';
    }
    initBtn(){
        this.worldBtn = document.getElementById('worldBtn') as HTMLButtonElement;
        this.asiaBtn  = document.getElementById('asiaBtn')  as HTMLButtonElement;
        this.chinaBtn = document.getElementById('chinaBtn') as HTMLButtonElement;
        this.switchBtn = document.getElementById('switchBtn') as HTMLButtonElement;
        this.earthBtn  = document.getElementById('earthBtn') as HTMLButtonElement;
    }

}
