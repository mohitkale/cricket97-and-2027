/** The caller picks heads/tails; the winner chooses which side bats first. */
export function resolveToss(call, decision, random = Math.random) {
  const result = random() < .5 ? 'heads' : 'tails';
  const userWon = call === result;
  const choice = userWon ? decision : (random() < .5 ? 'bat' : 'bowl');
  return { result, userWon, choice, userBatsFirst: userWon ? choice === 'bat' : choice === 'bowl' };
}
