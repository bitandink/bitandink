export type PlaygroundScene =
  | "idle"
  | "chasing"
  | "fallen"
  | "comforting"
  | "gift";

export type PlaygroundObserver =
  | "pama"
  | "bitandink"
  | null;

export type SessionLog = {
  id: number;
  time: string;
  level: string;
  message: string;
};

export type EnvSendState =
  | "idle"
  | "sending"
  | "sent"
  | "error";