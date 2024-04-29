function photographerTemplate(data) {
    const { name, portrait, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p =document.createElement("p")
        p.textContent = price + "€/jour"
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}