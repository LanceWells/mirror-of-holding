export type HaulChatPayload = {
  wants: {
    [key: string]: string
  },
  players: {
    [playerID: string]: Player
  }
}

export type Player = {
  playerID: string;
  name: string;
}
