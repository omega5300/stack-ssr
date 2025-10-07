<script setup lang="ts">
import type { DeezerAlbum } from '~/utils/interfaces/deezerInteface'

const { album } = defineProps<{
  album: DeezerAlbum
}>()

const lyricsType = (isExplicit: boolean) => isExplicit 
  ? 'explicit' : 'clean'

</script>

<template>
  <article class="glass deezer">
    <figure>
      <img 
        class="deezer-cover"
        :src="album.cover_xl" 
        :alt="album.md5_image"
      >
      <figcaption class="deezer-album">{{ album.title }}</figcaption>
    </figure>
    <strong>{{ album.artist.name }}</strong>
    <ul class="deezer-info">
      <li>{{ album.record_type }} record</li>
      <li>{{ lyricsType(album.explicit_lyrics) }} lyrics</li>
      <li>{{ album.nb_tracks }} tracks</li>
    </ul>
  </article>
</template>