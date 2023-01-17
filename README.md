Изучение технологии AJAX
========================
Задание
------------------------
Разработать и реализовать анонимный чат с возможностью создания каналов. В интерфейсе отвображается список кканалов, пользователь может либо подключиться к существующему каналу, либо создать новый. Сообщения доставляются пользователю без обновления страницы.

Интерфейс системы представляет собой веб-страницу со списком каналов, отсортированных в хронологическом порядке их добавления, и форму добавления нового канала. В списке каналов у каждого канала есть кнопка перехода на сам канал. Интерфейс канала представляет собой список сообщений, отсортированных в хронологическом порядке их добавления, форму добавления нового сообщения и кнопку возврата к списку каналов.

Возможности пользователей:

- добавление каналов
- добавление сообщений в каналы

Ход работы
------------------------

- Разработать пользовательский интерфейс
- Описать сценарии работы
- Описать API сервера и хореографию
- Описать структуру БД и алгоритмы обработки данных
- Написать программный код
- Удостовериться в корректности кода

#### [1. Пользовательский интерфейс]
<br>[Страница чатов](https://github.com/Galimimus/laba_3/blob/main/Screenshot%20from%202023-01-17%2003-28-49-1.png)

#### 2. Пользовательский сценарий работы
Пользователь регистрируется на сайте или входит в уже существующий аккаунт по логину и паролю. На странице чатов отображаются все чаты с публичным доступом и те чаты с приватным доступом, к которым принадлежит пользователь.
Пользователь может создать чат с приватным или публичным доступом. Пользователь может присоединиться к уже существующим публичным чатам или может быть добавлен по его id в приватный или публичный чат другим пользователем, находящимся в этом чате. Пользователь может отправлять сообщения и общаться с другими.

#### 3. [API сервера и хореография](https://sequencediagram.org/index.html#initialData=IYYwLg9gTgBI+CCD4QQ3CCBkQQ7CAMEwggGEEEIghWEFQCgAHYKMASxErIDswZBCEH0AEQTNooxVDHA1AFoAfC3ZsAXIH4QZOix5CKGJkCiIAkAsIIA4QXMpiBBEEwJAnCAxsgLhAz2QMIggXhBcXUFQBuwMAFNmbDqy485-RQAeQUExbwkQAAtXAGcAOkiwAFsAGy4AEzdHShd3T3Efblk+BSFRL0kYdQRARhBsTG0lQHEQPC4ibNyPMM4i3nkBFGDQitYJarrMJHwbTXwYFtxsXRr1GE0YGyWo2ITktKJMjtcukd9i-sURbtGYGT1AHhAEXFZ8XCU9BFrASRBpzUB5EAc4Byx3y3jOfQCqCG1wktRsWCmMzmH2+vxM6iQf3meCWmxg2zA8USqQyWSBnVBPT8JQGVxGEg22Ckmj0eHenxqPyRbSOeWu4P8pUGIRh43qiNm+g5XP+y1W60w2J0eIJRL2pN5JwKAppl3KBQZYoab1u50hAPa5JB-N6goG0PpRolcxkENKWJkMHwgGYQBAwSjpXQLDVWvmnW26sow112xTKQDSIGotDpNGh9IYfX7zJZbItAc5reHqRcoSL6SkIABzSh0XYkg5kgthgpAA)


#### 4. Структура базы данных

 Таблица *chats*
| Название | Тип | NULL | Описание |
| :------: | :------: | :------: | :------: |
| **id** | INT  | NO | Автоматический идентификатор чата |
| **name** | VARCHAR(255) | NO | Название чата |
| **access** | VARCHAR(255) | NO | Доступ("private"/"public") |


 Таблица *messages*
| Название | Тип | NULL | Описание |
| :------: | :------: | :------: | :------: |
| **id** | INT  | NO | Автоматический идентификатор строки |
| **chat_id** | INT | NO | Автоматический идентификатор чата |
| **user_id** | INT | NO | Автоматический идентификатор пользователя |
| **message** | VARCHAR(255) | NO | Текст сообщения |

Таблица *users*
| Название | Тип | NULL | Описание |
| :------: | :------: | :------: | :------: |
| **id** | INT  | NO | Автоматический идентификатор пользователя  |
| **password** | VARCHAR(512) | NO | Пароль |
| **name** | VARCHAR(255) | NO | Логин |

 Таблица *users_chats*
| Название | Тип | NULL | Описание |
| :------: | :------: | :------: | :------: |
| **user_id** | INT  | NO | Автоматический идентификатор пользователя |
| **chat_id** | INT | NO | Автоматический идентификатор чата |


#### 6. HTTP запрос/ответ
**Запрос**  
<br>Request URL: http://localhost/laba_3/chats.html
<br>Request Method: GET
<br>Status Code: 200 OK
<br>Remote Address: [::1]:80
<br>Referrer Policy: strict-origin-when-cross-origin
<br>Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
<br>Accept-Encoding: gzip, deflate, br
<br>Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7
<br>Cache-Control: no-cache
<br>Connection: keep-alive
<br>Cookie: PHPSESSID=v0epsvq16h457ln4jdb1h8evj1
<br>DNT: 1
<br>Host: localhost
<br>Pragma: no-cache
<br>Referer: http://localhost/laba_3/login.html
<br>sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
<br>sec-ch-ua-mobile: ?0
<br>sec-ch-ua-platform: "Linux"
<br>Sec-Fetch-Dest: document
<br>Sec-Fetch-Mode: navigate
<br>Sec-Fetch-Site: same-origin
<br>Sec-Fetch-User: ?1
<br>Upgrade-Insecure-Requests: 1
<br>User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36

**Ответ**
<br>Accept-Ranges: bytes
<br>Connection: Keep-Alive
<br>Content-Encoding: gzip
<br>Content-Length: 521
<br>Content-Type: text/html
<br>Date: Tue, 17 Jan 2023 01:01:55 GMT
<br>ETag: "5fc-5f257ddcd90ae-gzip"
<br>Keep-Alive: timeout=5, max=100
<br>Last-Modified: Mon, 16 Jan 2023 01:54:40 GMT
<br>Server: Apache/2.4.52 (Ubuntu)
<br>Vary: Accept-Encoding
#### 7. Значимые фрагменты кода
**Функции отправления данных клиенту(helpers.php)**
```php
function return_ok($data, $code)
{
    http_response_code($code);
    $result = array(
        "ok" => true,
        "result" => $data
    );
    header('Content-Type: application/json');
    echo json_encode_objs($result);
    die();
}

function return_error($detail, $code)
{
    http_response_code($code);
    $result = array(
        "ok" => false,
        "detail" => $detail,
        "code" => $code
    );
    header('Content-Type: application/json');
    echo json_encode_objs($result);
    die();
}

function json_encode_objs($item)
{
    if (is_object($item) || (is_array($item)&&isAssoc($item))) {
        $pieces = array();
        foreach ($item as $k => $v) {
            $pieces[] = "\"$k\":" . json_encode_objs($v);
        }
        return '{' . implode(',', $pieces) . '}';
    } else if(is_array($item)) {
        $pieces = array();
        foreach ($item as $k => $v) {
            $pieces[] = json_encode_objs($v);
        }
        return '[' . implode(',', $pieces) . ']';
    }else{
        return json_encode($item);
    }

}


function isAssoc(array $arr)
{
    if (array() === $arr) return false;
    return array_keys($arr) !== range(0, count($arr) - 1);
}
```
**Получение Имени и ID пользователя из LocalStorage(chats.js)**
```js
const hello = document.getElementById('hello');
const hello2 = document.getElementById('hello2');

hello.innerHTML = `Hello, ${localStorage.getItem('username')}`;
hello2.innerHTML = `User ID: ${localStorage.getItem('userid')}`;
```

**Сохранение Имени и ID пользователя в LocalStorage(login.js, signup.js)**
```js
localStorage.setItem('username', name);
localStorage.setItem('userid', data.result.id);
```
