import express from 'express'

// Mock Class for TodoEntries
class TODOEntry {
	constructor(title, description) {
		this.id = countId;
		this.title = title;
		this.description = description;
		this.createAt = new Date();
		countId++;
	}

	id;
	title;
	description;
	createAt;
}

const app = express();
const port = 3000;

let countId = 0;
let todoList = []

app.use(express.json());

// Get ToDoList
app.get('/', (req, res) => res.send(todoList));

// Create a new entry
app.post('/', ({body: {title, description}}, res) => {
	if (!title) return res.status(400).json({error: 'Title is required'})
	const newEntry = new TODOEntry(title, description);
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

	return todoList[ix];
})

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

app.listen(port, () => {
	console.log(`Express Server listening to port ${port}`);
})