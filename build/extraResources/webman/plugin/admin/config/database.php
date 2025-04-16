<?php
return  [
    'default' => 'mysql',
    'connections' => [
        // 'mysql' => [
        //     'driver'      => 'mysql',
        //     'host'        => '127.0.0.1',
        //     'port'        => '3306',
        //     'database'    => 'webman_admin_test',
        //     'username'    => 'root',
        //     'password'    => 'root',
        //     'charset'     => 'utf8mb4',
        //     'collation'   => 'utf8mb4_general_ci',
        //     'prefix'      => '',
        //     'strict'      => true,
        //     'engine'      => null,
        // ],
        // 实际上将数据库的driver类型改为 sqlite,但名称还是mysql，因为 webman-admin后台代码写死的
        // 改为sqlite后，无法使用webman amdin中的代码生成功能
        // 建议在mysql上开发好后，使用navicat 的数据库迁移工具，将mysql数据库转为sqlite数据库，然后，关闭代码生成等功能
        'mysql' => [
            'driver' => 'sqlite',
            'database' => base_path('webman_demo.db'),
            'prefix' => '',
            //启用外键约束并强制执行数据完整性
            'foreign_key_constraints' => true,
        ],
    ],
];
