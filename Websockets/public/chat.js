
const socket= io.connect();

function render (data){
    const html= data.map((elem, index)=>{
        return (`<div>
        <strong style="color:blue; font-weight: bold;">${elem.author}</strong>
        <em style="color:brown; ">${elem.time}</em>
        <em style="color:green; font-weight: italic;" >${elem.text}</em>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML= html
}

socket.on('messages', function(data) {render(data);});

function addMessage(e){
    let date = new Date();
    let dateStr =
    ("00" + date.getDate()).slice(-2) + "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
    
    const mensaje= {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        time: dateStr,
    };
    socket.emit('new message', mensaje);
    return false;

}
