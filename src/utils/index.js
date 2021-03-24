function mapItem(data) {
  const mapData = data.map((item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist.name,
    album: item.album.title,
    albumImage: item.album.cover_small,
  }));
  return mapData;
}

export { mapItem };
