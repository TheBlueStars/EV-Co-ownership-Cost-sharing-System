class BookingDto {
  final String id;
  final String userId;
  final String vehicleId;
  final String startTime;
  final String endTime;
  final double cost;

  BookingDto({
    required this.id,
    required this.userId,
    required this.vehicleId,
    required this.startTime,
    required this.endTime,
    required this.cost,
  });

  factory BookingDto.fromJson(Map<String, dynamic> json) {
    return BookingDto(
      id: json['id'],
      userId: json['userId'],
      vehicleId: json['vehicleId'],
      startTime: json['startTime'],
      endTime: json['endTime'],
      cost: (json['cost'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
    "id": id,
    "userId": userId,
    "vehicleId": vehicleId,
    "startTime": startTime,
    "endTime": endTime,
    "cost": cost,
  };
}
