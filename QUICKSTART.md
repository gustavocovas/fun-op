# Quick Start Guide

## Run the Application Locally

```bash
# Start the development server
npm run dev
```

Then open your browser to `http://localhost:5173`

## Try These Example URLs

Once the app is running, try these URLs to see different configurations:

- **Beginner**: `?id=5-1`
  - Focus: 5, practice 5+1, 5+2, 1+5, 2+5, etc.
  
- **Building Confidence**: `?id=10-42`
  - Focus: 10, essential addition facts

- **The Tricky Teens**: `?id=13-100`
  - Focus: 13, often challenging for students

- **Essential Facts**: `?id=20-7`
  - Focus: 20, important for mental math

- **Advanced**: `?id=50-123`
  - Focus: 50, for advanced students

## Understanding the Focus System

When you practice with **focus = 13**:

### 60% Focus Problems
Operations involving 13:
- 13+1, 13+2, 13+3, ..., 13+13
- 1+13, 2+13, 3+13, ..., 13+13

### 40% Review Problems
Random operations from lower numbers:
- 12+1, 10+3, 9+5, 7+6, etc.
- Maintains mastery of previously learned numbers

### Problem Organization
- **Short chunks**: 5-6 sequential problems
- **Variety**: Some chunks shuffled
- **Interleaved**: Focus and review problems mixed

## Features to Try

1. **Generate Practice**: 
   - Click "Show Config"
   - Enter a focus number (1-100)
   - Click "Generate Practice"

2. **Quick Select**: 
   - Use quick buttons (5, 10, 12, 15, 20, etc.)

3. **Random Practice**: 
   - Click "Random Practice" for surprise configuration

4. **Check Answers**: 
   - Fill in answers
   - Click "Check Answers" for feedback
   - Green = correct, Red = incorrect

5. **Print Worksheet**: 
   - Click "Print Worksheet"
   - Answers hidden, ready to write on!

## Print Testing

To test the print functionality:
1. Fill in or skip some problems
2. Click "Print Worksheet" (or Ctrl+P / Cmd+P)
3. Notice how:
   - Your answers disappear (prints blank)
   - Input fields become writable lines
   - Buttons and config hidden
   - Clean B&W for printing

## Progressive Learning Path

Suggested progression for students:

### Week 1-2: Foundation (Focus 1-5)
- `5-1`, `5-2`, `5-3` (different variants)
- Master basic facts

### Week 3-4: Essential Facts (Focus 6-10)
- `6-1`, `7-1`, `8-1`, `9-1`, `10-1`
- Build confidence and speed

### Week 5-6: Teens (Focus 11-15)
- `11-1`, `12-1`, `13-1`, `14-1`, `15-1`
- Often the challenging range

### Month 2: Foundation Plus (Focus 16-20)
- `16-1`, `17-1`, `18-1`, `19-1`, `20-1`
- Essential for mental math

### Month 3+: Advanced (Focus 21-100)
- `25-1`, `30-1`, `50-1`, `100-1`
- Advanced practice and mastery

## URL Format

Simple: `focus-seed`

- **Focus**: Number to practice (1-100)
- **Seed**: Variant number (1-9999)

Examples:
- `13-42` → Focus 13, seed 42
- `20-777` → Focus 20, seed 777
- `5-1` → Focus 5, seed 1

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/op-fun.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Automatic deployment!

4. Your app will be live at:
   `https://YOUR_USERNAME.github.io/op-fun/`

## File Structure

```
op-fun/
├── src/
│   ├── components/         # Vue UI components
│   ├── modules/           # Focus-based problem generation
│   ├── utils/             # URL encoding & RNG
│   ├── App.vue            # Main app
│   └── style.css          # Print-friendly styles
├── .github/workflows/      # Auto-deployment
├── README.md              # Full documentation
└── package.json           # Dependencies
```

## Customization Ideas

### Adjust Focus/Review Ratio
Edit `src/modules/sum.js`:
```javascript
const focusCount = Math.floor(nOps * 0.6); // Change 0.6 to 0.7 for 70%
const reviewCount = nOps - focusCount;
```

### Change Chunk Size
Edit `src/modules/sum.js`:
```javascript
const maxChunkSize = 6;  // Change to 8 for longer chunks
const minChunkSize = 5;  // Change to 4 for shorter chunks
```

### Add More Problem Types
- Create new modules in `src/modules/` (subtraction.js, multiplication.js)
- Add module selector in ConfigPanel

## Tips for Teachers

1. **Assign Specific URLs**: Share exact URLs for consistent practice
2. **Progressive Assignment**: Assign focus 5, then 6, then 7, etc.
3. **Print Multiple Seeds**: Same focus, different seeds for variety
4. **Review Days**: Use lower focus numbers for review
5. **Challenge Days**: Jump to higher focus for advanced students

## Tips for Parents

1. **Start Low**: Begin with focus 5, even if it seems easy
2. **Daily Practice**: One practice set (100 problems) per day
3. **Celebrate Progress**: Move to next focus number when comfortable
4. **Mixed Review**: Occasionally go back to lower focus numbers
5. **Track URLs**: Keep a list of completed URLs to see progress

Happy practicing! 🎉

Start with `5-1` for your first focused practice session!
