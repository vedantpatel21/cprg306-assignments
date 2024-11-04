export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li 
      className="bg-white p-6 my-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      onClick={() => onSelect(name)}
    >
      <div className="font-bold text-xl capitalize text-gray-800">{name}</div>
      <div className="text-md italic text-gray-600">
        Buy {quantity} in <span className="text-blue-600">{category}</span>
      </div>
    </li>
  );
}
