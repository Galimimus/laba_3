let ChatID=0;

getChats();

const hello = document.getElementById('hello');
const hello2 = document.getElementById('hello2');

hello.innerHTML = `Hello, ${localStorage.getItem('username')}`;
hello2.innerHTML = `User ID: ${localStorage.getItem('userid')}`;

function createChatButton(chats) {
    const chatsContainer = document.getElementById('chats');
    chats.forEach(chat => {
        const newChat = document.createElement('div');
        newChat.setAttribute('id', 'chat-' + chat.id);
        newChat.setAttribute('class', "bg-gray-800 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-100 dark:text-gray-800 font-bold mb-4");

        if(chat.user_id == null) {

        newChat.innerHTML = `
        <h3 class="text-xl font-bold mb-2 text-gray-100 dark:text-gray-800">${chat.name}</h3>
        <button class="bg-gray-600 dark:bg-gray-500 rounded-lg px-4 py-2 text-gray-100 dark:text-gray-800 font-bold" onclick="addUserToChannel(${chat.id}, '${chat.name}')">Start chat</button>
      `;

        } else {
            newChat.innerHTML = `
            <h3 class="text-xl font-bold mb-2 text-gray-100 dark:text-gray-800">${chat.name}</h3>
            <button class="bg-gray-600 dark:bg-gray-500 rounded-lg px-4 py-2 text-gray-100 dark:text-gray-800 font-bold" onclick="getMessages(${chat.id}, '${chat.name}')">View</button>
            `;
        }
        chatsContainer.appendChild(newChat);
    });
}

function getChats() {
    fetch('/laba_3/list_channels.php')
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            createChatButton(data.result);
        } 
    })
    .catch(error => console.log(error));
}

const createNewChatButton = document.getElementById('create-chat-button');

createNewChatButton.addEventListener('click', () => {
    const chatName = document.getElementById('chat-name');
    const chatAccess = document.getElementById('chat-access');
    const name = chatName.value;
    const access = chatAccess.value;

    fetch('/laba_3/add_channel.php?name=' + name + '&access=' + access)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            addUserToChannel(data.result.id, data.result.name);
            createChatButton([data.result]);
        }
    })
    .catch(error => console.log(error));
});

function createChat() {
    const chatName = document.getElementById('chat-name');
    const chatAccess = document.getElementById('chat-access');
    const name = chatName.value;
    const access = chatAccess.value;

    fetch('/laba_3/add_channel.php?name=' + name+'&access='+access)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            createChatButton([data.result]);
        } 
    })
    .catch(error => console.log(error));
}

function addUserToChannel(chatId, chatName) {
    fetch('/laba_3/add_user_to_channel.php?chat_id=' + chatId)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            const chat = document.getElementById('chat-' + chatId);
            chat.innerHTML = `
            <h3 class="text-xl font-bold mb-2 text-gray-100 dark:text-gray-800">${chatName}</h3>
            <button class="bg-gray-600 dark:bg-gray-500 rounded-lg px-4 py-2 text-gray-100 dark:text-gray-800 font-bold" onclick="getMessages(${chatId}, ${chatName})">View</button>
            `;
        } 
    })
    .catch(error => console.log(error));

}

function createMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    messages.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.setAttribute('class', "bg-gray-800 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-100 dark:text-gray-800 font-bold mb-4");
        newMessage.innerHTML = `
        <h3 class="text-xl font-bold mb-2 text-gray-100 dark:text-gray-800">${message.name}</h3>
        <p class="text-xl font-bold mb-2 text-gray-100 dark:text-gray-800">${message.message}</p>
        `;
        messagesContainer.appendChild(newMessage);
    });
}

function getMessages(chatId, chat_name) {
    ChatID = chatId;
    const addMessageBlock = document.getElementById('add-message');
    addMessageBlock.style.display = 'block';
    const addUser = document.getElementById('add-user');
    addUser.style.display = 'block';
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    const chatName = document.getElementById('chatName');
    chatName.innerHTML = `${chat_name}`;
    fetch('/laba_3/list_messages.php?chat_id=' + chatId)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            createMessages(data.result);
        } 
    })
    .catch(error => console.log(error));
}

const addUserButton = document.getElementById('add-user-button');

addUserButton.addEventListener('click', () => {
    const user = document.getElementById('user');
    const ChannelName = document.getElementById('chatName');
    fetch('/laba_3/add_user_to_channel.php?chat_id=' + ChatID+'&user_id='+user.value)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            addUserToChannel(ChatID, ChannelName.value);
        }
    })
    .catch(error => console.log(error));
});

const sendMessageButton = document.getElementById('send-message');

sendMessageButton.addEventListener('click', () => {
    const NewMessage = document.getElementById('message');
    message = NewMessage.value;
    fetch('/laba_3/add_message.php?chat_id=' + ChatID+'&message='+message)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            createMessages([data.result]);
        } 
    })
    .catch(error => console.log(error));
});
