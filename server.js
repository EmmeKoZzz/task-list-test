import express from 'express';
import cors from 'cors'

// Mock Class for TodoEntries
class TODOEntry {
	constructor(title, {description, endAt}) {
		this.id = countId;
		this.title = title;
		this.description = description;
		this.endAt = endAt;
		this.state = false;
		this.createAt = new Date();
		countId++;
	}

	id;
	title;
	description;
	state;
	endAt;
	createAt;
}

// SERVER
const app = express();
const port = 3000;

// Server State
let countId = 0;
let todoList = [
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'}),
	new TODOEntry('You can specify how many digits', {description: 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'})
]

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONTROLLERS
// Get ToDoList
app.get('/', (req, res) => res.send(todoList));

// Create a new entry
app.post('/', ({body: {title, description, endAt}}, res) => {
	if (!title) return res.status(400).json({error: 'Title is required'})
	const newEntry = new TODOEntry(title, {description, endAt});
	todoList.push(newEntry);

	return res.send(newEntry);
});

// Edit entry 
app.put('/:id', ({body, params}, res) => {
	const entryId = params.id;
	const ix = findEntry(entryId);
	if (ix === -1) return res.status(404).json({error: "Not found any entry with id of: " + entryId})

	todoList[ix].title = body.title;
	todoList[ix].description = body.description;
	todoList[ix].endAt = body.endAt;

	return res.send(todoList[ix]);
})

// Change entry status
app.patch('/:id', ({body, params}, res) => {
	const ix = findEntry(entryId);
	if (ix === -1) return res.status(404).json({error: 'Not found any entry with id of: ' + entryId});

	todoList[ix].state = true;

	return res.send(todoList[ix]);
});

// Delete entry 
app.delete('/:id', ({params: {id: entryId}}, res) => {
	const ix = findEntry(entryId);
	if (ix === -1) return res.status(404).json({error: "Not found any entry with id of: " + entryId})

	todoList.splice(ix, 1)
})

// Helpers
function findEntry(entryId) {
	return todoList.findIndex((entry) => entry.id === entryId)
}

// APP Builder
app.listen(port, () => {
	console.log(`Express Server listening to port ${port}`);
})