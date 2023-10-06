This is the ***foodfy*** series of challenges, from the ***launchbase course*** from ***Rocketseat***, (a javascript course).  

All challenges relate to building a site of cooking recipes and related chefs.

Branch names correspond to those challenges. Check also [previous_challenges.md](previous_challenges.md)

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


### How to run 

- docker
  * Install *git* on your system
  * Install and test *docker* on your system
  * If you are in Windows (WSL2) don't use `/mnt/c/User/path`, go to `/home/user` with `cd ~`
  * `git clone --recurse-submodules https://github.com/fernandoroa/foodfy_parent_db`
  * `cd foodfy_parent_db`
  * `docker compose up`
  * In the browser, open `http://localhost:5010` and `http://localhost:5010/admin`
