import { User, Agency, Listing } from "@prisma/client";
import { faker } from "@faker-js/faker";
import {
  listingCategoryOptions,
  listingTransactionTypeOptions,
  listingTypeOptions,
} from "@/global/data";

export const a: Agency[] = [
  {
    id: "agency1",
    name: "Agency 1",
    slug: "agency-1",
    address: "123 Main Street, Anytown, USA",
    website: "https://www.agency1.com",
    phone: "+1234567890",
    logoUrl: "https://m1.spitogatos.gr/94825956_100x50.jpg",
    contactPersonFullName: "John Doe",
    contactPersonEmail: "johndoe@example.com",
    contactPersonPhone: "+1234567890",
    workHours: "9:00 AM - 5:00 PM",
    gpsLocation: "40.7128, -74.0060",
    description: `BINSWANGER BINIARIS Company represents exclusively in Greece the International Group BINSWANGER AMERICA LLC (www.binswanger.com), leader in the international real estate market, with clients 2/3 of the companies of FORTUNE 500, providing complete solutions to multinational companies related to their needs in the real estate sector.
    Our Company, in addition to the activity of its residential sector, with the support of the specialized in-house departments of our engineering and legal consultants, provides additional integrated solutions in special real estate issues, such as the relocation of multinational companies, the renegotiation of rents, the appraisal of the property, the preparation of studies, the full consulting coverage of our clients, etc.`,
    shortDescription: "A brief description of Agency 1.",
    branding: "",
  },
  {
    id: "agency2",
    name: "Agency 2",
    slug: "agency-2",
    address: "123 Main Street, Anytown, USA",
    website: "https://www.agency2.com",
    phone: "+1234567890",
    logoUrl: "https://m1.spitogatos.gr/256486380_100x50.jpg",
    contactPersonFullName: "Sasko Saskovski",
    contactPersonEmail: "sasko@example.com",
    contactPersonPhone: "+1234567890",
    workHours: "9:00 AM - 5:00 PM",
    gpsLocation: "40.7128, -74.0060",
    description: `Who we are
    At Real Estate One, we provide high quality services in the field of Property Management through many years of professional knowledge and expertise.
    
    At our offices, our specialized Consultants, with integrity and professionalism will help you find the property you really want through our portfolio of more than 30,000 properties.
    
    Our Knowledge & Expertise are always at your service!
    `,
    shortDescription: "A brief description of Agency 2.",
    branding: "",
  },
  {
    id: "agency3",
    name: "Agency 3",
    slug: "agency-3",
    address: "123 Main Street, Anytown, USA",
    website: "https://www.agency3.com",
    phone: "+1234567890",
    logoUrl: "https://m1.spitogatos.gr/242517570_100x50.jpg",
    contactPersonFullName: "Petko Petkovski",
    contactPersonEmail: "petko@example.com",
    contactPersonPhone: "+1234567890",
    workHours: "9:00 AM - 5:00 PM",
    gpsLocation: "40.7128, -74.0060",
    description: `The real estate agency Keller Williams Athens Riviera operates in Attica, especially in the area of the southern suburbs of Athens. Our experience in the real estate industry begins in 1977 as a construction company in Neo Kosmos.
    
    Our main concern is to be a quality choice in the provision of real estate services, offering vertically integrated services to the entire range of the real estate market. Our team consists of trained real estate consultants to Keller Williams standards and is complemented by an engineer, architect, decorator, mechanical engineer, REV/MRICS real estate appraiser, attorney and notary public
    `,
    shortDescription: "A brief description of Agency 3.",
    branding: "",
  },
  {
    id: "agency4",
    name: "Agency 4",
    slug: "agency-4",
    address: "123 Main Street, Anytown, USA",
    website: "https://www.agency4.com",
    phone: "+1234567890",
    logoUrl: "https://m1.spitogatos.gr/1658724_100x50.jpg",
    contactPersonFullName: "Papp Pappev",
    contactPersonEmail: "papp@example.com",
    contactPersonPhone: "+1234567890",
    workHours: "9:00 AM - 5:00 PM",
    gpsLocation: "40.7128, -74.0060",
    description: ``,
    shortDescription: "A brief description of Agency 4.",
    branding: "",
  },
  {
    id: "agency5",
    name: "Agency 5",
    slug: "agency-5",
    address: "123 Main Street, Anytown, USA",
    website: "https://www.agency5.com",
    phone: "+1234567890",
    logoUrl: "https://m1.spitogatos.gr/210921582_100x50.jpg",
    contactPersonFullName: "Boriz Borizov",
    contactPersonEmail: "boriz@example.com",
    contactPersonPhone: "+1234567890",
    workHours: "9:00 AM - 5:00 PM",
    gpsLocation: "40.7128, -74.0060",
    description: `The real estate market is one of its most demanding and competitive industries
    economy, as it is directly linked to all productive sectors.
    
    BlueBrick and its partners, with responsibility, knowledge and reliability, making use of it
    their many years of experience, excellent training, new technologies and modern developments
    in the real estate industry, provides comprehensive and high-level consulting
    services, in the field of research and information about the real estate market, the
    investment opportunities in the industry as well as finding properties at very affordable prices`,
    shortDescription: "A brief description of Agency 5.",
    branding: "",
  },
];
export const aUsers: User[] = [
  {
    id: "g112c3d4-e5f6-7890-abcd-ef12345678901",
    email: "agency1@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "AGENCY",
    firstName: "Agency1",
    lastName: "Owner1",
    hashedPassword: "password1",
    picture: "",
    agencyId: "agency1",
    emailVerified: new Date(),
    phone: "044 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "g122c3d4-e5f6-7890-abcd-ef12345678901",
    email: "agency2@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "AGENCY",
    firstName: "Agency2",
    lastName: "Owner2",
    hashedPassword: "password2",
    picture: "",
    agencyId: "agency2",
    emailVerified: new Date(),
    phone: "044 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "g132c3d4-e5f6-7890-abcd-ef12345678901",
    email: "agency3@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "AGENCY",
    firstName: "Agency3",
    lastName: "Owner3",
    hashedPassword: "password3",
    picture: "",
    agencyId: "agency3",
    emailVerified: new Date(),
    phone: "044 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "g142c3d4-e5f6-7890-abcd-ef12345678901",
    email: "agency4@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "AGENCY",
    firstName: "Agency4",
    lastName: "Owner4",
    hashedPassword: "password4",
    picture: "",
    agencyId: "agency4",
    emailVerified: new Date(),
    phone: "044 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "g152c3d4-e5f6-7890-abcd-ef12345678901",
    email: "agency5@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "AGENCY",
    firstName: "Agency5",
    lastName: "Owner5",
    hashedPassword: "password5",
    picture: "",
    agencyId: "agency5",
    emailVerified: new Date(),
    phone: "044 123 4567",
    phoneVerified: new Date(),
  },
];
export const nUsers: User[] = [
  {
    id: "a112c3d4-e5f6-7890-abcd-ef12345678901",
    email: "user1@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
    firstName: "John",
    lastName: "Doe",
    hashedPassword: "password1",
    // hashedPassword: await new Argon2id().hash("user" + "1"),
    picture: "",
    agencyId: null,
    emailVerified: new Date(),
    phone: "022 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "a122c3d4-e5f6-7890-abcd-ef12345678901",
    email: "user2@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
    firstName: "Jane",
    lastName: "Smith",
    hashedPassword: "password2",
    picture: "",
    agencyId: null,
    emailVerified: new Date(),
    phone: "022 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "a132c3d4-e5f6-7890-abcd-ef12345678901",

    email: "user3@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
    firstName: "Michael",
    lastName: "Johnson",
    hashedPassword: "password3",
    picture: "",
    agencyId: null,
    emailVerified: new Date(),
    phone: "022 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "a142c3d4-e5f6-7890-abcd-ef12345678901",

    email: "user4@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
    firstName: "Emily",
    lastName: "Brown",
    hashedPassword: "password4",
    picture: "",
    agencyId: null,
    emailVerified: new Date(),
    phone: "022 123 4567",
    phoneVerified: new Date(),
  },
  {
    id: "a152c3d4-e5f6-7890-abcd-ef12345678901",

    email: "user5@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
    firstName: "David",
    lastName: "Wilson",
    hashedPassword: "password5",
    picture: "",
    agencyId: null,
    emailVerified: new Date(),
    phone: "022 123 4567",
    phoneVerified: new Date(),
  },
];

