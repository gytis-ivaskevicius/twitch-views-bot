import {queryStreams} from "./TwitchService";
import streamEntryFactory from "./StreamEntry"
import {appendEntry} from "./FsService";

const main = async () => {
    console.log("========================= START =========================")
    const startTime = Date.now()
    Object.values((await queryStreams()).data)
        // @ts-ignore
        .flatMap(it => it.edges)
        .map(it => it.node.broadcaster)
        .filter((element, index, arr) =>
            arr.find((it, i) => i != index && it.channel.id === element.channel.id))
        .map(it => streamEntryFactory(it.channel.id, it.channel.name, it.stream.viewersCount))
        .forEach(appendEntry)
    console.log(`==================== FINISHED IN: ${Date.now() - startTime} ====================`)
}


setInterval(main, 1000 * 60 * 30)
main()