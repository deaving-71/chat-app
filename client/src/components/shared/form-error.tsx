type Props = { error?: string };

export default function FormError({ error }: Props) {
  return <p className="my-1 text-sm font-medium text-danger">{error}</p>;
}
