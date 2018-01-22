import { Injectable } from '@angular/core';

// TODO: Use this service to create a loading page.

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }

}
