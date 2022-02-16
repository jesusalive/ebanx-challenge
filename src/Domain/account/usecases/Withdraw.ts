import { Account } from '@/Domain/account/Account'

export interface Withdraw {
  do: (amount: number, accountId: string) => Promise<Account>
}
