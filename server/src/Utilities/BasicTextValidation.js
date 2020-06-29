export default function BasicTextValidation(value) {
  if (value === undefined) return false;
  if (value === null) return false;
  if (value === NaN) return false;
  if (value === '') return false;
  return true;
}
