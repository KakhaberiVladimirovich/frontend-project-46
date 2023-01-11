### Hexlet tests and linter status:
[![Actions Status](https://github.com/Kachabery/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Kachabery/frontend-project-46/actions)
<a href="https://codeclimate.com/github/Kachabery/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/0480a47f4e1b814dd51b/maintainability" /></a>
<a href="[![Test Coverage](https://api.codeclimate.com/v1/badges/0480a47f4e1b814dd51b/test_coverage)](https://codeclimate.com/github/Kachabery/frontend-project-46/test_coverage)"><img src="https://api.codeclimate.com/v1/badges/0480a47f4e1b814dd51b/test_coverage" /></a>

## Вычислитель отличий

<p>Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например <a href="http://www.jsondiff.com" /></a> . Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.</p>

<p>Возможности утилиты:</p>

<p>Поддержка разных входных форматов: yaml, json Генерация отчета в виде plain text, stylish и json</p>

<ol>
  <li>Установка
    <ul>
      <li>Установите Node.js последней версии в систему глобально (Установка JavaScript).</li>
      <li>Склонируйте созданный репозиторий проекта локально.</li>
      <li>Выполнить установку зависимостей (make install)</li>
      <li>Запустить сравнение файлов (команды в описании)</li>
    </ul>
  </li>
  <li>Описание:
    <ul>
      <li>Вычислить различия можно с помощью команды</li>
      <li>gendiff [options] pathToFile1 pathToFile2</li>
    <li>Options: -V, --version output the version number -f, --format [type] Output format -h, --help output usage information</li>
     <li>[type] - plain, json, nested - путь к json или yaml файлам</li>
    </ul>
  </li>

  
 <li>Визуализация</li>
<a href="https://asciinema.org/a/trKv2s90F6vmRdFSbRKUYvf4J"><img src="https://asciinema.org/a/trKv2s90F6vmRdFSbRKUYvf4J.png" width="600"/></a>