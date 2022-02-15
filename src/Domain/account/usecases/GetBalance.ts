export interface GetBalance {
  get: (accountId: string) => Promise<number>
}
