module Game {
    import Sprite = Laya.Sprite;

    /**
     * 地图类
     */
    export class MapFloor extends Sprite 
    {
        private _dieFloorList:Array<Floor>;

        constructor()
        {
            super();
            this._dieFloorList = [];
            this.init();
        }

        init():void 
        {
            let floor = this.addFloor(1);
            floor.x = 0;
            floor.y = 380;
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        onLoop():void 
        {
            while(this._dieFloorList.length > 0) {
                let floor = this._dieFloorList.shift();
                floor.removeSelf();
                Laya.Pool.recover("floor", floor);
            }
        }

        addFloor(Type:number):Floor 
        {
            let floor = Laya.Pool.getItemByClass("floor", Floor);
            floor.init(Type);
            floor.once(Global.Event.EVENT_OUT_COMPLETE, this, this.getFloor);
            floor.once(Global.Event.EVENT_OUT_DIE, this, this.delFloor);
            this.addChild(floor);
            return floor;
        }

        getFloor(floor:Floor):void 
        {
            this.addFloor(2);
        }

        delFloor(floor:Floor):void 
        {
            this._dieFloorList.push(floor);
        }
    }
}