export interface CVContent {
    contentType: 'CV';
    basedata: CVBasedata;
    events: CVEvent[];
}

export interface CVBasedata {
    image: string;
    name: string;
    birthdate: string;
    bornIn: string;
    familiyStatus: string;
    nationality: string;
    address: Address;
    phone: string;
    email: string;
    homepage: string;
    driverLicence: string;
}

export interface Address {
    street: string;
    zip: string;
    city: string;
}

export interface CVEvent {
    title: string;
    subtitle: string;
    date: {
        from: string;
        to: string;
    };
    info: string[];
}
