import { Server as SocketIOServer } from 'socket.io';

export const setupSocketIO = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log(`🔌 [Socket.io] Client connected: ${socket.id}`);

    // Join room (e.g. order tracking or vendor room)
    socket.on('join_order_room', (orderId: string) => {
      socket.join(`order_${orderId}`);
      console.log(`Socket ${socket.id} joined order room order_${orderId}`);
    });

    socket.on('join_vendor_room', (vendorId: string) => {
      socket.join(`vendor_${vendorId}`);
    });

    // Rider location stream
    socket.on('rider_location_update', (data: { orderId: string; lat: number; lng: number }) => {
      io.to(`order_${data.orderId}`).emit('rider_position', {
        lat: data.lat,
        lng: data.lng,
        timestamp: new Date(),
      });
    });

    // Order status update broadcast
    socket.on('order_status_change', (data: { orderId: string; status: string; message: string }) => {
      io.to(`order_${data.orderId}`).emit('order_status_updated', data);
      io.emit('global_order_feed', data);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 [Socket.io] Client disconnected: ${socket.id}`);
    });
  });
};
