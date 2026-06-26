import Input from "./Input";

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl px-4 py-3 outline-none border
          ${
            error
              ? "border-red-500"
              : "border-gray-300"
          }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
export default FormField;