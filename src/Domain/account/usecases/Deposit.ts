import { Account } from '@/Domain/account/Account'

export interface Deposit {
  do: (amount: number, accountId: string) => Promise<Account>
}
