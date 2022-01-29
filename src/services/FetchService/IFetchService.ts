export interface IFetchService {
  fetch<Resp extends Record<string, any>>(url: string): Promise<Resp>;
}
