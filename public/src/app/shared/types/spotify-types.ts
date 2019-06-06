export interface Artist {
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string,
    images: CoverArt[]
}

export interface Album {
    album_type?: string,
    artists?: Artist[],
    href?: string,
    id: string,
    images?: CoverArt[],
    name?: string,
    release_date?: string,
    release_date_precision?: string,
    total_tracks?: number,
    type?: string,
    uri?: string,
    tracks?: { items: Track[] }
}

export interface CoverArt {
    width: number,
    height: number,
    url: string
}

export interface Track {
    album: Album,  
    artists: Artist[],
    disc_number: 1
    duration_ms: 228826
    episode: boolean,
    explicit: boolean,
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track: boolean,
    track_number: number,
    type: string,
    uri: string,
    currentlyPlaying?: boolean
}

export interface Playlist {
    collaborative: boolean,
    description: string,
    followers: PlaylistFollowers,
    href: string,
    id: string,
    images: CoverArt[],
    name: string,
    owner: Owner,
    primary_color: string,
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string, 
        items: PlaylistItem[], 
        limit: number
    }
    type: string,
    uri: string
}

export interface PlaylistItem {
    added_at: string,
    added_by: PlaylistItemAddedBy,
    is_local: boolean,
    primary_color: string,
    track: Track,
    video_thumbnail: {}
}

export interface PlaylistItemAddedBy {
    external_urls: {},
    href: string,
    id: string,
    type: string,
    uri: string
}

export interface Owner {
    display_name: string,
    href: string,
    id: string,
    type: string,
    uri: string
}

export interface PlaylistFollowers {
    href: string,
    total: number
}