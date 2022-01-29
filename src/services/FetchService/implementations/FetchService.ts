import { IFetchService } from '../IFetchService';

export class FetchService implements IFetchService {
  private authToken: string;

  public constructor(authToken = '839325229d0c457db3c784d95d8ea9af') {
    this.authToken = authToken;
  }

  public async fetch<Resp extends Record<string, any> = Record<string, any>>(
    url: string,
  ): Promise<Resp> {
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': this.authToken,
      },
    });

    return response.json();
  }
}
