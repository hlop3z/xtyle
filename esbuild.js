const esbuild = require('esbuild');

esbuild
	.build({
		entryPoints: ['src/index.js'],
		outdir: 'dist',
		bundle: true,
		sourcemap: false,
		minify: true,
		splitting: false,
		format: 'esm',
		target: ['esnext'],
	})
	.catch(() => process.exit(1));
