const Item = ({ name, quantity, category }) => {
    return (
      <li className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <span className="font-bold">{name}</span> - {quantity} ({category})
        </div>
      </li>
    );
  };
  
  export default Item;
  