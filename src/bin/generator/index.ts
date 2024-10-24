import {
  CommandLineAction,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_SERVICE_PATH } from '../../utils/constants';
import { getPrefix } from '../migrations/utils/date.utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class GeneratorCli extends CommandLineAction {
  private name: CommandLineStringParameter;
  private outDir: CommandLineStringParameter;

  constructor() {
    super({
      actionName: 'create',
      summary: 'Create a new mongodb seeder.',
      documentation: 'Create a new mongodb seeder.',
    });

    this.name = this.defineStringParameter({
      argumentName: 'NAME',
      parameterLongName: '--name',
      description: 'The name of the seeder file',
      required: true,
    });

    this.outDir = this.defineStringParameter({
      argumentName: 'OUT_DIR',
      parameterLongName: '--out',
      description: 'The output location of the seeder',
      required: true,
    });
  }

  protected async onExecute() {
    if (!this.name.value || !this.outDir.value) {
      throw new Error('Name and out dir are required');
    }

    const prefix = getPrefix();

    const fileName = `${prefix}-${this.name.value}.ts`;
    const destDir = path.resolve(
      APP_SERVICE_PATH,
      this.outDir.value,
      'seeders'
    );
    const destPath = path.resolve(destDir, fileName);
    const srcPath = path.resolve(__dirname, `./skeleton/seeder.ts`);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, {
        recursive: true,
      });
    }

    fs.copyFileSync(srcPath, destPath);

    console.log(`Seeder created!`);
  }
}
