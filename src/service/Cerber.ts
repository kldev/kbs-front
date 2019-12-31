import * as signalR from '@microsoft/signalr';
import { uuid } from 'uuidv4';

type resolvePromise = (result: string) => void;

export class Cerber {
  private static instance: Cerber;
  private constructor() {
    this._connected = false;
  }

  static getInstance() {
    if (!Cerber.instance) {
      Cerber.instance = new Cerber();
      // ... any one time initialization goes here ...
    }
    return Cerber.instance;
  }

  private _token: String = '';
  private _connected: boolean;

  private _connection: signalR.HubConnection | null = null;
  private _map: Map<string, resolvePromise> = new Map();

  public set Token(value: string) {
    this._token = value;
  }

  private delay(wait: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, wait);
    });
  }

  public async connect(): Promise<number> {
    if (this._connected === false || !this._connection) {
      console.log('Connecting new: ' + Date());
      this._connection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect([500, 1000, 5000])
        .configureLogging(signalR.LogLevel.Information)
        .withUrl('http://localhost:14333/cerberhub')
        .build();

      this._connection.on('ResponseProxy', this.handleResponseProxy);
      this._connection.onclose = er => {
        this._connected = false;
      };

      let tryCount = 0;
      try {
        await this._connection.start();

        while (this._connection.state !== signalR.HubConnectionState.Connected) {
          await this.delay(500);
          tryCount++;

          if (tryCount === 10) {
            this._connected = false;
            break;
          }
        }
        this._connected = true;
      } catch (err) {
        console.error('his._connection.start() -> Error:', err);
        this._connected = false;
      }
    }

    return 0;
  }

  private handleResponseProxy = (guid: string, result: string) => {
    console.info(`ResponseProxy for ${guid}`);

    if (this._map.get(guid)) {
      const resolve = this._map.get(guid) as (value: string) => void;

      resolve(result);

      this._map.delete(guid);
    }
  };

  public callProxy(path: string, payload: string, method: string, token: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const guid = uuid();
      this._map.set(guid, resolve);

      this.connect()
        .then(() => {
          if (this._connection) {
            if (this._connection.state === signalR.HubConnectionState.Connected) {
              this._connection.send('Proxy', path, payload, method, token, guid);
            } else {
              reject('Connection not ready???');
            }
          }
        })
        .catch(err => {
          console.error('this.connect -> Error:', err);
        });
    });

    return promise;
  }
}
