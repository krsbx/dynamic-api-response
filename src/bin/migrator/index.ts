import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import {
  listMigrationHistories,
  listSeeders,
} from '../migrations/utils/migrations.utils';
import { MIGRATION_ACTION, MigrationAction } from './utils/constants.utils';
import {
  downMigrations,
  latestMigrations,
  revertMigrations,
  upMigrations,
} from './utils/migration.utils';

export class MigratorCli extends CommandLineAction {
  private action: CommandLineChoiceParameter<MigrationAction>;
  private target: CommandLineStringParameter;

  constructor() {
    super({
      actionName: 'migrate',
      summary: 'Run mongodb seeder.',
      documentation: 'Run mongodb seeder.',
    });

    this.action = this.defineChoiceParameter({
      alternatives: [
        MIGRATION_ACTION.UP,
        MIGRATION_ACTION.DOWN,
        MIGRATION_ACTION.LATEST,
        MIGRATION_ACTION.REVERT,
      ],
      description: 'Type of migration actions',
      parameterLongName: '--action',
      defaultValue: MIGRATION_ACTION.LATEST,
    });

    this.target = this.defineStringParameter({
      argumentName: 'TARGET',
      parameterLongName: '--target',
      description: 'Target migration name',
    });
  }

  protected async onExecute() {
    const { connectDB } = await import('../../utils/mongoose');
    const db = await connectDB();

    const histories = await listMigrationHistories();

    const seeders = await listSeeders();

    switch (this.action.value) {
      case MIGRATION_ACTION.UP: {
        await upMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
        break;
      }

      case MIGRATION_ACTION.DOWN: {
        await downMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
        break;
      }

      case MIGRATION_ACTION.REVERT: {
        await revertMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
        break;
      }

      case MIGRATION_ACTION.LATEST: {
        await latestMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
        break;
      }

      default: {
        throw new Error(`Unknown action: ${this.action.value}`);
      }
    }

    db.disconnect();
  }
}
