Hello

This is the foodfy series of challenges, from the ***launchbase course*** from ***Rocketseat***, (a javascript course).  

All challenges relate to building a site of cooking recipes.

Branch names correspond to those challenges.

### ***First Challenge*** (portuguese):

https://github.com/rocketseat-education/bootcamp-launchbase-desafios-02/blob/master/desafios/02-foodfy.md

#### Summary

* Only front-end
* Files for images where shared in this folder:  
https://github.com/rocketseat-education/bootcamp-launchbase-desafios-02/tree/master/layouts
* Create a simple site as seen in:  
https://github.com/rocketseat-education/bootcamp-launchbase-desafios-02/blob/master/layouts/foodfy.pdf

### ***Second Challenge*** (portuguese):

https://github.com/rocketseat-education/bootcamp-launchbase-desafios-03/blob/master/desafios/03-refatorando-foodfy.md
#### Summary

* Start the back-end
* JS object of recipes where shared in a [file](https://github.com/rocketseat-education/bootcamp-launchbase-desafios-03/blob/master/assets/data.js)
* Other assets where shared in the folder:  
https://github.com/rocketseat-education/bootcamp-launchbase-desafios-03/tree/master/layouts/specs
* Use of nunjucks templates
* Clicking in the recipe should open a new page, looking like this:  
https://github.com/rocketseat-education/bootcamp-launchbase-desafios-03/blob/master/layouts/specs/preview/desafio-03-back-end-receitas-detalhe.png
* "Buttons" (links) to [show/hide] [mostrar/esconder] details of the recipe should be added

### ***Third Challenge*** (portuguese):

https://github.com/rocketseat-education/bootcamp-launchbase-desafios-04/blob/master/desafios/04-admin-foodfy.md

#### Summary

* Create admin area/routes
* Migrate data from `data.js` to `data.json`
* Create a *main*, *details*, *edition* and *creation* pages with buttons as in:  
  * https://rawcdn.githack.com/rocketseat-education/bootcamp-launchbase-desafios-04/6a1c5e8a4f2221024b520ce685861e76040c3f96/layouts/specs/index.html  

  * or paste this:
https://raw.githubusercontent.com/rocketseat-education/bootcamp-launchbase-desafios-04/master/layouts/specs/index.html  
into: https://raw.githack.com/

#### How to run

- Option 1 - node
  * clone this repository
  * Install node.js
  * `npm install`
  * `npm run nodemon`
  * In the browser open `http://localhost:5510`  
- Option 2 - docker
  * Install and test docker on your system
  * `docker pull fercyto/foodfy-challenge3`
  * `docker run -p 5010:5010 fercyto/foodfy-challenge3`
  * In the browser open `http://localhost:5010`  


