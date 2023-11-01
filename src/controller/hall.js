let rooms = [{
    roomId:"R1",
    seatsAvailable:"10",
    amenities:"TV,Ac",
    pricePerHour:"100"
}];
let bookings = [{
    customer: "Dheena",
    bookingDate:"10/10/2023",
    startTime: "12:00pm",
    endTime: "11:59am",
    roomId: "R1",
    status: "booked" 
}
];
let customers = [
    { name: 'Dheena',
     bookings: [ 
        {
            customer: 'Dheena',
            bookingDate:"10/10/2023",
            startTime: '12:00pm',
            endTime: '11:59am',
            roomId: 'R1',
            status: 'booked'  
          }
      ] }
];

const getDetails=(req,res)=>{
  res.send("Hall Booking API")
}


// List all Rooms and its details
const getAllRooms=(req, res)=> {
    res.status(200).send({
      message:"Room Data Fetched Successfully",
      count:rooms.length,
      RoomsList : rooms});
  }

//creating room
const createRoom=(req,res) => {
    const room = req.body;
    const idExists = rooms.find((el)=> el.roomId === room.roomId)
    if(idExists !== undefined){
        return res.status(400).send({message:"Room already exists."});
    }
    else{
    rooms.push(room);
    res.status(201).send({message:"Room created successfully"});
}
}

//booking room
const bookingRoom=(req,res)=>{
    try{
      const {id} = req.params;
      let bookRoom = req.body; 
      let date = new Date();
      let dateFormat = date.toLocaleDateString();
      let idExists = rooms.find((el)=> el.roomId === id)
      if(idExists === 0){
          return res.status(400).send({message:"Room does not exist.", RoomsList:rooms});
  
      }
  
      let matchID = bookings.filter((b)=> b.roomId===id) 
      if(matchID.length > 0){
          let dateCheck = matchID.filter((m)=>{ return m.bookingDate === bookRoom.bookingDate});
          if(dateCheck.length===0){
              let newbooking = {...bookRoom, roomId:id, status:"booked"}
              bookings.push(newbooking);
              return res.status(201).send({message:"Room booked", Bookings:bookings, added:newbooking});
          }
          else{
              return res.status(400).send({message:"Room already booked for this date", Bookings:bookings});
          }
      }
      else{
              let newbooking = {...bookRoom, roomId:id, status:"booked"}
              bookings.push(newbooking);
              const customerdetails = customers.find(cust => 
                cust.name === newbooking.customer);
                if (customerdetails) {
                    customerdetails.bookings.push(newbooking);
                } else {
                    customers.push({ name:newbooking.customer,bookings:[newbooking]});
                }
              return res.status(201).send({message:"Room booked", Bookings:bookings, added:newbooking});
  
      }
    }
    catch(error){
        res.status(400).send({message:"Error booking room", error: error, data:bookings});
    }
}

// List all the booked room
const getAllBookedRooms=(req,res) => {
    const bookedRooms = bookings.map(booking => {
        const {roomId ,status,customer,bookingDate,startTime,endTime} = booking;
        return {roomId ,status,customer,bookingDate,startTime,endTime} 
    });
    res.status(201).send(bookedRooms);
}

//List all the customers with booked data
const getAllCustomers=(req, res) => {
    const customerBookings = customers.map(customer => {
      const { name, bookings } = customer;
      const customerDetails = bookings.map(booking => {
        const { roomId, bookingDate, startTime, endTime } = booking;
        return { name, roomId, bookingDate, startTime, endTime };
      });
     
      return customerDetails;
    })
   
    res.send(customerBookings);
  }

// List how many times the user booked the room
 const getBookingCountByCustomer=(req, res) => {
    const { name } = req.params;
    const customer = customers.find(cust => cust.name === name);
    if (!customer) {
      res.status(404).send({ error: 'Customer not found' });
      return;
    }
    const customerBookings = customer.bookings.map(booking => {
      const { customer,roomId, startTime, endTime, status, bookingDate} = booking;
      return { customer, roomId, startTime, endTime, status, bookingDate};
    });
    res.send({
        count:customerBookings.length,
        customerBookings});
  }


  module.exports = {
    getDetails,
    getAllRooms,
    createRoom,
    bookingRoom,
    getAllBookedRooms,
    getAllCustomers,
    getBookingCountByCustomer
}