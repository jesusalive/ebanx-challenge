import { Account } from '@/Domain/account/Account'

export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<Account>
}
