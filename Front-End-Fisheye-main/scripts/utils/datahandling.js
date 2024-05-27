async function getPhotographers() {
    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des photographes:", error);
        return { photographers: [] };
    }
}

async function getMediaByPhotographer(id){
    const data = await getPhotographers()
    const medias = data.media.filter(elt => elt.photographerId === id)
    return medias

}

export {getPhotographers, getMediaByPhotographer}


export async function getPhotographerIds() {
    try {
        const data = await getPhotographers();
        const ids = data.photographers.map(photographer => photographer.id);
        return ids;
    } catch (error) {
        console.error("Erreur lors de l'extraction des identifiants des photographes:", error);
        return [];
    }
}




