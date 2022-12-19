const passedCheck = '✅';
const failedCheck = '❌';

export const describe = (description, tests) => {
  console.log(description);
  console.table(
    Object.entries(tests).map(([name, fn]) => {
      const { value, expected } = fn();

      return {
        test: name,
        value,
        expected,
        result: value === expected ? passedCheck : failedCheck,
      };
    })
  );
  console.log(`=`.repeat(20));
};

export default describe;
