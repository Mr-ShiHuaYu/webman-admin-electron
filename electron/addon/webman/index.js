const server = require("./server");
const { app: electronApp } = require("electron");
const Log = require("ee-core/log");
const Conf = require("ee-core/config");
const path = require("path");
const UtilsPs = require("ee-core/ps");
const fs = require("fs");
/**
 * webman server插件
 * @class
 */
class WebmanServerAddon {
  constructor() {
    this.cfg;
    this.webmanServer;
  }

  /**
   * 创建webman服务
   *
   * @function
   */
  async create() {
    this.cfg = Conf.getValue("addons.webman");
    // await this.getWebmanPorts();

    this.webmanServer = new server();
    await this.webmanServer.create(this.cfg);

    // kill
    electronApp.on("before-quit", async () => {
      Log.info("[addon:webmanServer] before-quit: kill-----------");
      await this.webmanServer.kill();
    });

    return;
  }
  //
  // /**
  //  * todo 检查服务是否启动
  //  *
  //  * @function
  //  * @since 1.0.0
  //  */
  // async check () {
  //   Log.info("进入-----检查服务是否启动------"+this.webmanServer);
  //   if(this.webmanServer == undefined){
  //     Log.info("[addon:webmanServer:check] status-----------"+false);
  //     return false;
  //   }
  //
  //   const flag = await this.webmanServer.isRun(Conf.getValue('addons.webman'));
  //   Log.info("[addon:javaServer:check] status-----------"+flag);
  //
  //   return flag;
  // }

  /**
   * 获取webman服务端口,好像没有用，因为在前端bin.js中没办法动态的获取
   *
   * @function
   * @since 1.0.0
   */
  async getWebmanPorts() {
    if (!this.cfg.enable) {
      return;
    }
    const projectPath = this.cfg.projectPath;

    const serverPhpPath = path.join(
      UtilsPs.getExtraResourcesDir(),
      projectPath,
      "config",
      "server.php"
    );
    if (!fs.existsSync(serverPhpPath))
      throw new Error("webman project server.php does not exist");
    const data = fs.readFileSync(serverPhpPath, "utf8");
    // 使用正则表达式提取 'listen' 配置项
    const listenMatch = data.match(/'listen'\s*=>\s*'http:\/\/([^:]+):(\d+)'/);
    if (listenMatch) {
      const webmanPort = listenMatch[2];
      Log.info(
        "[addon:webmanServer:getWebmanPorts] post-----------" + webmanPort
      );
      process.env.EE_WEBMAN_PORT = webmanPort;
      this.cfg.port = webmanPort;

      // 更新config配置
      Conf.setValue("addons.webman", this.cfg);
    } else {
      Log.info(
        '[addon:webmanServer:getWebmanPorts] No "listen" configuration found'
      );
    }
  }

  /**
   * 杀掉进程
   *
   * @function
   * @since 1.0.0
   */
  async kill() {
    if (!this.cfg.enable) {
      return;
    }
    await this.webmanServer.kill();
  }
}

WebmanServerAddon.toString = () => "[class webmanServerAddon]";
module.exports = WebmanServerAddon;
