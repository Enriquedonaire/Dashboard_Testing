class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  checkDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const checkDates = [];

    end.setDate(end.getDate() - 1);

    while (end >= start) {
      checkDates.push(new Date(start).toISOString().slice(0, 10));
      start.setDate(start.getDate() + 1);
    }
    return checkDates;
  }

  isOccupied(date) {
    for (const book of this.bookings) {
      if (date >= book.check_in && date <= book.check_out) {
        return true;
      }
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    const dates = this.checkDates(startDate, endDate);

    let occupiedDays = 0;
    let unoccupiedDays = 0;

    for (const date of dates) {
      this.isOccupied(date) ? occupiedDays++ : unoccupiedDays++;
    }
    let totalDays = occupiedDays + unoccupiedDays;
    let occupancyPercentage = (occupiedDays * 100) / totalDays;

    return Math.round(occupancyPercentage);
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    let totalOccupancy = 0;

    for(const room of rooms) {
      totalOccupancy +=
      room.occupancyPercentage(startDate, endDate ) / rooms.length;
    }
    return Math.round(totalOccupancy);
  }

  static availableRooms(rooms, startDate, endDate) {
    const availableRooms = [];
    for(const room of rooms) {
      room.occupancyPercentage(startDate, endDate) === 0
      ? availableRooms.push(room)
      : null
    }
    return availableRooms;
  }
}

class Booking {
  constructor(  name, email, check_in, check_out, discount, room  ){
    this.name = name;
    this.email = email;
    this.check_in = check_in;
    this.check_out = check_out;
    this.discount = discount;
    this.room = room;
  }

  getFee() {
    let totalDicount = this.room.discount + this.discount;

    let finalPrice = this.room.rate;

    if (totalDicount < 100 && totalDicount > 0 ) {
      finalPrice = this.room.rate - (this.room.rate * (totalDicount / 100));
    }
    return Math.round(finalPrice);
  }
}

module.exports = {
  Room,
  Booking
}