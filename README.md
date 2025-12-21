# Pilot - AI Based Cli Agent

### No more reading boring MAN pages—just say what you want and pilot handles it.

### Table of contents:
- [What is Pilot?](#what-is-pilot)
- [Prerequisites](#prerequisites)
  - [Deno](#deno)
  - [Gemini API key](#gemini-api-key)
- [Installing pilot](#installing-pilot)
  - [Cloning repository](#cloning-repository)
  - [Running the installer](#running-the-installer)
  - [Setting up API key](#setup-api-key)
- [Usage](#usage)
- [How It works](#how-it-works)
- Limitations
- Future improvements

# What is Pilot?
Pilot is an AI-powered CLI agent with access to your filesystem via terminal. It takes your natural language prompt, generates the shell commands needed, and executes them automatically.

# Prerequisites:
You'll need two things before installing:

## Deno: 
[Deno](https://deno.com/) is a JavaScript runtime. Pilot uses it to compile and run.

#### For Mac And Linux :
```bash
curl -fsSL https://deno.land/install.sh | sh
```

#### For windows:
```powershell
irm https://deno.land/install.ps1 | iex
```

## Gemini API Key:
Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

# Installing Pilot
Lets not wait anymore and install pilot -

#### Cloning Repository
```bash
git clone https://github.com/jayanth-14/pilot
cd pilot
```

#### Running the Installer
```bash
./install.sh
```

#### Setup API Key
Add your Gemini API key to the shell config file.
```bash
echo 'export GEMINI_API_KEY="your-api-key"' >> ~/.zshrc
source ~/.zshrc
```
Replace "your-api-key" with your actual key from Google AI Studio.

# Usage
Now that the boring setup is done, let's move on to the fun part.

Basic Syntax:
```bash
pilot "your task in plain English"
```

Examples:
Here are a few interactive examples to get started.

#### Want to change js files to ts?
```bash
pilot "rename all the .js files to .ts"
```

#### Want to know who is the top contributor in project?
```bash
pilot "analyze the git history and show me the most active contributors"
```

#### Want to see last 10 commit messages?
```bash
pilot "show me the last 10 commit messages"
```

# How it works
When you run `Pilot`, it reads your natural language prompt, combines it with system rules, sends that prompt to the Gemini AI along with a system prompt. Then executes the response as shell commands.

**The pipeline**
1. Pilot reads the prompt.
2. Builds a complete prompt with system rules(To only output shell commands).
3. Sends to Gemini AI for command generation.
4. Executes the shell commands via `zsh`.