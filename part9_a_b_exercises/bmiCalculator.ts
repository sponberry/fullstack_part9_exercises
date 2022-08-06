export const calculateBmi = (heightCm: number, weightKg: number) : string => {
  const calculation: number = weightKg / (Math.pow(heightCm / 100, 2));

  if (calculation >= 40) {
    return "Extremely overweight";
  } else if (calculation >= 30) {
    return "Obese";
  } else if (calculation >= 25) {
    return "Slightly overweight";
  } else if (calculation >= 19) {
    return "Normal (healthy weight)";
  } else {
    return "Underweight";
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));