export type SocketData = {
  id: string;
  username: string;
  memberId: string;
};

export type AcknowledgementCallback<T> = (
  arg:
    | {
        message: string;
        success: true;
        data: T;
      }
    | { message: string; success: false; data: null },
) => void;
