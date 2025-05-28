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
    document.getElementById('noteTitle').value = "";
    document.getElementById('notedesc').value = "";
}

socket.on("allData",(data)=>{
    console.log(data);
    allNotes = data;
    displayData();
});

function displayData() {
    let cartona = ``;

    if (allNotes.length === 0) {
        cartona = `
            <div class="col-12">
                <div class="empty-state-message text-center">
                    <i class="fa-regular fa-note-sticky fa-5x mb-4"></i>
                    <h3>You have no notes yet.</h3>
                    <p>Add your first note using the form above!</p>
                </div>
            </div>
        `;
    } else {
        for (let i = 0; i < allNotes.length; i++) {
            cartona += `
            <div class="col-md-4 mb-4">
                <div class="note-card h-100">
                    <div class="note-header">
                        <h3 class="note-title">${allNotes[i].name}</h3>
                        <div class="note-actions">
                             <button class="btn-icon" onclick="DeleteNote('${allNotes[i]._id}')">
                               <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="note-description">${allNotes[i].description}</p>
                </div>
            </div>`;
        }
    }
    document.getElementById("rows").innerHTML = cartona;
}

function DeleteNote(id){
    socket.emit("DeleteNote",id)
}
