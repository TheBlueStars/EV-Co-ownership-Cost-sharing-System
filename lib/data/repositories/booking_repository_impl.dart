import '../../domain/entities/booking.dart';
import '../../domain/repositories/booking_repository.dart';
import '../mappers/booking_mapper.dart';
import '../sources/remote/bookings_api.dart';

class BookingRepositoryImpl implements BookingRepository {
  final BookingsApi api;

  BookingRepositoryImpl(this.api);

  @override
  Future<List<Booking>> getAllBookings() async {
    final dtos = await api.fetchAll();
    return dtos.map(BookingMapper.toEntity).toList();
  }

  @override
  Future<Booking?> getBookingById(String id) async {
    final dto = await api.fetchById(id);
    return dto != null ? BookingMapper.toEntity(dto) : null;
  }

  @override
  Future<void> createBooking(Booking booking) async {
    await api.create(BookingMapper.toDto(booking));
  }

  @override
  Future<void> deleteBooking(String id) async {
    await api.delete(id);
  }
}
