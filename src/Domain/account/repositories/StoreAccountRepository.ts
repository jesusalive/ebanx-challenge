import { Account } from '@/Domain/account/Account'

export interface StoreAccountRepository {
  store: (account: Account) => Promise<void>
}
