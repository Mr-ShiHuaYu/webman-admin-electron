<?php
/**
 * This file is part of webman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link      http://www.workerman.net/
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */

use Webman\Route;


Route::fallback(function (\support\Request $request) {
    // ajax请求时返回json
    if ($request->expectsJson()) {
        return json(['code' => 404, 'msg' => '404 not found']);
    }
    // 页面请求返回404.html模版
    return view('404', ['error' => 'some error'])->withStatus(404);
});


Route::any("/", [\plugin\admin\app\controller\IndexController::class, "index"])->name("home");

