type Props = { error?: string };

export default function FormError({ error }: Props) {
  return <p className="text-sm text-danger font-medium my-1">{error}</p>;
}
