const _ = require('lodash');
const fs = require('fs');
const notes = require('./notes.js')
const yargs = require('yargs');

const titleOptions ={
        describe:'Title of note',
        demand:true,
        alias:"t"
}
const bodyoptions = {
    describe:"body of note",
    demand:true,
    alias:'b'
}

const argv = yargs
.command('add','Add a new note', {
title: titleOptions,
        body: bodyoptions
})

.command('list',"List all notes")
.command('read',"Read a note",{
    title:titleOptions
})
.command('remove','remove a note',{
    title:titleOptions,
})
.help()
.argv;

let command = argv._[0];
console.log("Command " , command);

if (command === 'add') {
   let note = notes.addNote(argv.title,argv.body);
   if (note) {
       console.log('note created');
       notes.logNote(note);
   }else {
       console.log('Note title taken');
   }
}else if (command === "list") {
    let listAll = notes.getAll();
    console.log("getting all the notes");
    listAll.forEach((note) => notes.logNote(note));
}else if (command === "read") {
    let read = notes.getNote(argv.title);
    if(read) {
        console.log('Note fouond');
        notes.logNote(read);
    }else {
        console.log('Note not found');
    }
}else if (command === "remove") {
    let noteRemoved = notes.remove(argv.title);
    let message = noteRemoved ? 'Note was removed': 'Note was found';
    console.log(message);

}
else {
    console.log('command not recognized');
}