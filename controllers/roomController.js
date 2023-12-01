/** @format */

const rooms = [];
const bookings = [];

const createRoom = (req, res) => {
  const { roomName, seats, amenities, pricePerHour } = req.body;
  const room = {
    roomId: rooms.length + 1,
    roomName,
    seats,
    amenities,
    pricePerHour,
  };
  rooms.push(room);
  res.json({ success: true, room });
};

const bookRoom = (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;
  const room = rooms.find((r) => r.roomId === roomId);
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const booking = {
    customerName,
    date,
    startTime,
    endTime,
    roomId,
    bookingId: bookings.length + 1,
    bookingDate: new Date(),
    status: "Booked",
  };
  bookings.push(booking);
  res.json({ success: true, booking });
};

const getAllBookedRoom = (req, res) => {
  const roomList = rooms.map((room) => {
    const booking = bookings.find((b) => b.roomId === room.roomId);
    return {
      roomName: room.roomName,
      bookedStatus: booking ? "Booked" : "Available",
      customerName: booking ? booking.customerName : null,
      date: booking ? booking.date : null,
      startTime: booking ? booking.startTime : null,
      endTime: booking ? booking.endTime : null,
    };
  });
  res.json(roomList);
};

const getAllCustomerData = (req, res) => {
  const customerList = bookings.map((booking) => {
    const room = rooms.find((r) => r.roomId === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room ? room.roomName : null,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });
  res.json(customerList);
};

const bookedCount = (req, res) => {
  const { customerName } = req.params;
  const customerHistory = bookings
    .filter((booking) => booking.customerName === customerName)
    .map((booking) => ({
      customerName: booking.customerName,
      roomName: rooms.find((r) => r.roomId === booking.roomId).roomName,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.bookingId,
      bookingDate: booking.bookingDate,
      status: booking.status,
    }));
  res.json(customerHistory);
};

export default {
  createRoom,
  bookRoom,
  getAllBookedRoom,
  getAllCustomerData,
  bookedCount,
};
