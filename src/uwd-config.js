window.UWDConfig = {
    base: {
        API_BASE_URL: '//cade.itt.space/ud-app-service/upd', //
        WEB_SOCKET_SERVICE_URL: '//cade.itt.space/ud-app-service/ud-websocket',
        SOCKET_ROOM_TYPE: 'upd',
        ENABLE_WEB_SOCKET: true,
        SIGN_IN_URL: '//dev.ud.itt.space/', // 登录地址
        DESIGN_MANAGE_URL: '//dev.ud.itt.space/', // 设计管理后台地址
        DOCS_URL: './manuals/', // 帮助文档URL,
        LOAD_DESIGN_ASYNC: false,  // 是否异步获取设计
        DEFAULT_THEME: 'light-black',// dark  light-black  light-blue  light-red 主题切换
        UWD_THEME_DARK_CSS_URL: './uwd-theme-dark.css',
        UWD_THEME_LIGHT_CSS_URL: './uwd-theme-light.css',
        CLOSE_LOADING_EFFECT: false, // 是否关闭 loading 动画 //服务器地址
        UWD_ROOT_DOM_CLASS_NAME: 'a'
    }
};
