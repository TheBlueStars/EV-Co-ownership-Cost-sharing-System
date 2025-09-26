import '../../domain/entities/booking.dart';
import '../models/booking_dto.dart';

class BookingMapper {
  static Booking toEntity(BookingDto dto) {
    return Booking(
      id: dto.id,
      userId: dto.userId,
      vehicleId: dto.vehicleId,
      startTime: DateTime.parse(dto.startTime),
      endTime: DateTime.parse(dto.endTime),
      cost: dto.cost,
    );
  }

  static BookingDto toDto(Booking entity) {
    return BookingDto(
      id: entity.id,
      userId: entity.userId,
      vehicleId: entity.vehicleId,
      startTime: entity.startTime.toIso8601String(),
      endTime: entity.endTime.toIso8601String(),
      cost: entity.cost,
    );
  }
}
