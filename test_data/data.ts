import dotenv from 'dotenv';
dotenv.config();

export const testData = {
    base_url: process.env.BASE_URL || '',
    existing_email_id: process.env.EMAIL_ID || '',
    password: process.env.PASSWORD || '',
    first_name: "test",
    last_name: "case",
    phone_no: "123456",
    street: "202 Eagle Way",
    state: "Alaska",
    city: "Kodiak",
    zipcode: "99615",
    country: "India",
    activity_1: "Band",
    activity_2: "Shortput",
    activity_3: "Debateclub",
    activity_4: "Coding",
    high_school_name: "GCG School",
    gpa: "8",
    year_of_education: "2017",
    years: "3",
    roles: "Selected for All-States",
    description: "Played well in concert",
    essay_options: ["Animals", "School"]
}
  