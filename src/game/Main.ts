module Game {
	/**
	 * 游戏启动类
	 */
	class Main extends Core.BaseSingleton
	{
		/** 获取单例实例 */
        public static getInstance():Main
        {
            return Core.BaseSingleton.getInstanceOrCreate(Main);
        }

		// 执行
		run():void 
		{
			this.init();
			
			// 进入主场景
			sceneMgr.enterScene(Global.SceneId.MAIN_SCENE);
			viewMgr.showView(Global.ViewId.GAME_INFO_UI);
		}

		private init():void 
		{
			this.initRegisterScene();
			this.initRegisterView();
		}

		/** 场景统一注册函数，游戏场景初始化前均要先注册 */
        private initRegisterScene():void 
        {
            sceneMgr.registerScene(Global.SceneId.MAIN_SCENE, MainScene);
        }

		/** UI界面统一注册函数，游戏UI界面初始化前均要先注册 */
        private initRegisterView():void 
        {
            viewMgr.registerView(Global.ViewId.GAME_INFO_UI, GameInfoUI);
        }
	}

	export let main = Main.getInstance();
	export let sceneMgr = Core.SceneMgr.getInstance();
	export let viewMgr = Core.ViewMgr.getInstance();
	export let loaderMgr = Core.LoaderMgr.getInstance();
}