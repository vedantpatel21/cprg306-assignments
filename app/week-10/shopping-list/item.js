export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      className="bg-yellow-400 p-4 my-2 rounded-md shadow-sm text-lg cursor-pointer hover:bg-yellow-300 hover:text-black"
      onClick={() => onSelect(name)}
    >
      <div className="font-bold capitalize">{name}</div>
      <div className="text-sm italic">Buy {quantity} in {category}</div>
    </li>
  );
}
