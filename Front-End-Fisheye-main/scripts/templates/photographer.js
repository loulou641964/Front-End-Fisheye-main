function photographerTemplate(data) {
    const { name, city, country, portrait, price, tagline, id } = data;
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
        p.classList.add("pricing")
        p.textContent = price + "€/jour";
        const taglineElt = document.createElement("p");
        taglineElt.textContent = tagline;
        taglineElt.classList.add("tagline");
        const link= document.createElement ("a")
        link.href="./photographer.html?id="+id
        

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElt);
        article.appendChild(p);
        link.appendChild(article);
        

        return link;
    }

    return { name, picture, getUserCardDOM };
}
  
