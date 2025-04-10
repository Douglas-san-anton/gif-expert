export const getGifs = async (category, page = 0) => {
    const limit = 12;
    const offset = page * limit;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=iTFVJves3l5b7hAulOucqxnqc7PIcPFQ&q=${category}&limit=${limit}&offset=${offset}`;
    const resp = await fetch(url);
    const { data } = await resp.json();

    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url,
    }));
    
    return gifs;
}