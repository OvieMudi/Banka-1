const generateAcctNo = () => {
  let numberString = '';

  while (numberString.length < 10) {
    numberString += Math.floor(Math.random() * 10);
  }

  if (numberString.charAt(0) === '0') {
    numberString += Math.floor(Math.random() * 10);
  }

  return parseInt(numberString, 10);
};

export default generateAcctNo;
