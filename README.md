This is the ***foodfy*** series of challenges, from the ***launchbase course*** from ***Rocketseat***, (a javascript course).  

All challenges relate to building a site of cooking recipes and related chefs.

Branch names correspond to those challenges. Check also [previous_challenges.md](previous_challenges.md)

### ***Sixth Challenge*** (portuguese):

Source: https://github.com/rocketseat-education/bootcamp-launchbase-desafios-08/blob/master/desafios/08-apresentacao-organizacao-receitas-foodfy.md

#### Summary

* Recipes in the listings page and in Chef's page should be ordered by `created_at` timestamp (desc)
* For the pages showing search results, ordering should be done by the new column `updated_at` timestamp
* Database field values for `created_at` and `updated_at` are now handled by the database default value `now()` and database triggers, for auto-updating those fields

### How to run 

- docker
  * Install *git* on your system
  * Install and test *docker* on your system
  * If you are in Windows (WSL2) don't use `/mnt/c/User/path`, go to `/home/user` with `cd ~`
  * `git clone --recurse-submodules https://github.com/fernandoroa/foodfy_parent_db`
  * `cd foodfy_parent_db`
  * `docker compose up`
  * In the browser, open `http://localhost:5010` and `http://localhost:5010/admin`
