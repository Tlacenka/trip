# Train Route Information and Prices

This is a simple application for calculating train prices. It is used for educational purposes.

## Technologies

- This application is written in TypeScript.
- UI is implemented using React library.
- Build is performed by Vite.
- Tests are written in Vitest.

## Getting started

1. Install dependencies via `npm install`
2. Build the project via `npm run build`
3. Start the application via `npm start`

## Bugs

Bugs are documented in the code and referenced by their number.

1. Luggage costs 100 Kč even for one stop.
2. Discount for children is 50% instead of 67%.
3. Brno - Ostrava should have discounted price 350 Kč.
4. Pardubice - Brno direct connection is missing, routes via Olomouc.
5. Praha only has red route circle, green one is missing.
6. Student discount is missing. Anyone between 15 and 75 pays full price.
7. When age is missing (on startup) or is negative, price is undefined instead of - or some UX indication.
8. Typo in "mám zavazadlo" → "mam zavazadlo"
9. There is an additional city Jihlava which is not on the map. It routes the same as Pardubice (Jihlava - Pardubice is interchangeable and distance and price between them is 0).
10. When age is 0, it counts full price (newborns are not considered.)
11. Counts children until the age of 12 instead of 15.
12. Counts seniors since the age of 76 instead of 75.
13. Praha - Ostrava has duration 4:45 (via Brno) instead of 3:00 in the special prices section.
