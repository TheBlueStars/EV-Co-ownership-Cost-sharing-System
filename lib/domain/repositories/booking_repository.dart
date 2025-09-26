import '../entities/booking.dart';

abstract class BookingRepository {
  Future<List<Booking>> getAllBookings();
  Future<Booking?> getBookingById(String id);
  Future<void> createBooking(Booking booking);
  Future<void> deleteBooking(String id);
}
