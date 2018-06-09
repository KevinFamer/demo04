var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    /**
     * 地图类
     */
    var MapFloor = /** @class */ (function (_super) {
        __extends(MapFloor, _super);
        function MapFloor() {
            var _this = _super.call(this) || this;
            _this._dieFloorList = [];
            _this.init();
            return _this;
        }
        MapFloor.prototype.init = function () {
            var floor = this.addFloor(1);
            floor.x = 0;
            floor.y = 380;
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        MapFloor.prototype.onLoop = function () {
            while (this._dieFloorList.length > 0) {
                var floor = this._dieFloorList.shift();
                floor.removeSelf();
                Laya.Pool.recover("floor", floor);
            }
        };
        MapFloor.prototype.addFloor = function (Type) {
            var floor = Laya.Pool.getItemByClass("floor", Game.Floor);
            floor.init(Type);
            floor.once(Global.Event.EVENT_OUT_COMPLETE, this, this.getFloor);
            floor.once(Global.Event.EVENT_OUT_DIE, this, this.delFloor);
            this.addChild(floor);
            return floor;
        };
        MapFloor.prototype.getFloor = function (floor) {
            this.addFloor(2);
        };
        MapFloor.prototype.delFloor = function (floor) {
            this._dieFloorList.push(floor);
        };
        return MapFloor;
    }(Sprite));
    Game.MapFloor = MapFloor;
})(Game || (Game = {}));
//# sourceMappingURL=MapFloor.js.map