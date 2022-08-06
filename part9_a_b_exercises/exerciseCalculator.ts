
export const calculateExercises = (exerciseValues: Array<number>, dailyTarget: number): object => {
  const target: number = dailyTarget;
  const period: number = exerciseValues.length;
  let totalWeekHours = 0;
  let trainingDays = 0;

  const calculateRating = (averageHours: number): object => {
    if (averageHours >= target * 2) {
      return {
        rating: 4,
        description: 'you smashed your target! amazing!'
      };
    } else if (averageHours > target) {
      return {
        rating: 3,
        description: 'you hit your target, great work!'
      };
    } else if (averageHours <= target / 2) {
      return {
        rating: 1,
        description: 'not great, try harder next week'
      };
    } else {
      return {
        rating: 2,
        description: 'not too bad but could be better'
      };
    }
  };
  
  exerciseValues.forEach(dayValue => {
    if (dayValue > 0) trainingDays += 1;
    totalWeekHours += dayValue;
  });
  
  const weekAverage: number = totalWeekHours / period;
  const ratings: object = calculateRating(weekAverage);
  
  return {
    periodLength: period,
    trainingDays: trainingDays,
    success: weekAverage >= target ? true : false,
    rating: ratings['rating' as keyof object],
    ratingDescription: ratings['description' as keyof object],
    target: target,
    average: weekAverage
  };
};

const exerciseDailyValues: Array<number> = process.argv.filter((_value, index) => {
  return index > 2;
}).map(value => Number(value));

const dailyTarget = Number(process.argv[2]);

console.log(calculateExercises(exerciseDailyValues, dailyTarget));