export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IJwtPayload {
    id: string;
    email: string;
    userName: string;
}

export interface IBooking {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
};

export interface IHotel {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    bookings: IBooking[];
}