import express from 'express';
const router = express.Router();

// Example in-memory data store
let data = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
];

// GET all items
router.get('/', (req, res) => {
  res.json(data);
});

// POST create a new item
router.post('/', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1; // Generate new ID
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT update an existing item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  const index = data.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE an item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = data.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    data.splice(index, 1);
    res.status(204).end(); // No content
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

export default router;
