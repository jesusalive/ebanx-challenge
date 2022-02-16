import { Account } from '@/Domain/account/Account'

export interface TransferResult {
  origin: Account
  destination: Account
}

export interface Transfer {
  do: (amount: number, originAccountId: string, destinationAccountId: string) => Promise<TransferResult>
}
