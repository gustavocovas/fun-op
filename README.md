# Op Fun - Math Practice Application

A modern, interactive web application for students to practice addition and subtraction with a focus-based approach and spaced repetition.

## Live Demo

**🚀 [https://gustavocovas.github.io/op-fun/](https://gustavocovas.github.io/op-fun/)**

Try it now:
- [Addition Practice (Focus 5)](https://gustavocovas.github.io/op-fun/sum/5/1)
- [Addition Practice (Focus 13)](https://gustavocovas.github.io/op-fun/sum/13/42)
- [Subtraction Practice](https://gustavocovas.github.io/op-fun/sub/10/1)
- [Subtraction with Negatives](https://gustavocovas.github.io/op-fun/sub/13/42/neg)

## Features

- **Two Operations**: Addition (Sum) and Subtraction with easy tab switching
- **Focus-Based Learning**: Practice centered around a target number (e.g., focus on 13)
- **Smart Problem Distribution**: 
  - Sum: 60% focus problems, 40% review of lower numbers
  - Subtraction: 54% focus problems, 36% review, 10% addition for reinforcement
- **Short Sequential Chunks**: Problems organized in chunks of 5-6 to avoid being too obvious
- **Spaced Repetition**: Automatic review of previously learned numbers
- **Clean URLs**: Simple routing like `/sum/13/42` (operation/focus/seed)
- **Optional Negatives**: For subtraction, allow negative results (e.g., 3-5 = -2)
- **Print-Friendly**: Seamless design works on screen and when printed (fits on 1 page)
- **Answer Validation**: Instant feedback with color-coded results
- **Reproducible**: Same URL always generates the same problem set

## How It Works

### Focus-Based Practice

When you practice with focus number **n**, the system generates problems centered around that number.

**For Addition (Sum):**
- **60% Focus Problems**: Operations involving n
  - Examples: n+1, n+2, n+3, 1+n, 2+n, 3+n, etc.
  - Largest operation: n + n

- **40% Review Problems**: Operations with numbers below n
  - Randomly selected for spaced repetition
  - Examples with focus=13: 12+1, 10+3, 9+5, 7+4, etc.

**For Subtraction:**
- **54% Focus Problems**: Bidirectional subtraction with n
  - Examples: n-1, n-2, 1-n, 2-n (can include negatives if enabled)
  - Largest operation: n - n = 0

- **36% Review Problems**: Subtraction with numbers below n
  - Random combinations for spaced repetition

- **10% Addition Problems**: Simple addition for reinforcement
  - Keeps previous skills sharp while learning subtraction
  - Max operand limited to 10 or focus (whichever is smaller)

### URL Format

Clean routing: `/operation/focus/seed`

**Examples:**
- `/sum/5/100` → Addition practice, focus 5, seed 100
- `/sum/13/42` → Addition practice, focus 13, seed 42
- `/sub/13/42` → Subtraction practice, focus 13, positive results only
- `/sub/13/42/neg` → Subtraction practice, focus 13, allow negative results

### Progressive Learning

Start with lower focus numbers and gradually increase:

1. **Beginner** (Focus 1-10): Basic facts
2. **Intermediate** (Focus 11-20): Building fluency
3. **Advanced** (Focus 21-50): Extended practice
4. **Expert** (Focus 51-100): Mastery level

## Getting Started

### Prerequisites
- Node.js 18+ (or 20+ recommended)
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will be available at `http://localhost:5173`.

Try these URLs to get started:
- `/sum/5/1` - Beginner addition (focus 5)
- `/sum/10/42` - Intermediate addition (focus 10)
- `/sub/13/100` - Subtraction practice with "tricky teen" 13
- `/sub/5/1/neg` - Subtraction with negatives allowed

## User Interface

### Tab Navigation
- **Sum** tab - Addition practice
- **Subtraction** tab - Subtraction practice
- Tabs maintain focus and seed when switching operations

### Configuration Panel (Always Visible)
- **Focus Number (1-100)**: Target number for practice
- **Seed Number (1-9999)**: Variant selector with 🎲 randomize button
- **Allow Negatives** (Subtraction only): Checkbox to enable negative results
- **Generate Practice**: Create new practice set with current settings
- **Copy URL**: Copy shareable link to clipboard

### Problem Display
- **Screen**: 5-column grid layout (responsive: 5→4→3→2 columns)
- **Print**: 3-column layout, fits 50 problems on 1 A4 page
- **Aligned Inputs**: All equals signs and input boxes vertically aligned
- **Color Feedback**: Green for correct, red for incorrect answers

### Actions
- **Check Answers**: Validates answers and shows color feedback
- **Print Worksheet**: Opens browser print dialog (Ctrl+P / Cmd+P)
- **Try Again**: Reset answers after checking (to retry)

## Print Functionality

No mode switching needed! The same interface automatically adapts for printing:

**On Screen:**
- Functional input fields with rounded borders
- 5-column grid for efficient space use
- Interactive buttons visible
- Color feedback enabled

**When Printed:**
- Input fields appear as writable blank lines
- 3-column layout optimized for A4 paper
- All 50 problems fit on 1 page
- Buttons and tabs hidden
- Clean black and white output

Just press **Ctrl+P** (or **Cmd+P**) and print!

## Project Structure

```
op-fun/
├── src/
│   ├── components/
│   │   ├── ConfigPanel.vue       # Configuration interface
│   │   ├── ProblemGrid.vue       # Problem display grid
│   │   ├── ProblemItem.vue       # Individual problem
│   │   └── TabNavigation.vue     # Sum/Subtraction tabs
│   ├── modules/
│   │   ├── sum.js                # Addition problem generation
│   │   └── subtraction.js        # Subtraction with sum review
│   ├── utils/
│   │   ├── focusEncoder.js       # URL encoding/decoding
│   │   └── seededRandom.js       # Seeded RNG
│   ├── views/
│   │   └── OperationView.vue     # Main view with routing
│   ├── router/
│   │   └── index.js              # Vue Router configuration
│   ├── App.vue                   # Root component
│   ├── main.js                   # Entry point
│   └── style.css                 # Global styles with print CSS
├── public/                       # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Using the Application

### 1. Choose Operation
Click **Sum** or **Subtraction** tab at the top

### 2. Set Focus Number
Enter a number (1-100) to practice around

### 3. Set Seed (or Randomize)
- Enter a specific seed for reproducible problems
- Click 🎲 to generate a random seed

### 4. Optional Settings
- For subtraction: Check "Allow negative results" if desired

### 5. Generate & Practice
- Click "Generate Practice"
- Fill in answers in the input fields
- Click "Check Answers" to see results

### 6. Print Worksheet
- Click "Print Worksheet" (or Ctrl+P / Cmd+P)
- Get a clean worksheet with 50 problems on 1 page

## Deployment to GitHub Pages

### Automated Deployment (Recommended)

1. Create a GitHub repository and push your code
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. Push to `main` branch - deployment happens automatically

The workflow in `.github/workflows/deploy.yml` will build and deploy to:
`https://gustavocovas.github.io/op-fun/`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the contents of dist/ to your hosting service
```

## Technology Stack

- **Vue 3** - Composition API for reactive UI
- **Vue Router** - Client-side routing for operations
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS with print optimizations
- **Vanilla JavaScript** - Lightweight core logic

## Design Principles

1. **Focus-Based Learning**: Target specific numbers for mastery
2. **Spaced Repetition**: Built-in review of lower numbers
3. **Progressive Operations**: Subtraction reinforces addition
4. **No Mode Switching**: One UI adapts via CSS for screen/print
5. **Reproducibility**: Same URL = same problems every time
6. **Print-First**: Designed as physical worksheets from the start

## Problem Generation

### Chunk-Based Sequencing
- Problems generated in small chunks (5-6 max)
- Some chunks shuffled for variety
- Prevents long obvious sequences (e.g., 1+1, 1+2, 1+3...)

### Interleaving Pattern (Subtraction)
```
3-4 subtraction (focus)
2-3 subtraction (review)
1 addition (review)
[repeat]
```

### Problem Counts (50 total)

**Addition:**
- 30 focus problems (60%)
- 20 review problems (40%)

**Subtraction:**
- 27 focus problems (54%)
- 18 review problems (36%)
- 5 addition problems (10%)

## Example Learning Path

### Week 1-2: Foundation (Focus 1-5)
Start with addition:
- `/sum/5/1`, `/sum/5/2`, `/sum/5/3` (different variants)
- Master basic addition facts

### Week 3-4: Essential Facts (Focus 6-10)
Continue addition:
- `/sum/6/1`, `/sum/7/1`, `/sum/8/1`, `/sum/9/1`, `/sum/10/1`
- Build confidence and speed

### Week 5-6: Introduction to Subtraction (Focus 1-5)
Switch to subtraction:
- `/sub/5/1`, `/sub/5/2` (includes 10% addition review!)
- Learn subtraction while maintaining addition skills

### Week 7-8: Teens Practice (Focus 11-15)
Both operations:
- `/sum/13/1` - Addition with 13
- `/sub/13/1` - Subtraction with 13
- Often the challenging range

### Month 2+: Advanced (Focus 16-100)
Progressive mastery:
- `/sum/20/1`, `/sub/20/1` - Essential mental math
- `/sum/50/1`, `/sub/50/1` - Advanced practice
- `/sub/10/1/neg` - Introduce negative numbers

## Keyboard Shortcuts

- **Tab** - Move between input fields
- **Enter** - Submit current answer and move to next
- **Ctrl+P / Cmd+P** - Print worksheet

## Features by Design

### Alignment
All operation symbols (+ or -) and equals signs are vertically aligned using fixed-width columns, making the worksheet visually clean and easy to follow.

### No Spinner Arrows
Number input fields have native browser spinner arrows removed for cleaner appearance and better print output.

### Smart Problem Mix
Subtraction includes addition problems to prevent skill regression and maintain a holistic understanding of arithmetic.

### URL Encoding in Negatives
The negative flag is part of the URL path (`/neg`), making shared links preserve all settings including the negative preference.

## Future Enhancements

Potential features for future versions:

- **Multiplication Module**: Times table practice with focus-based approach
- **Division Module**: Division facts with remainder handling
- **Progress Tracking**: LocalStorage to track student mastery
- **Auto-Progression**: Suggest next focus number based on performance
- **Time Trials**: Timed practice sessions with leaderboards
- **Custom Ratios**: Teacher-configurable focus/review ratios
- **Mixed Operations**: Combined practice sets
- **Multiple Languages**: i18n support

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use this for educational purposes!

## Acknowledgments

- Focus-based pedagogy for targeted skill building
- Spaced repetition for long-term retention
- Progressive operations (subtraction builds on addition)
- Designed for both screen and paper use

---

**Happy Practicing!** Start with `/sum/5/1` for your first focused practice session!