const userIds = [...aUsers, ...nUsers].map((user) => user.id);

export const regularListings: Listing[] = [];

for (let index = 1; index < 50; index++) {
  const userIndex = Math.floor(index / 5);
  const tType = faker.helpers.arrayElement(
    listingTransactionTypeOptions
  );
  const c = faker.helpers.arrayElement(listingCategoryOptions);
  const t = faker.helpers.arrayElement(listingTypeOptions[c]);

  regularListings.push({
    id: "listing" + index,
    listingNumber: index,
    createdAt: new Date(),
    updatedAt: new Date(),
    isAvailable: true,
    availabilityDate: new Date(),
    userId: userIds[userIndex],
    transactionType: tType,
    category: c,
    type: t,
    ///
    manucipality: "Skopje",
    place: "Karposh",
    district: "Karposh 1",
    address: "123 Main Street, Anytown, USA",
    fullAddress: "123 Main Street, Anytown, USA",
    longitude: 41.99646,
    latitude: 21.43141,
    locationPrecision: "exact",
    ///
    price: 100000,
    previousPrice: 120000,
    priceHistory: null,
    area: 100,
    orientation: "north",
    floorNumber: 1,
    ///
    bedrooms: 2,
    bathrooms: 1,
    wcs: 1,
    kitchens: 1,
    livingRooms: 1,
    ///
    parking: true,
    elevator: true,
    balcony: true,
    yard: false,
    basement: false,
    ///
    description: `This is a description of listing 1.`,
    mkdDescription: `This is a description of listing 1 in Macedonian.`,
    albDescription: `This is a description of listing 1 in Albanian.`,
    ///
    mainImage: "https://m1.spitogatos.gr/94825956_100x50.jpg",
    images: [],
    videoLink: "",
    ///
    isArchived: false,
    isPublished: true,
    publishedAt: new Date(),
    publishEndDate: new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ),
    //
    tags: [],
    isPaidPromo: false,
    ///
    contactData: "",
  });
}
export const agencyListings: Listing[] = [];
