module Game {
    import Sprite = Laya.Sprite;

    // 最小/最大值
    const MIN_VALUE:number = 0;
    const MAX_VALUE:number = 100;

    /**
     * 进度条
     */
     export class Bar extends Sprite 
     {
         public value:number;

         private _bg:Sprite;
         private _bar:Sprite;

         constructor(BarType:string) 
         {
             super();
             this._bg = null;
             this._bar = null;
             this.value = 100;
             this.init(BarType)
         }

         init(BarType:string):void 
         {
             this.width = 180;
             this.height = 21;

             let texture1 = Laya.loader.getRes(Global.Path.PNG_HP_BG);
             let texture2;

             switch (BarType) {
                 case Global.Const.BAR_TYPE_ENERGY:
                     texture2 = Laya.loader.getRes(Global.Path.PNG_EN_BAR);
                     break;
                 case Global.Const.BAR_TYPE_SPEED:
                     texture2 = Laya.loader.getRes(Global.Path.PNG_HP_BAR);
                     break;
             }

             this._bg = new Sprite();
             this._bar = new Sprite();
             this._bar.x = 15;
             this._bar.y = 2;

             this._bg.graphics.drawTexture(texture1, 0, 0, 180, 21);
             this._bar.graphics.drawTexture(texture2, 0, 0, 155, 12);

             this.addChild(this._bg);
             this.addChild(this._bar);
         }

         changeValue(Val:number):void 
         {
             this.value += Val;
             if (this.value < MIN_VALUE) {
                 this.value = MIN_VALUE;
             } else if (this.value > MAX_VALUE) {
                 this.value = MAX_VALUE;
             }
             this._bar.scale(this.value / MAX_VALUE, 1);
         }
     }

}