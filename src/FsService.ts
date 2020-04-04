import {StreamEntry} from "./StreamEntry";
import {promises as fs} from "fs"
import {outPath} from "../package.json"

function entryToCsv({streamId, name, viewersCount}: StreamEntry): string {
    return `${new Date().toISOString()}, ${streamId}, "${name}", ${viewersCount}\n`
}

export function appendEntry(entry: StreamEntry) {
    return fs.appendFile(outPath, entryToCsv(entry), {encoding: "UTF-8"});
}

