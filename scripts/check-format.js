#!/usr/bin/env node
// Simple placeholder lint script that ensures the repository uses LF line endings.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const filesToCheck = ['package.json', 'README.md'];

const hasCarriageReturn = (content) => content.includes('\r\n');

const violations = filesToCheck.filter((file) => {
  const content = readFileSync(join(process.cwd(), file), 'utf8');
  return hasCarriageReturn(content);
});

if (violations.length > 0) {
  console.error('Found CRLF line endings in:', violations.join(', '));
  process.exit(1);
}

console.log('Formatting check passed');
