# solidos-mono

This repository is an experiment to see what SolidOS would look like as a monorepo.

It brings several SolidOS packages and apps together in one place so they can be developed, built, and tested with a shared workspace.

## Requirements

You need [pnpm](https://pnpm.io/) installed.

If you already have Node.js installed, the easiest way to install pnpm is with Corepack:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

If you prefer, you can also install it with npm:

```bash
npm install -g pnpm
```

## Clone

```bash
git clone https://github.com/SharonStrats/solidos-mono.git
cd solidos-mono
```

## Setup

Install all workspace dependencies from the repository root:

```bash
pnpm install
```

## Run

Start all workspace dev scripts in parallel:

```bash
pnpm dev
```

Run the Pivot app only:

```bash
pnpm dev:pivot
```

Run the Mashlib watcher only:

```bash
pnpm dev:mashlib
```

Build everything:

```bash
pnpm build
```

Run all available tests:

```bash
pnpm test
```

## Notes

- The workspace is managed from the repository root with pnpm workspaces.
- Some packages may have their own package-specific commands in their own directories.
- If a dev server is already using a port, stop that process before starting another one.
