let name = 'no name';
let room = 'my_room';
let id = null;
const socket = io();
function appendMessage(user, message, type) {
  console.log(user);
  let mainDiv = new (function () {
    this.node = document.createElement("div");
    this.node.class = "message";
    this.node.append("\r\n\t\t");
    this.node.append(new (function () {
      this.node = document.createElement("h4");
      this.node.append(user ? user : "");
      return this.node;
    })());
    this.node.append("\r\n\t\t");
    this.node.append(new (function () {
      this.node = document.createElement("p");
      this.node.append(message);
      return this.node;
    })());
    this.node.append("\r\n\t");
    return this.node;
  })();
  mainDiv.classList.add(type);
  document.querySelector('.container').appendChild(new (function () {
    this.node = document.createElement("div");
    this.node.setAttribute("class", "msg");
    this.node.append(mainDiv);
    return this.node;
  })());
}
function getUsername() {
  let ask = prompt('Please enter your name');
  if (ask.length > 2) {
    name = ask;
  } else {
    alert("Name length requires at least 3 chars!");
    getUsername();
  }
}
getUsername();
const chatForm = document.getElementById('send-container');
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const messageInput = document.getElementById('messageInp');
  const message = messageInput.value.trim();
  if (message !== '') {
    let msg_data = {
      user: name,
      message: message
    };
    socket.emit('sendMessage', msg_data);
    messageInput.value = '';
  }
});
socket.on('message', data => {
  console.log(data);
  let user = data.username;
  let id = data.id;
  let message = data.text;
  if (id == socket.id) appendMessage(user, message, 'message-right'); else if (id == null) appendMessage(null, message, 'message-center'); else appendMessage(user, message, 'message-left');
  const messageArea = document.querySelector('.container');
  messageArea.scrollTop = messageArea.scrollHeight;
});
socket.on('connect', e => {
  socket.emit('joinRoom', {
    user: name,
    room: room
  });
});
