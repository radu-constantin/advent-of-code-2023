/* 
The newly-improved calibration document consists of lines of text;
each line originally contained a specific calibration value that the
Elves now need to recover. On each line, the calibration value can be
found by combining the first digit and the last digit (in that order)
to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

Input: Sequence of strings separate by new lines;
Output: The sum of the first and last digit in every line of text;

Algorithm:
1. Split text by new line;
  - store in array of strings;
2. For each new line identify the first and last digit;
  - Convert the string digits to numbers;
  - Sum the two digits;
3. Add all the two digit sums together.
*/

const fs = require('node:fs');
const input = fs.readFileSync('./day1input.txt', 'utf-8', (err, data)=> {
  return data;
});

const numberMap = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'orez': '0',
  'eno': '1',
  'owt': '2',
  'eerht': '3',
  'ruof': '4',
  'evif': '5',
  'xis': '6',
  'neves': '7',
  'thgie': '8',
  'enin': '9',
}

const regex = /([0-9]|zero|one|two|three|four|five|six|seven|eight|nine)/g;
const reverseRegex = /([0-9]|orez|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g;

function getCalibrationValue(text) {
  let sum = 0;

  const lines = text.split("\n");
  let numbers = lines.map(line => {
    const reversedLine = line.split('').reverse().join('');
    let firstDigit = line.match(regex);
    let secondDigit = reversedLine.match(reverseRegex);
    firstDigit = firstDigit === null | undefined ? null : firstDigit[0];
    secondDigit = secondDigit === null | undefined ? null : secondDigit[0];
    if (firstDigit && secondDigit) {
      return [firstDigit, secondDigit];
    } else if (firstDigit) {
      return [firstDigit]
    }
    }
  )

  const digits = numbers.map(numberList => {
    if (numberList) {
      return numberList.map(number => {
        if (numberMap[number] !== undefined) {
          return numberMap[number];
        } else {
          return number;
        }
      })
    } 
  })

  digits.forEach(digitLine => {
    if (digitLine) {
        let number = Number(digitLine[0] + digitLine.slice(-1));
        // console.log(digitLine, number);
        sum += number
      }
    
  });
  console.log(sum);
}

getCalibrationValue(input);