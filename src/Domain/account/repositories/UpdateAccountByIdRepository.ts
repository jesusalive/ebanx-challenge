export interface UpdateAccountData {
  balance: number
}

export interface UpdateAccountByIdRepository {
  updateById: (id: string, data: UpdateAccountData) => Promise<void>
}
