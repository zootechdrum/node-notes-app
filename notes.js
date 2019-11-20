console.log("starting node.js");

const fs = require('fs');

const fetchNotes = () => {
    try {
        const noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch(e) {
        return [];
    }

};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes))
}

const addNote = (title,body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json',JSON.stringify(notes)); 
        saveNotes(notes);
        console.log("new note")   
        return note;
    }else{console.log("That shit is a dups")}


}

let getAll = () => {
    let notes = fetchNotes();
    return notes;
}

let getNote = (title) => {
    let note = fetchNotes();
    let noteRetrieve = note.filter((note) => note.title === title);
    return noteRetrieve[0];
};

const remove = (title) => {
    let notes = fetchNotes();
    let removeNote = notes.filter((note) => note.title !== title);
    saveNotes(removeNote);

    return notes.length !== removeNote.length

}

const logNote = (note) => {
    console.log("--");
    console.log(`Title: ${note.title}`);
    console.log(`Title: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    remove,
    logNote
}