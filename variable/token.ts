import jwt from 'jsonwebtoken'

export const SECRETHASH = "7171551ddf78a85163cff81774f4cd04bdcb4a9dfc85787d2b17401d12a3f3888774114d1950ed082e14e2b29d7a1e8ebe067a5b055b7c9fd00cbc31642ca43a"

export interface TokenData {
  userid: string,
  name: string,
  grade: number,
  class: number,
  class_number: number,
}

export function verify(token: string) {
  return jwt.verify(token, SECRETHASH) as TokenData
}