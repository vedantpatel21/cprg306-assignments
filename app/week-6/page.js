import ItemList from './item-list';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}
