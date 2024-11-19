import express from 'express';
import cors from 'cors'

// Mock Class for TodoEntries
class TODOEntry {
	constructor(title, description) {
		this.id = countId;
		this.title = title;
		this.description = description;
		this.state = false;
		this.createAt = new Date();
		countId++;
	}

	id;
	title;
	description;
	state;
	createAt;
}

// SERVER
const app = express();
const port = 3000;

// Server State
let countId = 0;
let todoList = [
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.'),
	new TODOEntry('You can specify how many digits', 'The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.')
]

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONTROLLERS
// Get ToDoList
app.get('/', ({query}, res) => {
	let {page, size} = query
	if (!page) return res.send({data: todoList, count: todoList.length})

	page = parseInt(page);
	size = parseInt(size);
	if (isNaN(page) || isNaN(size) || page < 1 || page > Math.ceil(todoList.length / size))
		return res.status(400).json({error: 'Pagination params invalid'})

	const data = todoList.slice((page - 1) * size, page * size)
	return res.send({data, count: todoList.length})
});

// Create a new entry
app.post('/', ({body, query}, res) => {
	const {title, description} = body;
	if (!title) return res.status(400).json({error: 'Title is required'})
	const newEntry = new TODOEntry(title, description);

	todoList = [newEntry].concat(todoList);

	return res.send({newEntry});
});

// Edit entry 
app.put('/:id', ({body, params}, res) => {
	const entryId = params.id;
	const ix = findEntry(entryId);
	if (ix === -1) return res.status(404).json({error: "Not found any entry with id of: " + entryId})

	todoList[ix].title = body.title;
	todoList[ix].description = body.description;

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