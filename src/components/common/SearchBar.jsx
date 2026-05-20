import Input from "./Input";

function SearchBar({
  placeholder,
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md mb-8">
      <Input
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;