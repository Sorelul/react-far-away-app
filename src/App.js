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

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} />
            <Stats />
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

function PackingList({ items, onDeleteItem }) {
    return (
        <div className="list">
            <ul style={{ overflow: "hidden" }}>
                {items.map((item) => (
                    <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
                <button onClick={() => onDeleteItem(item.id)}>❌</button>
            </span>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>You have X items in your list, and you already packed X (X%) items.</em>
        </footer>
    );
}
