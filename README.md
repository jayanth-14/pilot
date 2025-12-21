# Project Overview

=== PROJECT SUMMARY (AI-generated) ===
**Kind of project.**
This project is an AI-driven automation agent designed for Command Line Interface (CLI) tasks.

**What problem of it is solving.**
The project automates user tasks by converting a user's task description into shell commands. It achieves this by orchestrating the process of interacting with an AI model, generating a response, and subsequently executing that response as a shell command.

**Major components.**
**Configuration Management:** A module provides a utility function to safely retrieve required environment variables. It ensures the presence of critical configuration by exiting the application if a specified variable is not found.
**AI Prompt Builder:** A component generates comprehensive system prompts for an AI CLI automation agent. It encapsulates crucial instructions regarding the agent's persona, environment, strict shell command output rules, and interaction protocols for requesting additional context.
**Gemini AI Client:** A dedicated client interacts with the Google Gemini AI model. It sends prompts to a specified Gemini model, extracts generated text from the AI's response, and incorporates a retry mechanism with exponential backoff for handling transient errors.
**Shell Command Executor:** A function executes arbitrary shell commands. It utilizes Deno's `Deno.Command` API to run a given command via `zsh`, piping standard input, output, and error streams.

**Key control points.**
**Application Entry Point:** The `main.js` file serves as the main entry point for the application. It takes a user's task description as input.
**Orchestration:** The `main.js` file orchestrates the process of building an AI prompt, interacting with the Gemini AI, and executing the generated response as a shell command.
**Environment Variable Validation:** A utility function performs validation and ensures the presence of critical environment variables, exiting the application if missing.
**AI Interaction Retry:** The Gemini AI client incorporates a retry mechanism with exponential backoff for handling transient errors during interaction with the AI model.

**Constraints.**
**Environment:** The application requires specific environment variables for critical configuration.
**AI Service:** The project interacts with the Google Gemini AI model.
**Shell Execution:** Shell commands are executed via `zsh` using Deno's `Deno.Command` API.

=== FILE CONTEXT (AI-generated, per file) ===


### ./utils/env.js
This module provides the `requireEnv` utility function, responsible for safely retrieving required environment variables. It ensures the presence of critical configuration by exiting the application if a specified environment variable is not found.

### ./README.md
This file serves as the main project overview, providing a high-level introduction and general information about the project. It is intended to be the primary entry point for anyone looking to understand the project's purpose and scope.

### main.js
This file serves as the main entry point for the application, taking a user's task description as input. It orchestrates the process of building an AI prompt, interacting with the Gemini AI to generate a response, and subsequently executing that response as a shell command.

### ./.gitignore
This file specifies intentionally untracked files and directories that Git should ignore. Its purpose is to prevent specific items, such as the `./pilot` directory, from being included in version control.

### ai/promptBuilder.js
This file provides the `buildSystemPrompt` function, which is responsible for generating the comprehensive system prompt for an AI CLI automation agent. It encapsulates crucial instructions regarding the agent's persona, environment, strict shell command output rules, and interaction protocols for requesting additional context.

### ai/geminiClient.js
This file provides a dedicated client for interacting with the Google Gemini AI model. Its `callGemini` function sends prompts to a specified Gemini model, extracts the generated text from the AI's response, and incorporates a retry mechanism with exponential backoff for handling transient errors. It serves as the core utility for generating AI content via Gemini within the project.

### exec/shell.js
This file provides the `runShell` function, which is responsible for executing arbitrary shell commands. It utilizes Deno's `Deno.Command` API to run a given command via `zsh`, piping standard input, output, and error streams.

