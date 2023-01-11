### Hexlet tests and linter status:
[![Actions Status](https://github.com/Kachabery/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Kachabery/frontend-project-46/actions)
<a href="https://codeclimate.com/github/Kachabery/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/0480a47f4e1b814dd51b/maintainability" /></a>
<a href="[![Test Coverage](https://api.codeclimate.com/v1/badges/0480a47f4e1b814dd51b/test_coverage)](https://codeclimate.com/github/Kachabery/frontend-project-46/test_coverage)"><img src="https://api.codeclimate.com/v1/badges/0480a47f4e1b814dd51b/test_coverage" /></a>

## Вычислитель отличий

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например [JSON Diff](http://www.jsondiff.com/) . Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

## Установка:
1. Установите [Node.js](https://nodejs.org/en/) не ниже 18.11.0: ```node -v```.
2. Склонируйте созданный репозиторий проекта локально.
3. Выполнить установку зависимостей ```make install```

## Описание:
Вы можете использовать проект как сценарий в терминале или как библиотеку в своем проекте JavaScript. Вы можете отформатировать разницу в трех стилях:  stylish (default), plain and json.
```shell
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help             display help for command
```

 


## Визуализация:
<a href="https://asciinema.org/a/trKv2s90F6vmRdFSbRKUYvf4J"><img src="https://asciinema.org/a/trKv2s90F6vmRdFSbRKUYvf4J.png" width="600"/></a>