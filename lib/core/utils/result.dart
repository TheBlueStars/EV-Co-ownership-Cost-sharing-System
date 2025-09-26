/// Lớp cha cho kết quả
abstract class Result<T> {
  const Result();
}

/// Thành công, chứa dữ liệu [data]
class Success<T> extends Result<T> {
  final T data;
  const Success(this.data);
}

/// Thất bại, chứa thông tin lỗi [message]
class Failure<T> extends Result<T> {
  final String message;
  final Exception? exception;

  const Failure(this.message, {this.exception});
}

/// Tiện ích dùng với Result
extension ResultExtension<T> on Result<T> {
  bool get isSuccess => this is Success<T>;
  bool get isFailure => this is Failure<T>;

  T? get data => this is Success<T> ? (this as Success<T>).data : null;
  String? get errorMessage =>
      this is Failure<T> ? (this as Failure<T>).message : null;
}
