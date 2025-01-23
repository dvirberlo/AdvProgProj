export const FileInput = ({ name, text, accept, required }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{text}</label>
      <input
        type="file"
        accept={accept}
        className="form-control"
        name={name}
        required={required}
      />
    </div>
  );
};

export const TextInput = ({
  name,
  text,
  maxLength,
  required,
  onChange,
  value,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{text}</label>
      <input
        type="text"
        className="form-control"
        name={name}
        maxLength={maxLength}
        required={required}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export const NumberInput = ({
  name,
  text,
  min,
  max,
  required,
  onChange,
  value,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{text}</label>
      <input
        type="number"
        className="form-control"
        name={name}
        min={min}
        max={max}
        required={required}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export const TextareaInput = ({
  name,
  text,
  maxLength,
  required,
  onChange,
  value,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{text}</label>
      <textarea
        type="text"
        className="form-control"
        name={name}
        maxLength={maxLength}
        required={required}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export const CheckboxInput = ({ name, text, onChange, checked, ...props }) => {
  return (
    <div className="form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id={`${name}_CheckboxInput`}
        name={name}
        onChange={onChange}
        checked={checked}
        {...props}
      />
      <label className="form-check-label" htmlFor={`${name}_CheckboxInput`}>
        {text}
      </label>
    </div>
  );
};
