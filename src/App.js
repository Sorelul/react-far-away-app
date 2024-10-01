import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) => items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
    }

    function handleDeleteItems() {
        const confirmed = window.confirm("Are you sure you want to clear the list ?");
        if (confirmed) {
            setItems([]);
        }
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                onDeleteItems={handleDeleteItems}
            />
            <Stats items={items} />
        </div>
    );
}

function Logo() {
    return <h1>🧳 Far Away ✈️</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event) {
        event.preventDefault();

        if (!description.trim()) {
            return;
        }

        const newItem = { id: Date.now(), description, quantity, packed: false };

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip ?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem, onToggleItem, onDeleteItems }) {
    const [sortBy, setSortBy] = useState("input");
    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description")
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul style={{ overflow: "hidden" }}>
                {sortedItems.map((item) => (
                    <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />
                ))}
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button type="button" onClick={onDeleteItems}>
                    Clear list
                </button>
            </div>
        </div>
    );
}

function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => {
                    onToggleItem(item.id);
                }}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
                <button onClick={() => onDeleteItem(item.id)}>❌</button>
            </span>
        </li>
    );
}

function Stats({ items }) {
    if (!items.length) {
        return (
            <p className="stats">
                <em>😁 Start adding some items before starting your journey. 😎</em>
            </p>
        );
    }

    const numItems = items.length;
    const numPacked = items.filter((items) => items.packed).length;
    const percentage = numItems > 0 ? Math.round((numPacked / numItems) * 100) : 0;
    return (
        <footer className="stats">
            <em>
                {percentage === 100
                    ? "Everything packed up, ready to go ? 😍"
                    : `You have ${numItems} items in your list, and you already packed ${numPacked} (${percentage}%) items.`}
            </em>
        </footer>
    );
}
