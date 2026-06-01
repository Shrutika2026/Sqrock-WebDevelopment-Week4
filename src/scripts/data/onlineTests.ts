import { CATEGORIES } from "./courseTitles";

type Q = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

function q(
  question: string,
  options: string[],
  correct: number,
  explanation: string
): Q {
  return { question, options, correctAnswer: correct, explanation };
}

const QUESTION_BANK: Record<string, Q[]> = {
  "Web Development": [
    q("What does HTML stand for?", ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"], 0, "HTML = Hyper Text Markup Language"),
    q("Which CSS property controls text size?", ["font-style", "font-size", "text-size", "font-weight"], 1, "font-size sets text size"),
    q("Which tag is used for the largest heading?", ["<head>", "<h6>", "<h1>", "<heading>"], 2, "h1 is the largest heading"),
    q("What does CSS stand for?", ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], 1, "CSS = Cascading Style Sheets"),
    q("Which property makes a flex container?", ["display: grid", "display: flex", "position: flex", "layout: flex"], 1, "display: flex creates flexbox"),
  ],
  "Data Structures": [
    q("Time complexity of binary search?", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 1, "Binary search is O(log n)"),
    q("Which uses LIFO?", ["Queue", "Stack", "Tree", "Graph"], 1, "Stack is Last In First Out"),
    q("Worst case of Quick Sort?", ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], 1, "Quick sort worst case is O(n²)"),
    q("Which structure is non-linear?", ["Array", "Linked List", "Tree", "Stack"], 2, "Tree is non-linear"),
    q("Hash table average lookup?", ["O(n)", "O(log n)", "O(1)", "O(n²)"], 2, "Hash tables average O(1) lookup"),
  ],
  Python: [
    q("Which is mutable in Python?", ["tuple", "string", "list", "int"], 2, "Lists are mutable"),
    q("Output of print(2 ** 3)?", ["6", "8", "9", "5"], 1, "2**3 = 8"),
    q("Which creates a dictionary?", ["[]", "()", "{}", "<>"], 2, "{} creates a dict"),
    q("Which keyword defines a function?", ["func", "def", "function", "define"], 1, "Python uses def"),
    q("Which library is used for data analysis?", ["NumPy", "Pandas", "Matplotlib", "Requests"], 1, "Pandas is for data analysis"),
  ],
  JavaScript: [
    q("Which declares block-scoped variable?", ["var", "let", "define", "variable"], 1, "let is block-scoped"),
    q("typeof null in JavaScript?", ["null", "undefined", "object", "number"], 2, "typeof null is 'object'"),
    q("Which adds to end of array?", ["push()", "pop()", "shift()", "append()"], 0, "push() adds to end"),
    q("===' checks?", ["Value only", "Type only", "Value and type", "Reference"], 2, "=== strict equality"),
    q("Promise states?", ["open, closed", "pending, fulfilled, rejected", "start, end", "wait, done"], 1, "Three promise states"),
  ],
  "Machine Learning": [
    q("Supervised learning uses?", ["Unlabeled data", "Labeled data", "No data", "Random data"], 1, "Supervised learning needs labels"),
    q("Overfitting means?", ["Model too simple", "Model memorizes training data", "Perfect generalization", "Under-trained"], 1, "Overfitting = memorizing training data"),
    q("Which is a classification metric?", ["MSE", "Accuracy", "RMSE", "MAE"], 1, "Accuracy is for classification"),
    q("Gradient descent minimizes?", ["Loss function", "Dataset size", "Features", "Labels"], 0, "GD minimizes loss"),
    q("CNN is mainly used for?", ["Text", "Images", "Audio only", "Tabular data"], 1, "CNNs excel at image tasks"),
  ],
};

const LEVEL_TIME: Record<string, number> = {
  beginner: 600,
  intermediate: 900,
  advanced: 1200,
};

export function generateOnlineTests() {
  const tests: Record<string, unknown>[] = [];

  for (const category of CATEGORIES) {
    for (const level of ["beginner", "intermediate", "advanced"]) {
      const questions = QUESTION_BANK[category];
      tests.push({
        title: `${category} ${level.charAt(0).toUpperCase() + level.slice(1)} Test`,
        description: `Timed online MCQ test for ${category} — ${level} level. Pass score: 60%.`,
        category,
        level,
        passingScore: 60,
        totalPoints: questions.length * 20,
        timeLimit: LEVEL_TIME[level],
        questions,
      });
    }
  }

  for (const category of CATEGORIES) {
    tests.push({
      title: `${category} Practice Test`,
      description: `Quick practice assessment for ${category} concepts.`,
      category,
      level: "intermediate",
      passingScore: 50,
      totalPoints: QUESTION_BANK[category].length * 20,
      timeLimit: 480,
      questions: QUESTION_BANK[category],
    });
  }

  return tests;
}
