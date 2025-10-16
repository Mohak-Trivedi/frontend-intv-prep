// Problem: https://bigfrontend.dev/problem/can-you-shuffle-an-array

// Solve using modern Fisher-Yates algorithm:
// At every index i, choose a random index j (from [i, arr.length - 1]) and swap its element with arr[i]

// Remember:
// Math.floor(Math.random() * x) -> random integer from 0 to x-1

// Math.floor(Math.random() * (arr.length-i)) -> random integer from 0 to arr.length-i - 1
// But, we want j to be randomly from range [i, arr.length - 1], not [0, arr.length - i - 1]
// Hence, adding i:
// i + Math.floor(Math.random() * (arr.length-i)) -> random integer from i + 0 to i + arr.length-i - 1
// -> random integer from i to arr.length - 1 i.e. j will be randomly from range [i, arr.length-1]

// Hence, for every index i to find element from random index j in range [i, arr.length - 1], we use:
// j = i + Math.floor(Math.random() * (arr.length - i))



function shuffle(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}


/*
How the algorithm works

The key line is:

j = i + Math.floor(Math.random() * (arr.length - i));
[arr[i], arr[j]] = [arr[j], arr[i]];


At each iteration i:

We pick one random element from the remaining unshuffled part (i → end)

We place it at position i

Then we never touch it again

So, every element gets exactly one chance to be chosen and fixed in place.

🧩 Step-by-step reasoning

Let’s take a small array:
[A, B, C]

Step 1: i = 0

Possible j: 0, 1, 2

Each with probability 1/3.

Whichever element we pick gets placed at index 0.
✅ Each element has equal chance (1/3) to be first.

Step 2: i = 1

Now, one element is already fixed at index 0.

Remaining elements: 2 of them.

Possible j: 1 or 2

Each with probability 1/2.

Whichever one we pick gets placed at index 1.
✅ Each of the remaining elements has equal chance (1/2) to be second.

Step 3: i = 2

Only one element remains → it automatically goes last.
✅ Probability = 1.

🧮 Multiply the probabilities

For any specific permutation (say [B, C, A]):

Probability that B was chosen first = 1/3

Probability that C was chosen next = 1/2

Probability that A was left last = 1

Total = 1/3 × 1/2 × 1 = 1/6


…and since there are 6 total permutations,
each has equal probability 1/6.

This holds for all n → each permutation has probability 1 / n!.

🚫 Why naïve shuffles fail

If you instead did:

for (let i = 0; i < arr.length; i++) {
  let j = Math.floor(Math.random() * arr.length);
  [arr[i], arr[j]] = [arr[j], arr[i]];
}


Now:

Elements already swapped can get swapped again.

The probabilities of some permutations become higher.

So it’s biased, not uniform.
*/