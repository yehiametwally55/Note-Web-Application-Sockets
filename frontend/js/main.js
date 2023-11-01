const socket = io("http://localhost:3000")
let allNotes = []
const myInput = document.getElementById("chatMessage");

socket.on("connect", (x)=>{
    socket.emit("load")
})

function addNote(){
    let note = {
        name:document.getElementById("noteTitle").value,
        description: document.getElementById("notedesc").value
    }
    socket.emit("addNote", note)
   
}

socket.on("allData",(data)=>{
    console.log(data);
    allNotes = data
    displayData();
});

function displayData(){
    let cartona = ``;
    for (let i = 0; i < allNotes.length; i++) {
        cartona += ` <div class="col-md-4 mb-5">
        <div class="border bg-white text-dark rounded-3 p-5 text-center">
          <h3>${allNotes[i].name}</h3>
          <p>${allNotes[i].description}</p>
          <button class="btn btn-danger" onclick="DeleteNote('${allNotes[i]._id}')">Delete</button>
        </div>
      </div>`   
    }
    document.getElementById("rows").innerHTML = cartona
}

function DeleteNote(id){
    socket.emit("DeleteNote",id)
}
