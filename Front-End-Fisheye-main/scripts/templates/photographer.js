function photographerTemplate(data) {
    const { name, city, country, portrait, price, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const location = document.createElement("h3");
        location.textContent = `${city}, ${country}`;
        const p = document.createElement("p");
        p.textContent = price + "€/jour";
        const taglineElt = document.createElement("p");
        taglineElt.textContent = tagline;
        taglineElt.classList.add("tagline");
        

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElt);
        article.appendChild(p);
        

        return article;
    }

    return { name, picture, getUserCardDOM };
}
  
