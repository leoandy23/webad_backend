import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { sender: string; content: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.chatService.saveMessage(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join('chatroom');
    this.server.to('chatroom').emit('userJoined', username);
  }
}
