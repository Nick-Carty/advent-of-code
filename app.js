let input = ""
let arr;
let numArr = []
let count = 0
let freqArr = []
let duplicate = []
let check = true
const findFrequency = function(arr){
  arr.forEach(num => {
    count += num
    if(!freqArr.includes(count)){
      freqArr.push(count)
    } else {
      duplicate.push(count)
      console.log(duplicate);
      check = false
    }
  })
  return count
}

// document.getElementById("openFile").addEventListener('change', function() {
//   var fr = new FileReader();
//   fr.onload = function() {
//     document.getElementById("fileContents").textContent = this.result;
//     input = document.getElementById("fileContents").innerHTML
//     arr = input.split('\n')
//     arr.forEach(number => {
//       numArr.push(Number(number))
//     })
//     numArr.pop()
//     while (check) {
//       let frequency = findFrequency(numArr)
//       console.log(frequency);
//     }
//   }
//   fr.readAsText(this.files[0]);
// })

// Part 2
const suspectIds = [];
const commonLetterIds = [];
let last = suspectIds.length - 1;
let twoCount = 0;
let threeCount = 0;
let difIndex;
document.getElementById("openFile").addEventListener('change', function() {
  var fr = new FileReader();
  fr.onload = function() {
    document.getElementById("fileContents").textContent = this.result;
    input = document.getElementById("fileContents").innerHTML
    arr = input.split('\n')

    idCheck:
    for(let i = 0; i < arr.length - 1; i++) {
      let letters = arr[i].split('')
      let foundTwoCheck = false;
      let foundThreeCheck = false;
      const confirmId = function(array) {
        if(suspectIds[last] !== letters) {
          suspectIds.push(letters);
        }
      }
      for(let x = 0; x < letters.length - 1; x++) {
        let hasDuplicates = function(input) {
          return input === letters[x];
        }
        if(letters.filter(hasDuplicates, letters[x]).length === 2 && !foundTwoCheck) {
          twoCount++
          foundTwoCheck = true;
          confirmId(letters)
        }
        if(letters.filter(hasDuplicates, letters[x]).length === 3 && !foundThreeCheck) {
          threeCount++
          foundThreeCheck = true;
          confirmId(letters)
        }
        if(foundTwoCheck && foundThreeCheck) {
          continue idCheck;
        }
      }
    }

    console.log(twoCount * threeCount);

    let similarCheck = function(arr1, arr2) {
      let oneBad = true;
      let test = true;
      let length = arr1.length - 1;
      letterMatch:
      for(let z = 0; z < length; z++) {
        if(arr1[z] !== arr2[z] && oneBad) {
          difIndex = arr1.indexOf(arr1[z])
          oneBad = false
        } else if(arr1[z] !== arr2[z] && !oneBad) {
          difIndex = ""
          test = false;
          break letterMatch
        } else {
          continue letterMatch;
        }
      }
      if(test && !oneBad) {
        return true;
      } else {
        return false
      }
    };

    commonLetterCheck:
    for(let y = 0; y < suspectIds.length; y++) {
      for(let x = y + 1; x < suspectIds.length; x++) {
        if(similarCheck(suspectIds[y], suspectIds[x])) {
          suspectIds[y].splice(difIndex, 1)
          commonLetterIds.push(suspectIds[y].join(''))
          break commonLetterCheck
        }
      }
    }
    console.log(commonLetterIds[0]);
  }
  fr.readAsText(this.files[0]);
})
