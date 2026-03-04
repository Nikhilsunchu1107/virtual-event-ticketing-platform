# AGENTS.md

This file provides guidance for agents working with this repository. Below is a comprehensive overview of commands and coding practices to maintain consistency and efficacy across development tasks.

---

## Build, Lint, and Test Commands

### **Backend**

#### **Start the Server**
Run the backend server (default mode):
```bash
npm start
```

#### **Start in Development Mode**
Use `nodemon` for live reloading:
```bash
npm run dev
```

#### **Seed the Database**
Run the database seeder:
```bash
npm run seed
```

---

### **Frontend**

#### **Start the Development Server**
Use this command to launch the frontend development server:
```bash
npm start
```

#### **Build the Project for Production**
Create an optimized build:
```bash
npm run build
```

#### **Run Tests**
Run tests interactively or execute single tests when required:
```bash
npm test
```

---

## Code Style Guidelines

### **General Formatting Rules**
- **Indentation:** Use 2 spaces per level of indentation.
- **Line Length:** Keep lines under 100 characters where possible.
- **Braces and Blocks:**
  - Place opening braces `{` on the same line as the declaration.
  - Always close braces and blocks, even for single-line conditions.

### **Imports**
- Group imports in the following order:
  1. Node.js built-in modules
  2. Third-party libraries
  3. Local modules/files
- Use absolute imports for shared modules, and relative imports for files in the same directory.
- Sort imports alphabetically within their groups.

### **Types (TypeScript/JSDoc)**
- Use TypeScript annotations OR JSDoc comments for all exported functions and modules (if applicable).
- Provide clear types for function parameters, return values, and objects.

### **Naming Conventions**
- **Variables:** Use `camelCase` for variables and functions.
- **Constants:** Use `UPPER_SNAKE_CASE` for constants.
- **Classes:** Use `PascalCase` for class and component names.
- **File Names:**
  - Use `camelCase.js` or `kebab-case.js` for scripts.
  - Match class files to their exported class name.

### **Error Handling**
Use the following guidelines for robust error handling:
- Always handle exceptions using `try-catch` blocks in async or potentially failing code blocks.
- Log detailed error messages using a logger (if configured).
- Avoid generic error messages; provide actionable context wherever feasible.

---

## Notes for Agents
1. Respect community standards; adhere to the established coding practices.
2. Keep your changes focused only on the task you are assigned to avoid unintended side effects.
3. If a linter is in place, resolve warnings before submitting changes.
