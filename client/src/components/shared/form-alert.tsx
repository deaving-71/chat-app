type Props = { message?: string };

function FormError({ message }: Props) {
  return <p className="my-1 text-[12px] font-medium text-danger">{message}</p>;
}

function FormSuccess({ message }: Props) {
  return <p className="my-1 text-[12px] font-medium text-success">{message}</p>;
}

export { FormError, FormSuccess };
