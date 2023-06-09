const fs = require('node:fs/promises');
const createReadStream = require('fs').createReadStream;
const path = require('path');
const csv = require('fast-csv');

let risFields = ['TY', 'TI', 'AB', 'A1', 'A2', 'A3', 'A4', 'AD', 'AN', 'AU', 'AV', 'BT', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'CA', 'CN', 'CP', 'CT', 'CY', 'DA', 'DB', 'DO', 'DP', 'ED', 'EP', 'ET', 'ID', 'IS', 'J1', 'J2', 'JA', 'JF', 'JO', 'KW', 'L1', 'L2', 'L3', 'L4', 'LA', 'LB', 'LK', 'M1', 'M2', 'M3', 'N1', 'N2', 'NV', 'OP', 'PB', 'PP', 'PY', 'RI', 'RN', 'RP', 'SE', 'SN', 'SP', 'ST', 'T1', 'T2', 'T3', 'TA', 'TT', 'U1', 'U2', 'U3', 'U4', 'U5', 'UR', 'VL', 'VO', 'Y1', 'Y2', 'ER']
let key2tag = {
    'A1': 'first_authors',
    'A2': 'secondary_authors',
    'A3': 'tertiary_authors',
    'A4': 'subsidiary_authors',
    'AB': 'abstract',
    'AD': 'author_address',
    'AN': 'accession_number',
    'AU': 'authors',
    'C1': 'custom1',
    'C2': 'custom2',
    'C3': 'custom3',
    'C4': 'custom4',
    'C5': 'custom5',
    'C6': 'custom6',
    'C7': 'custom7',
    'C8': 'custom8',
    'CA': 'caption',
    'CN': 'call_number',
    'CY': 'place_published',
    'DA': 'date',
    'DB': 'name_of_database',
    'DO': 'doi',
    'DP': 'database_provider',
    'EP': 'end_page',
    'ER': 'end_of_reference',
    'ET': 'edition',
    'ID': 'id',
    'IS': 'number',
    'J2': 'alternate_title1',
    'JA': 'alternate_title2',
    'JF': 'alternate_title3',
    'JO': 'journal_name',
    'KW': 'keywords',
    'L1': 'file_attachments1',
    'L2': 'file_attachments2',
    'L4': 'figure',
    'LA': 'language',
    'LB': 'label',
    'M1': 'note',
    'M3': 'type_of_work',
    'N1': 'notes',
    'N2': 'notes_abstract',
    'NV': 'number_of_volumes',
    'OP': 'original_publication',
    'PB': 'publisher',
    'PY': 'year',
    'RI': 'reviewed_item',
    'RN': 'research_notes',
    'RP': 'reprint_edition',
    'SE': 'section',
    'SN': 'issn',
    'SP': 'start_page',
    'ST': 'short_title',
    'T1': 'primary_title',
    'T2': 'secondary_title',
    'T3': 'tertiary_title',
    'TA': 'translated_author',
    'TI': 'title',
    'TT': 'translated_title',
    'TY': 'type_of_reference',
    'UK': 'unknown_tag',
    'UR': 'url',
    'VL': 'volume',
    'Y1': 'publication_year',
    'Y2': 'access_date'
};

(async function () {
    // PREGĂTEȘTE SCRIEREA FIȘIERULUI
    const fileName = 'result.ris';
;
    const stream = createReadStream(path.resolve(__dirname, 'assets', 'a.csv'));
    stream
        .pipe(csv.parse({
            headers: true,
            ignoreEmpty: true
        }))
        .transform((row) => {
            // let record = '';
            // https://en.wikipedia.org/wiki/RIS_(file_format)
            // Type of reference (must be the first tag)
            let record = `TY  - ${row.TY}\nTI  - ${row.TI}\nCT  - ${row.CT}\nM3  - ${row.M3}\nPY  - ${row.PY}\n`;
            
            if (row.AU.split(';').length) {
                let authorsArr = row.AU.split(';');
                let author = '';
                for (author of authorsArr) {
                    record += 'AU  - ' + author.trim() + '\n'; // Author (each author on its own line preceded by the AU tag)
                }
            } else {
                record += 'AU  - ' + row.AU.trim() + '\n'; // single author
            }

            // console.log(row.KW);
            if (row.KW) {
                if (row.KW.split(',').length) {
                    let kwArr = row.KW.split(',');
                    let kw = '';
                    for (kw of kwArr) {
                        record += 'KW  - ' + kw.trim() + '\n'; // Keywords (keywords should be entered each on its own line preceded by the tag)
                    }
                } else {
                    record += 'KW  - ' + row.KW + '\n'; // single keyword
                }
            }

            if (row?.AB) {
                record += `AB  - ${row.AB}\n`;
                // console.log(row.AB);
            }

            record += 'ER  - ' + '\n';
            fs.appendFile(fileName, record, 'utf-8'); // scrie datele în fișierul ris
            return row;
        })
        .on('error', error => console.error(error))
        .on('data', (data) => {
            console.log(data);
        })
        .on('end', (rowCount) => {
            console.log(`Parsed ${rowCount} rows`);
        });
})();

// Use cases for refinement times
    // https://blog.logrocket.com/complete-guide-csv-files-node-js/
    // https://geshan.com.np/blog/2021/11/nodejs-read-write-csv/
    // https://www.tabnine.com/code/javascript/modules/fast-csv