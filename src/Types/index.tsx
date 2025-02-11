export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  data: any;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  images: string[];
  rating: number;
  amenities: string[];
}

export interface Room {
  _id: string;
  hotel: Hotel;
  type: string;
  number: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  isAvailable: boolean;
  images: string[];
  data: any;
}

export interface Booking {
  _id: string;
  user: User;
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
}

export interface PaymentStats {
  bookings: number;
  revenue: number;
}

export interface PeriodStats {
  totalBookings: number;
  totalRevenue: number;
  paid: PaymentStats;
  pending: PaymentStats;
  failed: PaymentStats;
}

export interface DailyStats {
  date: string;
  bookings: number;
  revenue: number;
  paidBookings: number;
  paidRevenue: number;
  pendingBookings: number;
  pendingRevenue: number;
  failedBookings: number;
  failedRevenue: number;
}

export interface BookingStatistics {
  today: PeriodStats;
  thisWeek: PeriodStats;
  thisMonth: PeriodStats;
  dailyStats: DailyStats[];
}