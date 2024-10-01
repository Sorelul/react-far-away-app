export default function Stats({ items }) {
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
