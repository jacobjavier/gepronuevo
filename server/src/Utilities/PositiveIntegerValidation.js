export default function PositiveIntegerValidation(value) {
  if (isNaN(value)) return false;
  if (value < 0) return false;
  if (value % 1 !== 0) return false;
  return true;
}
