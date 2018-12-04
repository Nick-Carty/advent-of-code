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

document.getElementById("openFile").addEventListener('change', function() {
  var fr = new FileReader();
  fr.onload = function() {
    document.getElementById("fileContents").textContent = this.result;
    input = document.getElementById("fileContents").innerHTML
    arr = input.split('\n')
    arr.forEach(number => {
      numArr.push(Number(number))
    })
    numArr.pop()
    while (check) {
      let frequency = findFrequency(numArr)
      console.log(frequency);
    }
  }
  fr.readAsText(this.files[0]);
})
