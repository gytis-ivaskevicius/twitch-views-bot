import gql from "graphql-tag";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import fetch from "node-fetch"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://gql.twitch.tv/gql',
        headers: {"Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko"},
        fetch
    })
});

export function queryStreams() {
    return client.query({
        query: gql`{
            softwareDev: streams(tags: "6f86127d-6051-4a38-94bb-f7b475dde109", options: {languages: EN}) {
                ...fields
            }
            gameDev: streams(tags: "f588bd74-e496-4d11-9169-3597f38a5d25", options: {languages: EN}) {
                ...fields
            }
            mobileDev: streams(tags: "6e23d976-33ec-47e8-b22b-3727acd41862", options: {languages: EN}) {
                ...fields
            }
            webDev: streams(tags: "c23ce252-cf78-4b98-8c11-8769801aaf3a", options: {languages: EN}) {
                ...fields
            }
        }

        fragment fields on StreamConnection {
            edges {
                node {
                    broadcaster {
                        channel {
                            id
                            name
                        }
                        stream {
                            viewersCount
                        }
                    }
                }
            }
        }`,
    })
}

