const starter = {
  javascript: (body = "") => `function solution(...args) {\n  // Write your code here\n${body}\n}`,
  python: (body = "") => `def solution(*args):\n    # Write your code here\n${body}\n    pass`,
  java: () => `public Object solution(Object... args) {\n    // Write your code here\n    return null;\n}`,
  cpp: () => `// Write your solution function named solution\n`,
};

export const CODING_PROBLEMS = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers that add up to <code>target</code>.</p>",
    difficulty: "easy",
    category: "Arrays",
    points: 10,
    hints: ["Use a hash map to store complements"],
    testCases: [
      { input: "[[2,7,11,15], 9]", expectedOutput: "0,1" },
      { input: "[[3,2,4], 6]", expectedOutput: "1,2" },
      { input: "[[3,3], 6]", expectedOutput: "0,1", isHidden: true },
    ],
    starterCode: {
      javascript: `function solution(nums, target) {
  // Write your code here
  
}`,
      python: `def solution(nums, target):
    # Write your code here
    pass`,
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Reverse a String",
    slug: "reverse-string",
    description: "<p>Reverse the given string and return it.</p>",
    difficulty: "easy",
    category: "Strings",
    points: 10,
    hints: ["Use two pointers or built-in reverse"],
    testCases: [
      { input: '"hello"', expectedOutput: "olleh" },
      { input: '"CodeLearn"', expectedOutput: "nraeLedoC" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  return s.split('').reverse().join('');
}`,
      python: `def solution(s):\n    return s[::-1]`,
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Palindrome Number",
    slug: "palindrome-number",
    description: "<p>Return <code>true</code> if the integer is a palindrome.</p>",
    difficulty: "easy",
    category: "Math",
    points: 10,
    hints: ["Convert to string and compare"],
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "-121", expectedOutput: "false" },
      { input: "10", expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(x) {
  const s = String(x);
  return s === s.split('').reverse().join('');
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "FizzBuzz Count",
    slug: "fizzbuzz",
    description: "<p>Given n, return count of numbers from 1 to n divisible by 3 or 5.</p>",
    difficulty: "easy",
    category: "Math",
    points: 10,
    hints: ["Loop and check modulo"],
    testCases: [
      { input: "15", expectedOutput: "7" },
      { input: "10", expectedOutput: "5" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 || i % 5 === 0) count++;
  }
  return count;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Find Maximum",
    slug: "find-maximum",
    description: "<p>Return the maximum number in an array.</p>",
    difficulty: "easy",
    category: "Arrays",
    points: 10,
    hints: ["Use Math.max with spread"],
    testCases: [
      { input: "[1,5,3,9,2]", expectedOutput: "9" },
      { input: "[-1,-5,-3]", expectedOutput: "-1" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return Math.max(...nums);
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Sum of Array",
    slug: "sum-of-array",
    description: "<p>Return the sum of all elements in the array.</p>",
    difficulty: "easy",
    category: "Arrays",
    points: 10,
    hints: ["Use reduce or a loop"],
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "15" },
      { input: "[10,20,30]", expectedOutput: "60" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  return nums.reduce((a, b) => a + b, 0);
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Count Vowels",
    slug: "count-vowels",
    description: "<p>Count vowels (a,e,i,o,u) in a string, case-insensitive.</p>",
    difficulty: "easy",
    category: "Strings",
    points: 10,
    hints: ["Loop through characters"],
    testCases: [
      { input: '"Hello World"', expectedOutput: "3" },
      { input: '"CodeLearn"', expectedOutput: "4" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  return s.toLowerCase().split('').filter(c => 'aeiou'.includes(c)).length;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Factorial",
    slug: "factorial",
    description: "<p>Return the factorial of n (n!).</p>",
    difficulty: "easy",
    category: "Recursion",
    points: 15,
    hints: ["Use loop or recursion"],
    testCases: [
      { input: "5", expectedOutput: "120" },
      { input: "0", expectedOutput: "1" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Even or Odd",
    slug: "even-or-odd",
    description: "<p>Return <code>even</code> if n is even, else <code>odd</code>.</p>",
    difficulty: "easy",
    category: "Math",
    points: 5,
    hints: ["Use modulo 2"],
    testCases: [
      { input: "4", expectedOutput: "even" },
      { input: "7", expectedOutput: "odd" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  return n % 2 === 0 ? 'even' : 'odd';
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: "<p>Determine if the input string of brackets is valid.</p>",
    difficulty: "medium",
    category: "Stack",
    points: 20,
    hints: ["Use a stack"],
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if ('({['.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: "<p>Find the contiguous subarray with the largest sum.</p>",
    difficulty: "medium",
    category: "Dynamic Programming",
    points: 25,
    hints: ["Kadane's algorithm"],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  let max = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(max, cur);
  }
  return max;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    description: "<p>Search for target in sorted array. Return index or -1.</p>",
    difficulty: "medium",
    category: "Binary Search",
    points: 20,
    hints: ["Use two pointers left and right"],
    testCases: [
      { input: "[[-1,0,3,5,9,12], 9]", expectedOutput: "4" },
      { input: "[[-1,0,3,5,9,12], 2]", expectedOutput: "-1" },
    ],
    starterCode: {
      javascript: `function solution(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Remove Duplicates",
    slug: "remove-duplicates",
    description: "<p>Return length of sorted array after removing duplicates.</p>",
    difficulty: "medium",
    category: "Arrays",
    points: 15,
    hints: ["Two pointer technique"],
    testCases: [
      { input: "[1,1,2]", expectedOutput: "2" },
      { input: "[0,0,1,1,2,3,3,4]", expectedOutput: "5" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  if (!nums.length) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) nums[k++] = nums[i];
  }
  return k;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Merge Sorted Arrays",
    slug: "merge-sorted-arrays",
    description: "<p>Merge two sorted arrays into one sorted comma-separated string.</p>",
    difficulty: "medium",
    category: "Arrays",
    points: 20,
    hints: ["Two pointers on both arrays"],
    testCases: [
      { input: "[[1,2,4], [1,3,4]]", expectedOutput: "1,1,2,3,4,4" },
      { input: "[[], [1]]", expectedOutput: "1" },
    ],
    starterCode: {
      javascript: `function solution(a, b) {
  return [...a, ...b].sort((x, y) => x - y).join(',');
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    description: "<p>How many distinct ways to climb n stairs (1 or 2 steps at a time)?</p>",
    difficulty: "medium",
    category: "Dynamic Programming",
    points: 20,
    hints: ["Fibonacci pattern"],
    testCases: [
      { input: "3", expectedOutput: "3" },
      { input: "5", expectedOutput: "8" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    description: "<p>Find the longest common prefix among an array of strings.</p>",
    difficulty: "medium",
    category: "Strings",
    points: 15,
    hints: ["Compare character by character"],
    testCases: [
      { input: '["flower","flow","flight"]', expectedOutput: "fl" },
      { input: '["dog","racecar","car"]', expectedOutput: "" },
    ],
    starterCode: {
      javascript: `function solution(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Rotate Array",
    slug: "rotate-array",
    description: "<p>Return array rotated right by k steps as comma-separated string.</p>",
    difficulty: "medium",
    category: "Arrays",
    points: 20,
    hints: ["Use slice"],
    testCases: [
      { input: "[[1,2,3,4,5,6,7], 3]", expectedOutput: "5,6,7,1,2,3,4" },
      { input: "[[-1,-100,3,99], 2]", expectedOutput: "3,99,-1,-100" },
    ],
    starterCode: {
      javascript: `function solution(nums, k) {
  k = k % nums.length;
  return [...nums.slice(-k), ...nums.slice(0, -k)].join(',');
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Product Except Self",
    slug: "product-except-self",
    description: "<p>Return array where each element is product of all others.</p>",
    difficulty: "medium",
    category: "Arrays",
    points: 25,
    hints: ["Prefix and suffix products"],
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "24,12,8,6" },
      { input: "[2,3,4,5]", expectedOutput: "60,40,30,24" },
    ],
    starterCode: {
      javascript: `function solution(nums) {
  const n = nums.length, res = Array(n).fill(1);
  let left = 1, right = 1;
  for (let i = 0; i < n; i++) {
    res[i] *= left; left *= nums[i];
    res[n - 1 - i] *= right; right *= nums[n - 1 - i];
  }
  return res.join(',');
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Group Anagrams Count",
    slug: "group-anagrams-count",
    description: "<p>Return number of anagram groups in string array.</p>",
    difficulty: "medium",
    category: "Hash Table",
    points: 20,
    hints: ["Sort each string as key"],
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: "3" },
      { input: '[""]', expectedOutput: "1" },
    ],
    starterCode: {
      javascript: `function solution(strs) {
  const groups = new Set(strs.map(s => s.split('').sort().join('')));
  return groups.size;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-sorted-lists",
    description: "<p>Merge two sorted arrays into comma-separated string.</p>",
    difficulty: "hard",
    category: "Linked List",
    points: 30,
    hints: ["Two pointer merge"],
    testCases: [
      { input: "[[1,2,4], [1,3,4]]", expectedOutput: "1,1,2,3,4,4" },
    ],
    starterCode: {
      javascript: `function solution(l1, l2) {
  const res = [];
  let i = 0, j = 0;
  while (i < l1.length && j < l2.length) {
    if (l1[i] <= l2[j]) res.push(l1[i++]);
    else res.push(l2[j++]);
  }
  return [...res, ...l1.slice(i), ...l2.slice(j)].join(',');
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Longest Substring Without Repeating",
    slug: "longest-substring",
    description: "<p>Return length of longest substring without repeating characters.</p>",
    difficulty: "hard",
    category: "Strings",
    points: 30,
    hints: ["Sliding window with set"],
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" },
    ],
    starterCode: {
      javascript: `function solution(s) {
  let max = 0, start = 0;
  const set = new Set();
  for (let end = 0; end < s.length; end++) {
    while (set.has(s[end])) set.delete(s[start++]);
    set.add(s[end]);
    max = Math.max(max, end - start + 1);
  }
  return max;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    description: "<p>Compute how much water can be trapped after raining.</p>",
    difficulty: "hard",
    category: "Arrays",
    points: 35,
    hints: ["Two pointers from both ends"],
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
      { input: "[4,2,0,3,2,5]", expectedOutput: "9" },
    ],
    starterCode: {
      javascript: `function solution(h) {
  let l = 0, r = h.length - 1, lm = 0, rm = 0, water = 0;
  while (l < r) {
    if (h[l] < h[r]) {
      lm = Math.max(lm, h[l]); water += lm - h[l]; l++;
    } else {
      rm = Math.max(rm, h[r]); water += rm - h[r]; r--;
    }
  }
  return water;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    description: "<p>Fewest coins needed to make amount. Return -1 if impossible.</p>",
    difficulty: "hard",
    category: "Dynamic Programming",
    points: 35,
    hints: ["Bottom-up DP"],
    testCases: [
      { input: "[[1,2,5], 11]", expectedOutput: "3" },
      { input: "[[2], 3]", expectedOutput: "-1" },
    ],
    starterCode: {
      javascript: `function solution(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const c of coins) {
    for (let i = c; i <= amount; i++) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Word Break Possible",
    slug: "word-break",
    description: "<p>Return true if string can be segmented into dictionary words.</p>",
    difficulty: "hard",
    category: "Dynamic Programming",
    points: 30,
    hints: ["DP on prefix lengths"],
    testCases: [
      { input: '["leetcode", ["leet","code"]]', expectedOutput: "true" },
      { input: '["applepenapple", ["apple","pen"]]', expectedOutput: "true" },
    ],
    starterCode: {
      javascript: `function solution(s, wordDict) {
  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Is Prime Number",
    slug: "is-prime",
    description: "<p>Return true if n is a prime number, else false.</p>",
    difficulty: "easy",
    category: "Math",
    points: 10,
    hints: ["Check divisors up to sqrt(n)"],
    testCases: [
      { input: "7", expectedOutput: "true" },
      { input: "4", expectedOutput: "false" },
      { input: "1", expectedOutput: "false" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
  {
    title: "Fibonacci Number",
    slug: "fibonacci",
    description: "<p>Return the nth Fibonacci number.</p>",
    difficulty: "easy",
    category: "Recursion",
    points: 10,
    hints: ["Iterative is faster than recursive"],
    testCases: [
      { input: "6", expectedOutput: "8" },
      { input: "10", expectedOutput: "55" },
    ],
    starterCode: {
      javascript: `function solution(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
      python: starter.python(),
      java: starter.java(),
      cpp: starter.cpp(),
    },
  },
];
