This is the ***foodfy*** series of challenges, from the ***launchbase course*** from ***Rocketseat***, (a javascript course).  

All challenges relate to building a site of cooking recipes and related chefs.

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

#### How to run (Challenges 1 to 3)

- Option 1 - node
  * clone this repository
  * Install node.js
  * `npm install`
  * `npm run nodemon`
  * In the browser open `http://localhost:5510` and `http://localhost:5510/admin`  
- Option 2 - docker
  * Install and test docker on your system
  * `docker pull fercyto/foodfy-challenge3`
  * `docker run -p 5010:5010 fercyto/foodfy-challenge3`
  * In the browser open `http://localhost:5510/admin` and `http://localhost:5010`  

### ***Fourth Challenge*** (portuguese):

https://github.com/rocketseat-education/bootcamp-launchbase-desafios-05/blob/master/desafios/05-persistindo-dados-foodfy.md

#### Summary

* Migrate data that were in a `.json` to a PostgreSQL database
* Create *chef* pages, such as `create`, `list`, `edit`.
* Create a filter field to search for recipes

* Create a *main*, *details*, *edition* and *creation* pages with buttons as in:    
  * [admin/index.html](https://rawcdn.githack.com/rocketseat-education/bootcamp-launchbase-desafios-05/0e2651f64b0e06c8c23e3b86b10cfda55c6bfbd4/layouts/admin/index.html)
  * [site/index.html](https://rawcdn.githack.com/rocketseat-education/bootcamp-launchbase-desafios-05/0e2651f64b0e06c8c23e3b86b10cfda55c6bfbd4/layouts/site/index.html)
  
  * or paste this links:
  https://raw.githubusercontent.com/rocketseat-education/bootcamp-launchbase-desafios-05/master/layouts/admin/index.html  
  https://raw.githubusercontent.com/rocketseat-education/bootcamp-launchbase-desafios-05/master/layouts/site/index.html  
  into: https://raw.githack.com/

### ***Fifth Challenge*** (portuguese):

Source: https://github.com/rocketseat-education/bootcamp-launchbase-desafios-07/blob/master/desafios/07-foodfy-envio-imagens.md

#### Summary

* Files: Create in the PostgreSQL database a table: `files [id, name, path]` to get images paths
* Files -> Recipes: Create relationship table `recipe_files[id, recipe_id -> recipes(id), file_id -> files(id)]`
* Recipes Create/Edit: add photos to recipes pages, removing previous `image` field, creating new field to upload images and adding a limit of 5 photos and minimum of one
* Chefs: Remove the image url field (`avatar_url`) from `chefs` table.
* Files -> Chefs: Create relationship `chefs[file_id -> files(id) ...]`
* Show Page: Add a gallery to show all the photos of the recipe
* Use async/await

* Modify `recipes` pages: *details*, *creation*, *edition*, to show/upload photos, as in: [index.html](https://raw.githack.com/rocketseat-education/bootcamp-launchbase-desafios-07/master/layouts/index.html)
* Modify `chef` pages: *creation*, *edition*, to upload photos, as in: [index.html](https://raw.githack.com/rocketseat-education/bootcamp-launchbase-desafios-07/master/layouts/index.html)

#### How to run 

- docker
  * Install *git* on your system
  * Install and test *docker* on your system
  * If you are in Windows (WSL2) don't use `/mnt/c/User/path`, go to `/home/user` with `cd ~`
  * `git clone --recurse-submodules https://github.com/fernandoroa/foodfy_parent_db`
  * `cd foodfy_parent_db`
  * `docker compose up`
  * In the browser, open `http://localhost:5010` and `http://localhost:5010/admin`
