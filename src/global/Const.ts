module Global {
    export class Const 
    {
        // 游戏宽高
        public static readonly GAME_WIDTH:number = 852;
        public static readonly GAME_HEIGHT:number = 480;

        // 游戏最大/最小速度
        public static readonly MIN_SPEED:number = 8;
        public static readonly MAX_SPEED:number = 12;

        public static readonly ITEM_TYPE_STAR:string = "item_type_star";
        public static readonly ITEM_TYPE_SPEED:string = "item_type_speed";
        public static readonly ITEM_TYPE_FLY:string = "item_type_fly";

        // 能量
        public static readonly BAR_TYPE_ENERGY:string = "bar_type_energy";
        // 速度
        public static readonly BAR_TYPE_SPEED:string = "bar_type_speed";

        public static readonly PLAYER_STATE_RUN:string = "player_state_run";
        public static readonly PLAYER_STATE_FLY:string = "player_state_fly";
        public static readonly PLAYER_STATE_HERT:string = "player_state_hert";
        public static readonly PLAYER_STATE_JUMP:string = "player_state_jump";
        public static readonly PLAYER_STATE_DIE:string = "player_state_die";
    }
}