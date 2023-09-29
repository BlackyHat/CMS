// import { cars } from './cars';
// // import { cities } from './cities';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// async function main() {
//   for (let car of cars) {
//     try {
//       const makeBrand = await prisma.make.create({
//         data: {
//           label: car.brand,
//           storeId: 'd8243c17-5f62-4b2f-88a2-ba63cd0afb62',
//         },
//       });
//       for (let model of car.models) {
//         await prisma.model.create({
//           data: {
//             label: model,
//             makeId: makeBrand.id,
//           },
//         });
//       }
//       console.log(`Created brand: ${car.brand}`);
//     } catch (error) {
//       console.error(`Error creating brand: ${car.brand}`, error);
//     }
//   }
// }
// // async function main() {
// //   for (let city of cities) {
// //     await prisma.city.create({
// //       data: {
// //         name: city.name,
// //         regionId: '022f5979-302b-4f23-a0b2-7977b1046b9f',
// //       },
// //     });
// //   }
// // }

// main()
//   .catch((e) => {
//     console.log(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//     console.log('All done.');
//   });
