import { defineConfig } from 'tsup';

export default defineConfig([
  // Config 1: The Library (ESM + CJS, Dependencies external)
  {
    entry: ['src/index.js'],
    format: ['cjs', 'esm'],
    dts: true,              // Generate .d.ts files for the library
    clean: false,           // careful not to delete the bin build
    sourcemap: false,
    splitting: false,       // Libraries usually work best without splitting unless huge
    // "external" is default behavior for tsup (it respects dependencies), 
    // so we don't need 'noExternal' here.
  },

]);