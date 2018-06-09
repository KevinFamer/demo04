module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;
    import Point = Laya.Point;

    /**
     * 游戏场景
     */
    export class MainScene extends Core.BaseScene 
    {
        private _bg:Sprite;
        private _mapFloor:MapFloor;
        private _player:Player;
        private _flyBar:Bar;
        private _speedBar:Bar;
        private _scoreTxt:Text;
        private _score:number;
        private _gameOverUI:GameOverUI;
        private _itemPoint:Point;
        private _npcTime:number;

        onInit():void 
        {
            this.sceneId = Global.SceneId.MAIN_SCENE;
            this._bg = null;
            this._mapFloor = null;
            this._flyBar = null;
            this._speedBar = null;
            this._scoreTxt = null;
            this._score = 0;
            this._gameOverUI = null;
            this._itemPoint = new Point();
        }

        onShow():void 
        {
            super.onShow();
            this.init();
        }

        init():void 
        {
            this._bg = new BackgroundUI();
            this.addChild(this._bg);

            this._mapFloor = new MapFloor();
            this.addChild(this._mapFloor);

            this._flyBar = new Bar(Global.Const.BAR_TYPE_ENERGY);
            this._flyBar.y = 7;
            this.addChild(this._flyBar);

            this._speedBar = new Bar(Global.Const.BAR_TYPE_SPEED);
            this._speedBar.y = 7 + this._speedBar.height + 4;
            this.addChild(this._speedBar);

            this._player = new Player(this._flyBar, this._speedBar);
            this._player.x = 32 * 8;
            this._player.y = 32 * 4;
            this._player.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._player);

            this._scoreTxt = new Text();
            this._scoreTxt.color = "#ffffff";
            this._scoreTxt.fontSize = 30;
            this._scoreTxt.text = "0";
            this._scoreTxt.width = Global.Const.GAME_WIDTH;
            this._scoreTxt.align = "right";
            this._scoreTxt.x = -10;
            this._scoreTxt.y = 10;
            this.addChild(this._scoreTxt);

            this._gameOverUI = new GameOverUI();
            this._gameOverUI.visible = false;
            this.addChild(this._gameOverUI);

            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);

            this._npcTime = new Date().getTime();
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        onLoop():void 
        {
            for (var i = this._mapFloor.numChildren - 1; i > -1; i--) {
                let floor = this._mapFloor.getChildAt(i) as Floor;
                if (floor.checkHit(this._player.x, this._player.y)) {
                    let itemList = floor.getItems();

                    for (var j = 0; j < itemList.length; j++) {
                        let item = itemList[j];
                        
                        if (item.visible) {
                            this._itemPoint.x = item.x + floor.x + this._player.width;
                            this._itemPoint.y = item.y + floor.y + this._player.height;

                            if (this._player.hitTestPoint(this._itemPoint.x, this._itemPoint.y)) {
                                if (item.type == Global.Const.ITEM_TYPE_SPEED) {
                                    item.visible = false;
                                    this._player.showEffect();
                                } else if (item.type == Global.Const.ITEM_TYPE_FLY) {
                                    item.visible = false;
                                    this._flyBar.changeValue(100);
                                } else {
                                    Laya.Tween.to(item, {y:-10, scaleX:0.1, alpha:0}, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
                                    this.updateScore();
                                }
                            }
                        }
                    }

                    this._player.y = floor.y;
                    this._player.jumpReset();
                }
            }

            let leftTime = new Date().getTime() - this._npcTime;
            if (leftTime > 1500) {
                this._npcTime = new Date().getTime();
                let npc = Laya.Pool.getItemByClass("npc", Npc);
                this.addChild(npc);
            }
        }

        itemTweenComplete(PItem:Item):void 
        {
            PItem.visible = false;
            PItem.y = 0;
            PItem.alpha = 1;
            PItem.scale(1, 1);
        }

        onMouseDown():void 
        {
            this._player.jump();
        }

        onMouseUp():void 
        {
            this._player.gotoJump();
        }

        playerDie():void 
        {
            Data.isOver = true;
            this._gameOverUI.setScore(this._score);
            this._gameOverUI.visible = true;
        }

        updateScore():void 
        {
            this._score++;
            this._scoreTxt.text = this._score.toString();
        }
    }
}