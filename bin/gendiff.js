#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-v, --vers', 'output the current version')
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<filepath1> <filepath2>');
    


program.parse();

