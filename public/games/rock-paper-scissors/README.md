# Rock Paper Scissors static slot

Manual deploy target for a private game build.

Copy the private repository build folder here:

```txt
public/games/rock-paper-scissors/dist/
```

Expected URL after Neuro deploy:

```txt
https://vziatkov.github.io/neuro/games/rock-paper-scissors/
```

For a portable Vite build, use a relative base in the private game repo:

```ts
export default defineConfig({
  base: "./",
});
```

This keeps asset links relative to `dist/index.html`.
