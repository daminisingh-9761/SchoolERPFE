import Input from "./Input";

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="block mb-2 font-medium text-gray-700">
        {label}
      </label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

    </div>
  );
}

export default FormField;