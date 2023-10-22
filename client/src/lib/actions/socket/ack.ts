import { AcknowledgementCallback } from "@/types";

type Options<T> = {
  onSuccess: (data: T, message: string) => void;
  onError?: (message: string) => void;
};

/**
 * Acknoledgment function for socket emit events.
 */
function ack<T>({ onError, onSuccess }: Options<T>) {
  const cb: AcknowledgementCallback<T> = ({ data, message, success }) => {
    success
      ? onSuccess && onSuccess(data, message)
      : onError && onError(message);
  };

  return cb;
}

export default ack;
