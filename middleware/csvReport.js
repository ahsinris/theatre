import fs from 'fs';

async function writeFile(file, content) {
  return new Promise((resolve, rejects) => {
    fs.writeFile(file, content, 'utf-8', (err, data) => {
      if (err) {
        rejects(err);
      } else {
        resolve(data);
      }
    });
  });
}
class Csv {
  csvdata(finalData) {
    let csv = '';

    const headers = [
      'User ID',
      'User Name',
      'Email ID',
      'Phone Number',
      'Theater Name',
      'Location',
      'Screen Name',
      'Seat Number',
      'Movie Title',
      'Release Date',
      'Duration',
      'Movie Slot ID',
      'Movie Start Time',
      'Movie End Time',
      'Ticket Count',
      'Booking ID',
      'Booking Status',
      'Payment ID',
      'Transaction ID',
      'Total Amount',
      'Status',
      'Payment Intent',
      'Payment Method Types',
      'Payment Status',
    ];
    csv += `${headers.join(',')}\n`;
    const values = Object.values(finalData);
    csv += `${values.join(',')}\n`;

    return csv;
  }

  async csvreportGenerator(data) {
    try {
      await writeFile('report.csv', data);
    } catch (e) {
      console.log(e);
    }
  }
}

// class Csv {
//     csvdata(finalData) {
//         let csv = '';
//         let keys = Object.keys(finalData);
//         csv += keys.join(',') + '\n';

//         let values = keys.map(key => {
//             if (Array.isArray(finalData[key])) {
//                 return key === 'seat_number'
//                     ? `"${finalData[key].join(',')}"` // Join seat numbers with commas
//                     : `"${finalData[key].join(',')}"`; // Wrap array elements in double quotes
//             } else {
//                 return `"${finalData[key]}"`;
//             }
//         });

//         csv += values.join(',') + `\n`;

//         return csv;
//     }

//     async csvreportGenerator(data) {
//         try {
//             await writeFile('report.csv', data);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

export default new Csv();

// import fs from 'fs'

// async function writeFile(file, content) {
//     return new Promise((resolve, rejects) => {
//         fs.writeFile(file, content, 'utf-8', (err, data) => {
//             if (err) {
//                 rejects(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })

// }
// class Csv {
//     csvdata(finalData) {
//         let csv = '';
//         let keys = Object.keys(finalData);
//         csv += keys.join(',') + '\n';

//         let values = keys.map(key => {
//             if (Array.isArray(finalData[key])) {
//                 return finalData[key].length > 0 ? finalData[key].map(val => `"${val}"`).join(',') : '""';
//             } else {
//                 return `"${finalData[key]}"`; // Wrap non-array values in double quotes
//             }
//         });

//         csv += values.join(',') + `\n`;

//         return csv;
//     }

//     async csvreportGenerator(data) {
//         try {
//             await writeFile('report.csv', data);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// export default new Csv();

// // class Csv {
// //     csvdata(finalData) {
// //         let csv = ''
// //         let keys = Object.keys(finalData)
// //         csv += keys.join(',') + '\n';
// //         let values = Object.values(finalData)
// //         csv += values.join(',') + `\n`

// //         return csv

// //     }

// //     async csvreportGenerator(data) {

// //         try {
// //             await writeFile('report.csv', data)

// //         }
// //         catch (e) {
// //             console.log(e)
// //         }

// //     }

// // }

// // class Csv {
// //     csvdata(finalData) {
// //         let csv = ''
// //         let keys = Object.keys(finalData)
// //         csv += keys.join(',') + '\n';

// //         let values = keys.map(key => {
// //             // Check if the value is an array
// //             if (Array.isArray(finalData[key])) {
// //                 // Convert the array to a string with commas
// //                 return finalData[key].join(',');
// //             } else {
// //                 return finalData[key];
// //             }
// //         });

// //         csv += values.join(',') + `\n`;

// //         return csv;
// //         // let values = Object.values(finalData).map(value => {
// //         //     // Check if the value is an array
// //         //     if (Array.isArray(value)) {
// //         //         // Convert the array to a string with commas
// //         //         return value.join(',');
// //         //     } else {
// //         //         return value;
// //         //     }
// //         // });

// //         csv += values.join(',') + `\n`;
// //         return csv
// //     }

// //     async csvreportGenerator(data) {

// //         try {
// //             await writeFile('report.csv', data)

// //         }
// //         catch (e) {
// //             console.log(e)
// //         }

// //     }

// // }

// // export default new Csv()
