import type { CompilerPlugin, Program, TranspileObj } from 'brighterscript';

import * as fs from 'fs-extra';
import * as path from 'path';

export class ListBscPlugin implements CompilerPlugin {
    public name = 'list-bsc-plugin';

    afterProgramTranspile (program: Program, entries: TranspileObj[]) {
        console.log('the program finished transpiling - updating manifest');
        try {
            this.mcConvenienceMethods(entries);
        } catch (error) {
            // console.error(error);
        }

    }

    mcConvenienceMethods(entries: TranspileObj[]) {
        for (let entry of entries) {
            if (entry.outputPath.includes('/sl/')) {
                let text = fs.readFileSync(entry.outputPath, 'utf8');

                let r = /(mc_)(getString|getPath|getInteger|getArray|getAA|getFloat|getBoolean|getPoint|getNode|getNumber|getAny|getPath)*/gim;
                text = text.replace(r, 'sc_$2');

                fs.writeFileSync(entry.outputPath, text);
            }

        }
        throw new Error('Method not implemented.');
    }
}

export default () => {
    return new ListBscPlugin();
};
