class Booking {
  final String id;
  final String userId;
  final String vehicleId;
  final DateTime startTime;
  final DateTime endTime;
  final double cost;

  const Booking({
    required this.id,
    required this.userId,
    required this.vehicleId,
    required this.startTime,
    required this.endTime,
    required this.cost,
  });
}
