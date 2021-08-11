import { networkInterfaces } from 'os';
import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SignalingEventType, SignalingEvent } from 'peer-data';

@WebSocketGateway()
export class SignalingGateway {
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() event: SignalingEvent,
    @ConnectedSocket() socket: Socket
  ): void {
    event.caller = {
      id: socket.id,
    };

    socket.emit('log', 'SERVER_LOG', event);

    switch (event.type) {
      case SignalingEventType.CONNECT:
        socket.join(event.room.id);
        socket.broadcast.to(event.room.id).emit('message', event);
        break;
      case SignalingEventType.DISCONNECT:
        socket.leave(event.room.id);
        socket.broadcast.to(event.room.id).emit('message', event);
        break;
      case SignalingEventType.OFFER:
      case SignalingEventType.ANSWER:
      case SignalingEventType.CANDIDATE:
        socket.broadcast.to(event.callee.id).emit('message', event);
        break;
      default:
        socket.broadcast.to(event.room.id).emit('message', event);
    }
  }

  @SubscribeMessage('ipaddr')
  handleIpaddr(@ConnectedSocket() socket: Socket) {
    Object.values(networkInterfaces()).forEach((dev) => {
      dev
        .filter(
          (details) =>
            details.family === 'IPv4' && details.address !== '127.0.0.1'
        )
        .forEach((details) => {
          socket.emit('ipaddr', details.address);
        });
    });
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    socket.broadcast.emit({
      type: SignalingEventType.DISCONNECT,
      caller: { id: socket.id },
      callee: null,
      room: null,
      data: null,
    });
  }
}
