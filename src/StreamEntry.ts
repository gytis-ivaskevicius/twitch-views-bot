
export default function (streamId: number, name: string, viewersCount: number): StreamEntry {
    return {streamId, name, viewersCount}
}

export interface StreamEntry {
    streamId: number
    name: string
    viewersCount: number
}

