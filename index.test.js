const {
  Room,
  Booking,
} = require("./index.js");



test("Room is occupied, true", () => {
  const room = new Room("suite", [], 500, 20);
  const booking1 = new Booking(
    "Martina",
    "martina@gmail.com",
    "2022-01-01",
    "2022-01-15",
    20,
    room
  );
  const booking2 = new Booking(
    "Josefa",
    "josefa@gmail.com",
    "2022-02-16",
    "2022-02-30",
    10,
    room
  );

  room.bookings = [booking1, booking2];

  expect(room.isOccupied("2022-01-01")).toBe(true);
});

test("Room is occupied, true", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Maria",
    "maria@gmail.com",
    "2022-02-02",
    "2022-02-15",
    20,
    room
  );
  room.bookings = [booking];

  expect(room.isOccupied("2022-02-14")).toBe(true);
});

test("Room is occupied, false", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Maria",
    "maria@gmail.com",
    "2022-01-02",
    "2022-01-15",
    20,
    room
  );
  room.bookings = [booking];

  expect(room.isOccupied("2022-01-15")).toBe(true);
});

test("Room is occupied, false", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Maria",
    "maria@gmail.com",
    "2022-01-02",
    "2022-01-15",
    20,
    room
  );
  room.bookings = [booking];

  expect(room.isOccupied("2022-01-20")).toBe(false);
});


test("occupancyPercentage, 100%", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-05-01",
    "2022-05-10",
    10,
    room
  );
  room.bookings = [booking];

  expect(room.occupancyPercentage("2022-05-01", "2022-05-10")).toEqual(100);
});

test("occupancyPercentage, 50%", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-05-01",
    "2022-05-16",
    10,
    room
  );
  room.bookings = [booking];

  expect(room.occupancyPercentage("2022-05-01", "2022-05-31")).toBe(53);
});

test("occupancyPercentage, 45%", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-05-01",
    "2022-05-15",
    10,
    room
  );
  room.bookings = [booking];

  expect(
    room.occupancyPercentage("2022-05-01", "2022-05-31")
  ).toBeLessThanOrEqual(50);
});

test("occupancyPercentage, 100%", () => {
  const room = new Room("single", [], 300, 10);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-05-01",
    "2022-05-02",
    10,
    room
  );
  room.bookings = [booking];

  expect(room.occupancyPercentage("2022-05-01", "2022-05-02")).toBe(100);
});

test("occupancyPercentage, 7%", () => {
  const room = new Room("single", [], 300, 20);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-14",
    "2022-01-30",
    10,
    room
  );
  room.bookings = [booking];

  expect(
    room.occupancyPercentage("2022-01-01", "2022-01-15")
  ).toBeGreaterThanOrEqual(7);
});

test("occupancyPercentage, 36%", () => {
  const room = new Room("single", [], 300, 20);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-10",
    "2022-01-15",
    10,
    room
  );
  room.bookings = [booking];

  expect(room.occupancyPercentage("2022-01-01", "2022-01-15")).toBe(36);
});

test("occupancyPercentage, 0%", () => {
  const room = new Room("single", [], 300, 20);
  const booking = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-15",
    "2022-01-30",
    10,
    room
  );
  room.bookings = [booking];

  expect(room.occupancyPercentage("2022-01-01", "2022-01-15")).toBe(0);
});


test("availableRooms, room4, room5", () => {
  const room1 = new Room("single", [], 300, 10);
  const room2 = new Room("double", [], 200, 10);
  const room3 = new Room("suite", [], 100, 10);
  const room4 = new Room("single", [], 500, 10);
  const room5 = new Room("double", [], 600, 10);

  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    10,
    room1
  );
  const booking2 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-05",
    "2022-01-07",
    10,
    room2
  );
  const booking3 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-02",
    "2022-01-20",
    10,
    room3
  );
  const booking4 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-20",
    "2022-01-25",
    10,
    room4
  );
  const booking5 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-17",
    "2022-01-30",
    10,
    room5
  );

  room1.bookings = [booking1];
  room2.bookings = [booking2];
  room3.bookings = [booking3];
  room4.bookings = [booking4];
  room5.bookings = [booking5];

  const totalRooms = [room1, room2, room3, room4, room5];

  expect(
    Room.availableRooms(totalRooms, "2022-01-01", "2022-01-15")
  ).toStrictEqual([room4, room5]);
});

test("availableRooms, all rooms available", () => {
  const room1 = new Room("single", [], 300, 10);
  const room2 = new Room("double", [], 200, 10);
  const room3 = new Room("suite", [], 100, 10);

  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    10,
    room1
  );
  const booking2 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-05",
    "2022-01-07",
    10,
    room2
  );
  const booking3 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-02",
    "2022-01-20",
    10,
    room3
  );

  room1.bookings = [booking1];
  room2.bookings = [booking2];
  room3.bookings = [booking3];

  const totalRooms = [room1, room2, room3];

  expect(
    Room.availableRooms(totalRooms, "2022-05-01", "2022-05-15")
  ).toStrictEqual([room1, room2, room3]);
});

test("availableRooms, no rooms available", () => {
  const room1 = new Room("single", [], 300, 10);
  const room2 = new Room("double", [], 200, 10);
  const room3 = new Room("suite", [], 100, 10);
  const room4 = new Room("single", [], 500, 10);
  const room5 = new Room("double", [], 600, 10);

  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    10,
    room1
  );
  const booking2 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-05",
    "2022-01-07",
    10,
    room2
  );
  const booking3 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-02",
    "2022-01-20",
    10,
    room3
  );
  const booking4 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-20",
    "2022-01-25",
    10,
    room4
  );
  const booking5 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-17",
    "2022-01-30",
    10,
    room5
  );

  room1.bookings = [booking1];
  room2.bookings = [booking2];
  room3.bookings = [booking3];
  room4.bookings = [booking4];
  room5.bookings = [booking5];

  const totalRooms = [room1, room2, room3, room4, room5];

  expect(
    Room.availableRooms(totalRooms, "2022-01-01", "2022-01-30")
  ).toStrictEqual([]);
});

test("getFee, 20% discount", () => {
  const room1 = new Room("single", [], 300, 10);
  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    10,
    room1
  );

  room1.bookings = [booking1];

  expect(booking1.getFee()).toBe(240);
});

test("getFee, 0% discount", () => {
  const room1 = new Room("single", [], 300, 50);
  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    50,
    room1
  );

  room1.bookings = [booking1];

  expect(booking1.getFee()).toBe(300);
});

test("getFee, 10% discount", () => {
  const room1 = new Room("single", [], 300, 10);
  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    0,
    room1
  );

  room1.bookings = [booking1];

  expect(booking1.getFee()).toBe(270);
});

test("getFee, 10% discount", () => {
  const room1 = new Room("single", [], 300, 0);
  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    10,
    room1
  );

  room1.bookings = [booking1];

  expect(booking1.getFee()).toBe(270);
});

test("getFee, 99% discount", () => {
  const room1 = new Room("single", [], 300, 9);
  const booking1 = new Booking(
    "Jose",
    "jose@gmail.com",
    "2022-01-01",
    "2022-01-03",
    90,
    room1
  );

  room1.bookings = [booking1];

  expect(booking1.getFee()).toBe(3);
});