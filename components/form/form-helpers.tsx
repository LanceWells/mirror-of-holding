export type TextInputProps = {
  fieldDisplayName: string;
  defaultValue: string;
}

function TextInput(props: TextInputProps) {
  const {
    fieldDisplayName,
    defaultValue
  } = props;

  return (
    <>
      <h2>{fieldDisplayName}</h2>
      <input
        type="text"
        defaultValue={defaultValue}
        id={fieldDisplayName}
        name={fieldDisplayName}
      />
    </>
  )
}

export {
  TextInput,
}
